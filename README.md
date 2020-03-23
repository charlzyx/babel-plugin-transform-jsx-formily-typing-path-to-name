# @babel/plugin-transform-react-jsx-refff

## before

```jsx
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
            ff: 233
          }

        }
      }} />
      {/*
        Bads,
        字符串和模板字符日都不会自动移除 typing 前缀
        所以: 不要在字符串和模板字符串里面写 data 前缀
       */}

      <Field path={`[${radom}${index}, data.end]`}></Field>
    </Form>
  );
};


```

## after

```js
/* eslint-disable */
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
  }));
};
```
