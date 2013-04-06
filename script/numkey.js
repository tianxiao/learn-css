$(document).keydown(function(e) {
	if (e.keycode == 37) {
		alert("left pressed!");
		return false;
	}
});

// key:[up, down, left, right]
//     [0   1     2     3]
// change the map to a cycle 
// that is when the key movement hit the boundary 
// it will another side.
var keymap = {
	tk1:["tk4","tk7","tk3","tk2"],
	tk2:["tk5","tk8","tk1","tk3"],
	tk3:["tk6","tk9","tk2","tk1"],
	tk4:["tk7","tk1","tk6","tk5"],
	tk5:["tk8","tk2","tk4","tk6"],
	tk6:["tk9","tk3","tk5","tk4"],
	tk7:["tk1","tk4","tk9","tk8"],
	tk8:["tk2","tk5","tk7","tk9"],
	tk9:["tk3","tk6","tk8","tk7"]
};

var htmlkeymap = {
	tk1:"#eled1",
	tk2:"#eled2",
	tk3:"#eled3",
	tk4:"#eled4",
	tk5:"#eled5",
	tk6:"#eled6",
	tk7:"#eled7",
	tk8:"#eled8",
	tk9:"#eled9"
};

// var currentselected = keymap["tk1"];
var currentselected = "tk5";


function keypressinit() {
	if (document.addEventListener) {
		document.addEventListener('keypress', keypressalert, false);
	} else if (document.attachEvent) {
		document.attachEvent("keypress", keypressalert, false);
	} else {
		document.onkeydown = keypressalert;
	}
}


function keypressalert(e) {
	if (!e) {
		e = event;
	}
	
	// alert(""+e.keyCode);
	// $(#d3).html
	var d3html = $("#d3").html();
	if (!d3html) d3html="";
	//showmesg(e.keyCode+":\t"+d3html);
	
	// temporary variable to currentposition;
	var tempositioin = currentselected;
	
	var direction = currentselected;
	switch (e.keyCode){
		// turn left
		case 37:
		direction = keymap[currentselected][2];
		break;
		// turn up
		case 38:
		direction = keymap[currentselected][0];
		break;
		// turn right
		case 39:
		direction = keymap[currentselected][3];
		break;
		// turn down
		case 40:
		direction = keymap[currentselected][1];
		break;
	}
	
	if (direction!=null)  currentselected = direction;
	
	showmesg(tempositioin+"-->"+currentselected );
	
	// change the current element background color
	// reset the last color to the default.
	$(htmlkeymap[currentselected]).css("background","#99FFFF");
	$(htmlkeymap[tempositioin]).css("background","#FFFFCC");
	
}

var lines = 0;
var maxlines = 24;

function init() {
	document.testform.t.value += '';
	lines = 0;
	if (document.addEventListener) {
		document.addEventListener("keydown", keydown, false);
		document.addEventListener("keypress", keypress, false);
		document.addEventListener("keyup", keyup, false);
		document.addEventListener("textInput", textinput, false);
	} else if (document.attachEvent) {
		document.attachEvent("onkeydown", keydown);
		document.attachEvent("onkeypress", keypress);
		document.attachEvent("onkeyup", keyup);
		document.attachEvent("ontextInput", textinput);
	} else {
		document.onkeydown = keydown;
		document.onkeypress = keypress;
		document.onkeyup = keyup;
		document.ontextinput = textinput;
		// probably doesn't work
	}
}

function showmesg(t) {
	var old = document.testform.t.value;
	if (lines >= maxlines) {
		var i = old.indexOf('\n');
		if (i >= 0)
			old = old.substr(i + 1);
	} else
		lines++;
	document.testform.t.value = old + t + '\n';
}

function keyval(n) {
	if (n == null)
		return 'undefined';
	var s = pad(3, n);
	if (n >= 32 && n < 127)
		s += ' (' + String.fromCharCode(n) + ')';
	while (s.length < 9)
	s += ' ';
	return s;
}

function keymesg(w, e) {
	var row = 0;
	var head = [w, ' '];
	if (document.testform.classic.checked) {
		showmesg(head[row] + ' keyCode=' + keyval(e.keyCode) + ' which=' + keyval(e.which) + ' charCode=' + keyval(e.charCode));
		row = 1;
	}

	if (document.testform.modifiers.checked) {
		showmesg(head[row] + ' shiftKey=' + pad(5, e.shiftKey) + ' ctrlKey=' + pad(5, e.ctrlKey) + ' altKey=' + pad(5, e.altKey) + ' metaKey=' + pad(5, e.metaKey));
		row = 1;
	}

	if (document.testform.dom3.checked) {
		showmesg(head[row] + ' key=' + e.key + ' char=' + e.char + ' location=' + e.location + ' repeat=' + e.repeat);
		row = 1;
	}

	if (document.testform.olddom3.checked) {
		showmesg(head[row] + ' keyIdentifier=' + pad(8, e.keyIdentifier) + ' keyLocation=' + e.keyLocation);
		row = 1;
	}

	if (row == 0)
		showmesg(head[row]);
}

function pad(n, s) {
	s += '';
	while (s.length < n)
	s += ' ';
	return s;
}

function suppressdefault(e, flag) {
	if (flag) {
		if (e.preventDefault)
			e.preventDefault();
		if (e.stopPropagation)
			e.stopPropagation();
	}
	return !flag;
}

function keydown(e) {
	if (!e)
		e = event;
	keymesg('keydown ', e);
	return suppressdefault(e, document.testform.keydown.checked);
}

function keyup(e) {
	if (!e)
		e = event;
	keymesg('keyup ', e);
	return suppressdefault(e, document.testform.keyup.checked);
}

function keypress(e) {
	if (!e)
		e = event;
	keymesg('keypress', e);
	return suppressdefault(e, document.testform.keypress.checked);
}

function textinput(e) {
	if (!e)
		e = event;
	//showmesg('textInput data=' + e.data);
	showmesg('textInput data=' + e.data);
	return suppressdefault(e, document.testform.textinput.checked);
} 