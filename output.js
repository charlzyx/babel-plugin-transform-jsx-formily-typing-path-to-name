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
  }), React.createElement(Field, {
    name: "[begin,233,othervar]"
  }));
};