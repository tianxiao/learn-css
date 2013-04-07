
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
var currentselected = "tk1";


function keypressinit() {
	if (document.addEventListener) {
		document.addEventListener('keypress', keypressalert, false);
	} else if (document.attachEvent) {
		document.attachEvent("keypress", keypressalert, false);
	} else {
		document.onkeydown = keypressalert;
	}
	
	$(htmlkeymap[currentselected]).css("background","#99FFFF");
}


// output counter
//var i=0;
function keypressalert(e) {
	
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
	
	currentselected = direction;
	
	showmesg(tempositioin+"-->"+currentselected );
	
	// change the current element background color
	// reset the last color to the default.
	$(htmlkeymap[currentselected]).css("background","#99FFFF");
	$(htmlkeymap[tempositioin]).css("background","#FFFFCC");
	
}

// The following code is copy from the following link:
// http://unixpapa.com/js/testkey.html

var lines = 0;
var maxlines = 24;



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

