import { getParameters } from "codesandbox/lib/api/define";
import * as templates from './templates'

const react = (code) => {
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

export default {
  'jsx': react,
  'js': react,
  'vue': vue
}