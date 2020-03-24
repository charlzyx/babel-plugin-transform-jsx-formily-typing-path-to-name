/**
 * == JSX Literals ==
 */
const { declare } = require('@babel/helper-plugin-utils');

const babel = require('@babel/core');
const _ = require('lodash');
const generate = require('@babel/generator').default;
const { parseExpression } = require('@babel/parser');
const { types: t } = babel;

const NAMES = {
  ATTR_TYPING: 'typing',
  ATTR_PATH: 'path',
  ATTR_REPLACED: 'name',
};
const FLAGS = {
  IS_WRAPPER: 'is_wrapper',
  IS_INNER: 'is_inner',
  DATA_HOLDER: 'data_value_obj_name',
};

/**
 * 解构语法所支持的表达形式只有
 * Array / Object
 * 并且叶子节点只能是 data member 表达式
 * 其他语法都不被支持
 */
const parserExp = (exp, state) => {
  // 数组形式解构
  const isArray = t.isArrayExpression(exp);
  // 对象形式解构
  const isObject = t.isObjectExpression(exp);
  // 字符串
  const isString = t.isStringLiteral(exp);
  // 模板表达式
  const isTemplate = t.isTemplateLiteral(exp);
  // memeber 表达式
  const isMermber = t.isMemberExpression(exp);
  // 带 optional? 的 member 表达式
  const isOptionalMermber = t.isOptionalMemberExpression(exp);
  // const isSupport = isArray || isObject || isMermber || isOptionalMermber;
  const { code } = generate(exp);

  switch (true) {
    case isString:
      const cleanStr = exp.value
        // 去掉开头 data 占位符
        .replace(state[FLAGS.DATA_HOLDER], '')
        // 去掉 optional?.[] 表示法 ?
        .replace(/\?\.\[/g, '[')
        // 去掉 optional?. 表示法 ?
        .replace(/\?/g, '')
        // 去掉最开始的 . 如果有的话
        .replace(/^\./, '');
      return cleanStr;
    case isTemplate:
      return code;
    case isMermber || isOptionalMermber:
      const cleanCode = code
        // 去掉开头 data 占位符
        .replace(state[FLAGS.DATA_HOLDER], '')
        // 去掉 optional?.[] 表示法 ?
        .replace(/\?\.\[/g, '[')
        // 去掉 optional?. 表示法 ?
        .replace(/\?/g, '')
        // 去掉最开始的 . 如果有的话
        .replace(/^\./, '')
      return cleanCode;

    case isArray:
      const items = exp.elements;
      const apaths = [];
      items.forEach((el, index) => {
        const key = '[' + index + ']';
        const sub = parserExp(el, state);
        if (Array.isArray(sub)) {
          sub.forEach((s) => {
            const k = key + '.' + s;
            apaths.push(k.replace('.[', '['));
          })
        } else {
          apaths.push(key + ',' + sub);
        }
      });
      return apaths;

    case isObject:
      const props = exp.properties;
      const opaths = [];

      props.forEach((prop, index) => {
        const key = prop.key.name;
        const sub = parserExp(prop.value, state);
        if (Array.isArray(sub)) {
          sub.forEach((s) => {
            const k = key + '.' + s;
            opaths.push(k.replace('.[', '['));
          })
        } else {
          opaths.push(key + ',' + sub);
        }
      });
      return opaths;

    default:
      return code;
  }

}

module.exports = declare(
  (api, { wrapper = /__nothing__/, inner = /__nothing__/ }) => {
    api.assertVersion(7);

    if (Object.prototype.toString.call(wrapper) !== '[object RegExp]') {
      throw new Error(
        'Error options: wrapper must be an RegExp. default is /__nothing__/',
      );
    }

    const visitor = {
      JSXOpeningElement({ node }, state) {
        const tagName = node ? (node.name ? node.name.name : null) : null;
        if (!tagName) {
          return;
        }

        // TODO: import 变量处理
        if (!wrapper.test(tagName)) {
          return;
        } else {
          state[FLAGS.IS_IN_WRAPPER] = true;
        }
      },
      JSXAttribute({ node, parent }, state) {
        const tagName = parent ? (parent.name ? parent.name.name : null) : null;
        if (!inner.test(tagName) && !wrapper.test(tagName)) {
          return;
        }
        if (!state[FLAGS.IS_IN_WRAPPER]) return;
        const isPathAttr =
          state[FLAGS.IS_IN_WRAPPER] && node.name.name === NAMES.ATTR_PATH;
        const isDataAttr =
          state[FLAGS.IS_IN_WRAPPER] && node.name.name === NAMES.ATTR_TYPING;

        if (isDataAttr) {
          state[FLAGS.DATA_HOLDER] = node.value.expression.name;
          return;
        }

        if (t.isStringLiteral(node.value) || t.isTemplateLiteral(node.value)) return;

        let path = isPathAttr ? parserExp(node.value.expression, state) : '';
        if (!path) return;
        // 解构
        if (Array.isArray(path)) {
          let ans;
          path.forEach(pair => {
            const [p1, p2] = pair.split(',');
            const isArray = /^\[/.test(p1);
            let init = ans ? ans : isArray ? [] : {};
            ans = init;
            _.set(init, p1, p2);
          });
          // 替换掉 字符串引号 "
          path = JSON.stringify(ans).replace(/"/g, '');
        }


        const isTemplateInclude = path.indexOf('`') > -1;
        let exp = null;
        if (isTemplateInclude) {
          // 如果是存在模板字符串, 就替换掉所有的 `, 直接放在最外层
          path = path.replace(/`/g, '');
          path = '`' + path + '`';
          const tplExp = parseExpression(path)
          exp = t.JSXExpressionContainer(tplExp);
        } else {
          exp = t.stringLiteral(path);
        }
        if (exp) {
          const nextPathAttr = t.jsxAttribute(
            t.jsxIdentifier(NAMES.ATTR_REPLACED),
            exp,
          );

          parent.attributes.push(nextPathAttr);
          parent.attributes.forEach((attr, index) => {
            const is = attr.name.name === NAMES.ATTR_PATH;
            if (is) {
              parent.attributes.splice(index, 1);
            }
          });
        }

      },
    };

    return {
      name: 'transform-jsx-formily-typing-path-to-name',
      visitor,
    };
  },
);
