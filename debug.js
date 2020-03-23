const babel = require('@babel/core');
// const template = require('@babel/plugin-transform-template-literals').default;
const myplugin = require('./index');
const fs = require('fs');

const code = fs.readFileSync('./code.js', 'utf-8');

const { code: output } = babel.transform(code, {
  plugins: [
    [
      myplugin,
      {
        wrapper: /Form|Slot/,
        inner: /Field/,
      },
    ],
    // template
    ['@babel/plugin-syntax-optional-chaining'],
  ],
  presets: ['@babel/react'],
});

fs.writeFileSync('./output.js', output);
