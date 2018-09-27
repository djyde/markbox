declare var CodeMirror
declare var hljs

import * as markbox from '../src/markbox'
import 'babel-polyfill'
import { Renderer } from 'marked'

const defaultContent = unescape(document.querySelector('#defaultContent').textContent)

const editor = new CodeMirror(document.querySelector('#editor'), {
  value: defaultContent,
  lineWrapping: true,
  theme: 'elegant',
  mode: 'markdown'
})

const runBtn = document.querySelector('#run-btn')
const editorDiv = document.querySelector('.CodeMirror')
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

  const renderer = new Renderer();
  renderer.code = (code, language) => {
    // Check whether the given language is valid for highlight.js.
    const validLang = !!(language && hljs.getLanguage(language));
    // Highlight only if the language is valid.
    const highlighted = validLang ? hljs.highlight(language, code).value : code;
    // Render the highlighted code with `hljs` class.
    return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
  };
  const html = await markbox.parse(content, {
    markedOptions: {
      renderer
    }
  })

  previewDiv.innerHTML = html
}

runBtn.addEventListener('click', run)

run()
