// Dashed lines are horrid on Blink
if (navigator.userAgent.toLowerCase().indexOf('firefox') == -1) {
	for (let header of document.getElementsByTagName('h3')) {
		header.classList.add('blink')
	}
}

let pageIndex = document.getElementById('page-index')
let notification = document.getElementById('notification')
const uri = document.baseURI
const hideNotification = () => notification.classList.remove('active')
const fillBuffer = (title, url) => {
	return ev => {
		ev.preventDefault()
		ev.stopPropagation()
		let linkBuffer = document.createElement('textarea')
		linkBuffer.value = url
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
const giveLinks = (header, list) => {
	const frag = '#' + header.id
	const url = uri + frag

	// Index
	let link = document.createElement('li')
	let anchor = document.createElement('a')
	anchor.innerText = header.innerText
	anchor.href = frag
	link.appendChild(anchor)
	list.appendChild(link)

	// Clipboard Button
	let btn = document.createElement('button')
	btn.onclick = fillBuffer(header.innerText, url)
	btn.classList.add('anchor')
	btn.innerText = '🔗'
	header.appendChild(btn)

	return link
}

document.body.onclick = hideNotification

// Populate the index with header links, and give them
// buttons to put their links in the clipboard
for (let mainSection of document.querySelectorAll('main > section')) {
	let newList = document.createElement('ul')
	let mainLink = giveLinks(mainSection.querySelector('h2'), pageIndex)
	mainLink.appendChild(newList)
	for (let subHeader of mainSection.getElementsByTagName('h3')) {
		giveLinks(subHeader, newList)
	}
}
