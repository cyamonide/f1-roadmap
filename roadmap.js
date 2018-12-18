var f1 = require('./mysql-link');

function changeSliderWidth(parent, val) {
	var paddingLeft = document.getElementById(parent).getElementsByClassName("block-left");
	var paddingRight = document.getElementById(parent).getElementsByClassName("block-right");
	
	var i;
	for (i = 0; i < paddingLeft.length; i++) {
    	paddingLeft[i].style.width = val;
	}
	for (i = 0; i < paddingRight.length; i++) {
		paddingRight[i].style.width = val;
	}
}