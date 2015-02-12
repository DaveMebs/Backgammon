function showHide(id) {
	var e = document.getElementById(id);
	e.style.display = (e.style.display == 'none') ? 'block' : 'none';
}

/*
 * Following two methods are for initializing and writing debug messages to a window
 */
var console;
function initConsole(id) {
	console = document.getElementById(id);
}

function log(message) {
	console.innerHTML = console.innerHTML + message+ "<br>";
}