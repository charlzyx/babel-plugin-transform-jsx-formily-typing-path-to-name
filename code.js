/* eslint-disable */
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
