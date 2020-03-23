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
      {/* Bad, 不要在模板字符串里面写 data 前缀 */}

      <Field path={`[${radom}${index}, data.end]`}></Field>
    </Form>
  );
};
