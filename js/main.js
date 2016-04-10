var toggleButton = document.getElementById('toggle-menu'),
	sidebar = document.getElementById('sidebar'),
	body = document.getElementById('body');

toggleButton.onclick = function () {
	classie.toggle(this, "avtive");
	classie.toggle(sidebar, "pushed");
	classie.toggle(body, "pushed");
}