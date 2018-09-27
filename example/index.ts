import 'babel-polyfill'

import * as markbox from '../lib/markbox'

const template = {} as any

template.react = `
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

template.vue = `
## Vue

\`\`\`vue
<template>
  <div>
    <p>{{ message }}</p>
    <input v-model="message">
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: ''
    }
  }
}
</script>
\`\`\`

`

const demo = async (templateName) => {
  const html = await markbox.parse(template[templateName], {
    embedOptions: {
      
    }
  });
  document.querySelector(`#${templateName}`).innerHTML = html;
}

demo('react')
demo('vue')