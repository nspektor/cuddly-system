//World Variables
var size = 600;

//Access the canvas
var c = document.getElementById("playground");
var ctx = c.getContext("2d");

var clear = function() {
    ctx.clearRect(0, 0, 500, 500);
};
var makeRGB = function(r="0", g="0", b="0") {
    return "rgb(" + r + "," + g + "," + b + ")";
};
var makeCircle = function(xcor, ycor, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc( xcor, ycor, radius, 0, 2 * Math.PI );
    ctx.fill();
}

var makeBall = function(x0=1, y0=1, radius=10, redIn, greenIn, blueIn) {
    //"Instance Variables"
    var requestID;
    var r = radius;
    var xcor = 1 + radius;
    var ycor = 1 + radius;
    var dx = x0;
    var dy = y0;
    var red = redIn;
    var green = greenIn;
    var blue = blueIn;

    //Method: Draw and propel the DVD logo 
    var runBall = function() {
	makeCircle(xcor, ycor, radius + 1, makeRGB(255, 255, 255));
	if (xcor + dx - radius < 1 || xcor + dx + radius > size) { dx = -dx; }
	if (ycor + dy - radius < 1 || ycor + dy + radius > size) { dy = -dy; }
	xcor += dx;
	ycor += dy;
	makeCircle(xcor, ycor, radius, makeRGB(red, green, blue));
	requestID = window.requestAnimationFrame( runBall );
    };

    //Method: Remove this DVD logo
    var removeMe = function() {
	clear();
	window.cancelAnimationFrame(requestID);
    }
    
    runBall();
    return {
	getDx : function() { return dx; },
	getDy : function() { return dy; },
	getRadius : function() { return radius; },
	getRed : function() { return red; },
	getGreen : function() { return green; },
	getBlue : function() { return blue; },
	setDx : function(x0) { dx = x0; },
	setDy : function(y0) { dy = y0; },
	//setRadius : function(r) { radius = r; },
	setRed : function(hex) { red = hex; },
	setGreen : function(hex) { green = hex; },
	setBlue : function(hex) { blue = hex; },
	setRGB : function(r, g, b) {red = r; green = g; blue = b;},
	remove : removeMe
    };
};

var arrayer = []
var data_table = document.getElementById("info")
var idnum = document.getElementById("removeID")
var runAddDVD = function() {
    var x0 = parseFloat(document.getElementById("dx").value);
    var y0 = parseFloat(document.getElementById("dy").value);
    var radius = parseFloat(document.getElementById("r").value);
    var r = document.getElementById("red").value;
    var g = document.getElementById("green").value;
    var b = document.getElementById("blue").value;
    var rgb = makeRGB(r, g, b);
    arrayer.push(makeBall(x0, y0, radius, r, g, b));
    var row = data_table.insertRow(-1);
    var row_data = [arrayer.length.toString(), x0.toString(), y0.toString(), radius.toString(), r.toString(), g.toString(), b.toString()]
    for (i = 0; i < 7; i++) {
	var cell = row.insertCell(i);
	cell.innerHTML =row_data[i];
    }
    var option = document.createElement('option');
    option.text = arrayer.length.toString();
    option.value = arrayer.length.toString();
    idnum.add(option);
}


var remover = function() {
    var removeID=parseInt(idnum.value)
    if (0 < removeID && removeID <= arrayer.length) {
	arrayer[removeID - 1].remove();
	arrayer.splice(removeID - 1, 1);
	data_table.deleteRow(removeID);
	for (i = 1; i < data_table.children[0].childElementCount; i++) {
	    data_table.children[0].children[i].children[0].innerHTML = i.toString();
	}
    }
    idnum.remove(idnum.length - 1)
}

document.getElementById("submit").addEventListener("click", runAddDVD);
document.getElementById("remover").addEventListener("click", remover);
