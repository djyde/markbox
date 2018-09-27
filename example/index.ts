import 'babel-polyfill'

import * as markbox from '../lib/markbox'

const react = `
## React

\`\`\`js
import * as React from 'react'
import { render } from 'react-dom'

class Counter extends React.PureComponent {
  render () {
    return (
      <div>Hello world!</div>
    )
  }
}

render(<Counter />, document.querySelector('#root'))
\`\`\`

`

const demo = async (template) => {
  const html = await markbox.parse(react, {
    embedOptions: {
      
    }
  });
  document.querySelector(`#${template}`).innerHTML = html;
}

demo('react')
