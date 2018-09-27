export const indexHtml = `
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="theme-color" content="#000000">
	<link rel="manifest" href="%PUBLIC_URL%/manifest.json">
	<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
	<title>React App</title>
</head>

<body>
	<noscript>
		You need to enable JavaScript to run this app.
	</noscript>
	<div id="root"></div>
</body>
</html>
`

export const vueIndexJs = `import Vue from 'vue'
import App from './App.vue'

new Vue({
	el: '#root',
	components: {
		app: App
	},
	template: '<app />'
})
`

export const reactWrapper = code => `import * as React from 'react'
import { render } from 'react-dom'

function mount(Component) {
	render(Component, document.querySelector('#root'))
}

${code}
`