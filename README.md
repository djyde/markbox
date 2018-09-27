# Markbox

[![CircleCI](https://circleci.com/gh/djyde/markbox/tree/master.svg?style=shield)](https://circleci.com/gh/djyde/markbox/tree/master)

[![NPM](https://badgen.net/npm/v/markbox)](https://npm.im/markbox)

Parse your code in markdown into CodeSandbox.

![](https://ws2.sinaimg.cn/large/006tNc79gy1fvo0pvcsulj31kw14gnbd.jpg)

## Usage

```
$ npm i markbox
```

Markbox will parse your markdown using [marked](https://github.com/markedjs/marked) and replace all of codes in markdown with Codesandbox embed iframe.

```js
const content = `

Code from markdown:

\`\`\`js
document.write('Code from markdown!')
\`\`\`

`

;(async () => {
  const html = await markbox.parse(content);
  // => <p>Code from markdown:</p> <iframe class=\\"codesandbox\\" src=\\"https://codesandbox.io/embed/0xzxjpm09v?\\"></iframe>`
})();

```

## API

### parse(content: string, options: Options): Promise\<string\>

#### options

- embedOptions: [CodeSandbox embed options](https://codesandbox.io/docs/embedding#embed-options) object

# License

MIT License