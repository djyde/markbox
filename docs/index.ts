declare var CodeMirror

import * as markbox from '../src/markbox'
import 'babel-polyfill'

const defaultContent = unescape(document.querySelector('#defaultContent').textContent)

const editor = new CodeMirror(document.querySelector('#editor'), {
  value: defaultContent,
  lineWrapping: true,
  theme: 'elegant',
  mode: 'markdown'
})

const runBtn = document.querySelector('#run-btn')
const previewDiv = document.querySelector('#preview')

let scrollingEditor = false
let scrollingPreview = false

editor.on('scroll', ctx => {
  if (!scrollingEditor) {
    scrollingEditor = true
    previewDiv.scrollTop = editor.getScrollerElement().scrollTop
  }
  scrollingEditor = false
})

previewDiv.addEventListener('scroll', function () {
  if (!scrollingPreview) {
    scrollingPreview = true
    editor.scrollTo(null, this.scrollTop)
  }
  scrollingPreview = false
})

const run = async () => {
  const content = editor.getValue()

  try {
    const html = await markbox.parse(content, {
      fallback: true
    })
    // @ts-ignore
    previewDiv.innerHTML = html
  } catch (e) {
    previewDiv.textContent = e.message
  }

  // previewDiv.innerHTML = marked.parse(content)

}

runBtn.addEventListener('click', run)

run()
