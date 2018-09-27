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
  return parameters
}

export default {
  'jsx': react,
  'js': react,
}