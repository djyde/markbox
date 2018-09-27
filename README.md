# Markbox

[![NPM](https://badgen.net/npm/v/markbox)](https://npm.im/markbox)
[![CircleCI](https://circleci.com/gh/djyde/markbox/tree/master.svg?style=shield)](https://circleci.com/gh/djyde/markbox/tree/master)

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

### templates

Depends on your code `languange`, Markbox will transform your codes to different template.

#### js, jsx

When the code language is `js` or `jsx`, Markbox will use a React template. So, rather than writing full React render code, you can simply use `mount()` to mount your React component:

![React example](https://ws1.sinaimg.cn/large/006tNc79gy1fvodd52ndqj315c0oi40r.jpg)


#### vue

Your single file Vue component will automatically render to the container.

![Vue example](https://ws4.sinaimg.cn/large/006tNc79gy1fvodedrt8pj315c1100vz.jpg)

## API

### parse(content: string, options: Options): Promise\<string\>

#### options

- embedOptions: [CodeSandbox embed options](https://codesandbox.io/docs/embedding#embed-options) object

# License

MIT License