import 'babel-polyfill'

import * as markbox from '../lib/markbox'

const content = `

Code from markdown:

\`\`\`js
document.write('Code from markdown!')
\`\`\`

`

;(async () => {
  const html = await markbox.parse(content, {
    embedOptions: {
      
    }
  });
  document.querySelector("#app").innerHTML = html;
})();
