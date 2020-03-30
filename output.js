/* eslint-disable */
const Playground = () => {
  const data = {};
  return React.createElement(Form, {
    typing: data
  }, React.createElement(Field, {
    type: "string",
    title: "\u5546\u54C1\u540D\u79F0",
    "x-component": "Input",
    name: "search.productName"
  }), React.createElement(Field, {
    type: "string",
    title: "\u5546\u54C1\u4EE3\u7801",
    "x-component": "Input",
    name: "search.productNo"
  }), React.createElement(Field, {
    type: "string",
    enum: cdict.optionsWithAll,
    title: "\u5546\u54C1\u5206\u7C7B",
    "x-component": "Select",
    name: "search.categoryId"
  }), React.createElement(Field, {
    type: "number",
    enum: dict.status.options,
    title: "\u662F\u5426\u4E0A\u67B6",
    default: dict.status.emap['全部'],
    "x-component": "Radio",
    name: "status"
  }));
};