# Markbox

[![NPM](https://badgen.net/npm/v/markbox)](https://npm.im/markbox)
[![CircleCI](https://circleci.com/gh/djyde/markbox/tree/master.svg?style=shield)](https://circleci.com/gh/djyde/markbox/tree/master)

Parse your code in markdown into CodeSandbox.

![](https://ws2.sinaimg.cn/large/006tNc79gy1fvo0pvcsulj31kw14gnbd.jpg)

## Usage

```
npm i markbox
```

```js
const markbox = require('markbox')

const markdownContent = `Your markdown content...`

const html = await markbox.parse(markdownContent)
```

See the full [documentation](https://markbox.js.org)

# License

MIT License