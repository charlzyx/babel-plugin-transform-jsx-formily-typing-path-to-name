# babel-plugin-transform-jsx-formily-typing-path-to-name

## WARNING!
No test!


## install

```bash
npm install babel-plugin-transform-jsx-formily-typing-path-to-name --save-dev
// or
yarn add babel-plugin-transform-jsx-formily-typing-path-to-name --dev
```




## before

```jsx
const Playground = () => {
  const data = {

  };

  return (
    <Form typing={data}>
      {/* Goods */}
      <Field path="string" />
      <Field path={data.property} />
      <Field path={`template[${index}]property`} />
      <Field path={[data.start, data.end]} />
      <Field path={{ province: data.p, city: data.c, dist: data.p }} />
      <Field path={{ complex: `[${index}].attr`, string: data.any }} />
      <Field path={[`[${index}].attr`, data.other]} />
      <Field path={`[${radom}${index}, end]`} />
      <Field path={[`${radom}${index}`, data.end]} />
      <Field path={{
        wrapper: {
          aa: {
            bb: {
              cc: data.bodex.destructor1,
              dd: [data.boxed.destructor2, data.boxed.destructor3]
            },
            ee: data.ee,
          }
        }
      }} />
      {/*
        Bads,
        字符串和模板字符日都不会自动移除 typing 前缀
        所以: 不要在字符串和模板字符串里面写 data 前缀
       */}
      <Field path={`[${radom}${index}, data.end]`}></Field>
      {/* 不支持 结构语法中出现对象表达式之外的语法, 但是可以用模板表达式 */}
      <Field path={[data.begin, 233, othervar]}></Field>
    </Form>
  );
};

```

## after

```js
const Playground = () => {
  const data = {};
  return React.createElement(Form, {
    typing: data
  }, React.createElement(Field, {
    path: "string"
  }), React.createElement(Field, {
    name: "property"
  }), React.createElement(Field, {
    name: `template[${index}]property`
  }), React.createElement(Field, {
    name: "[start,end]"
  }), React.createElement(Field, {
    name: "{province:p,city:c,dist:p}"
  }), React.createElement(Field, {
    name: `{complex:[${index}].attr,string:any}`
  }), React.createElement(Field, {
    name: `[[${index}].attr,other]`
  }), React.createElement(Field, {
    name: `[${radom}${index}, end]`
  }), React.createElement(Field, {
    name: `[${radom}${index},end]`
  }), React.createElement(Field, {
    name: "{wrapper:{aa:{bb:{cc:bodex.destructor1,dd:[boxed.destructor2,boxed.destructor3]},ee:ee}}}"
  }), React.createElement(Field, {
    name: `[${radom}${index}, data.end]`
  }), React.createElement(Field, {
    name: "[begin,233,othervar]"
  }));
};
```


## work with formily


### config
```js
// .babelrc
  plugins: [
    [
      'transform-jsx-formily-typing-path-to-name',
      {
        wrapper: /Foom/,
        inner: /Field/,
      },
    ],
  ],
```

### adaptor
```tsx
// custompath/index.tsx
import {
  Checkbox,
  DatePicker,
  Input,
  NumberPicker,
  Password,
  Radio,
  Range,
  Rating,
  Select,
  Switch,
} from '@formily/antd-components';
import {
  IAntdSchemaFormProps,
  IMarkupSchemaFieldProps,
  SchemaForm,
  SchemaMarkupField,
} from '@formily/antd';
import React, { FC } from 'react';

const buildIns = {
  Checkbox,
  DatePicker,
  Input,
  NumberPicker,
  Password,
  Radio,
  Range,
  Rating,
  Select,
  Switch,
};

export const Foom: FC<IAntdSchemaFormProps & { typing?: any }> = ({
  typing,
  children,
  components,
  ...others
}) => {
  return (
    <SchemaForm {...others} components={{ ...buildIns, ...components }}>
      {children}
    </SchemaForm>
  );
};

export const Field: FC<IMarkupSchemaFieldProps & { path?: any }> = ({
  path,
  children,
  ...others
}) => {
  return <SchemaMarkupField {...others}>{children}</SchemaMarkupField>;
};

```

### replace
```diff

- import { SchemaForm, SchemaMarkupField as Field } from '@formily/antd';

+ import { Foom, Field } from 'custompath';

```

### usage
```tsx
import { Foom, Field } from 'custompath';

type TSearch = { username: string };

const search: TSearch = {};

const App = () => {
  return (
    <Foom typing={search}>
      <Field
        type="string"
        title="商品名称"
        // name="username"
        path={search.username}
        x-component="Input"
      />
    </Foom>
  );
};
```
