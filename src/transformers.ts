import { getParameters } from "codesandbox/lib/api/define";
import * as templates from './templates'

const js = (code) => {
  const parameters = getParameters({
    files: {
      "index.js": {
        content: code,
        isBinary: false
      },
      'index.html': {
        content: templates.indexHtml,
        isBinary: false,
      },
      "package.json": {
        isBinary: false,
        content: JSON.stringify({ dependencies: {
        }})
      }
    }
  });
  return {parameters}
}


const react = (code) => {
  const parameters = getParameters({
    files: {
      "index.js": {
        content: templates.reactWrapper(code),
        isBinary: false
      },
      'index.html': {
        content: templates.indexHtml,
        isBinary: false,
      },
      "package.json": {
        isBinary: false,
        content: JSON.stringify({ dependencies: {
          'react': '^16',
          'react-dom': '^16'
        } })
      }
    }
  });
  return {parameters}
}

const vue = (code) => {
  const parameters = getParameters({
    files: {
      "index.js": {
        isBinary: false,
        content: templates.vueIndexJs
      },
      "App.vue": {
        content: code,
        isBinary: false
      },
      'index.html': {
        content: templates.indexHtml,
        isBinary: false,
      },
      "package.json": {
        isBinary: false,
        content: JSON.stringify({ dependencies: {
          'vue': '^2',
        } })
      }
    }
  });
  return {
    parameters,
    embedOptions: {
      module: '/App.vue'
    }
  }
}

const reason = (code) => {
  const parameters = getParameters({
    files: {
      "Index.re": {
        content: code,
        isBinary: false
      },
      'index.html': {
        content: templates.indexHtml,
        isBinary: false,
      },
      "package.json": {
        isBinary: false,
        content: JSON.stringify({ main: 'Index.re', dependencies: {
        }})
      }
    }
  });
  return {parameters, embedOptions: {
    module: '/Index.re'
  }}
}

export default {
  jsx: react,
  js,
  javascript: js,
  vue,
  reason,
}