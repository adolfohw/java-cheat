// Dashed lines are horrid on Blink
if (navigator.userAgent.toLowerCase().indexOf('firefox') == -1) {
	for (let header of document.getElementsByTagName('h3')) {
		header.classList.add('blink')
	}
}
