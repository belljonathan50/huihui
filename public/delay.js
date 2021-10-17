var key='delay';
let saveddelay = localStorage.getItem (key);
var delay = saveddelay ? saveddelay : 500;

function save(val) {
	delay = val;
	document.getElementById('delayStr').innerText = val;
	localStorage.setItem (key, val);
}

