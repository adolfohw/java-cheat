let mainHeaders = document.getElementsByTagName('h2')
let subHeaders = document.getElementsByTagName('h3')
let notification = document.getElementById('notification')
const url = document.baseURI
const hideNotification = () => notification.classList.remove('active')
const fillBuffer = (title, frag) => {
	return ev => {
		ev.preventDefault()
		ev.stopPropagation()
		let linkBuffer = document.createElement('textarea')
		linkBuffer.value = url + frag
		document.body.appendChild(linkBuffer)
		linkBuffer.select()
		document.execCommand('copy')
		document.body.removeChild(linkBuffer)
		notification.innerHTML = `👉 A link to <strong>${title}</strong> is now on your clipboard! 📋`
		if (!notification.classList.contains('active')) {
			notification.classList.add('active')
			setTimeout(hideNotification, 3500)
		}
	}
}

document.body.onclick = hideNotification

// Dashed lines are horrid on Blink
if (navigator.userAgent.toLowerCase().indexOf('firefox') == -1) {
	for (let header of subHeaders) {
		header.classList.add('blink')
	}
}

// Headers get their own copy-able anchors
for (let headers of [mainHeaders, subHeaders]) {
	for (let header of headers) {
		const frag = `#${header.id}`
		let anchor = document.createElement('button')
		anchor.onclick = fillBuffer(header.innerText, frag)
		anchor.classList.add('anchor')
		anchor.href = frag
		anchor.innerText = '🔗'
		header.appendChild(anchor)
	}
}
