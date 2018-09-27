const markbox = require('../lib/markbox')

describe('Markbox', () => {


  const content = `

Code from markdown:

\`\`\`js
document.write('Code from markdown!')
\`\`\`

`

  test('parse', async () => {
    jest.setTimeout(15000)
    const html = await markbox.parse(content)
    expect(html).toMatchSnapshot()
  })
})