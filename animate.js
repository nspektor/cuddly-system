//World Variables
var size = 600;

//Access the canvas
var c = document.getElementById("playground");
var ctx = c.getContext("2d");

//Global Functions
var clear = function() { ctx.clearRect(0, 0, size, size); };
var makeRGB = function(r="0", g="0", b="0") { return "rgb(" + r + "," + g + "," + b + ")"; };
var makeCircle = function(xcor, ycor, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc( xcor, ycor, radius, 0, 2 * Math.PI );
    ctx.fill();
}

var makeBall = function(x0=1, y0=1, radius=10, redIn, greenIn, blueIn) {
    //"Instance Variables"
    var r = radius;
    var xcor = 1 + radius;
    var ycor = 1 + radius;
    var dx = x0;
    var dy = y0;
    var red = redIn;
    var green = greenIn;
    var blue = blueIn;

    //Method: Draw and propel the ball 
    var runBall = function() {
	if (xcor + dx - radius < 1 || xcor + dx + radius > size) { dx = -dx; }
	if (ycor + dy - radius < 1 || ycor + dy + radius > size) { dy = -dy; }
	xcor += dx;
	ycor += dy;
	makeCircle(xcor, ycor, radius, makeRGB(red, green, blue));
    };

    //Return the instance of the ball
    return {
	getX : function() { return xcor; },
	getY : function() { return ycor; },
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
	draw : runBall
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
    var ball = makeBall(x0, y0, radius, r, g, b);
    arrayer.push(ball);
    var row = data_table.insertRow(-1);
    var row_data = [arrayer.length.toString(), ball.getDx(), ball.getDy(), ball.getRadius(), ball.getRed(), ball.getGreen(), ball.getBlue()]
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
	arrayer.splice(removeID - 1, 1);
	data_table.deleteRow(removeID);
	for (i = 1; i < data_table.children[0].childElementCount; i++) {
	    data_table.children[0].children[i].children[0].innerHTML = i.toString();
	}
    }
    idnum.remove(idnum.length - 1)
}

var updateTable = function() {
    for (i = 0; i < arrayer.length; i++) {
	var ball = arrayer[i];
	var row_data = [i+1, Math.round(ball.getDx() * 10) / 10, Math.round(ball.getDy() * 10) / 10, ball.getRadius(), ball.getRed(), ball.getGreen(), ball.getBlue()];
	for (j = 0; j < data_table.children[0].children[i+1].childElementCount; j++) {
	    data_table.children[0].children[i+1].children[j].innerHTML = row_data[j].toString();
	}
    }
}

var colliding = function(b1, b2) {
    var deltaX = Math.pow(b1.getX() + b1.getDx() - (b2.getX() + b2.getDx()), 2);
    var deltaY = Math.pow(b1.getY() + b1.getDy() - (b2.getY() + b2.getDy()), 2);
    var deltaR = Math.pow(b1.getRadius() + b2.getRadius(), 2);
    return deltaX + deltaY <= deltaR;
}

var collision = function() {
    for (i = 0; i < arrayer.length - 1; i++) {
	var ball1 = arrayer[i];
	for (j = i + 1; j < arrayer.length; j++) {
	    var ball2 = arrayer[j]
	    if (colliding(ball1, ball2)) {
		var m1 = ball1.getRadius();
		var m2 = ball2.getRadius();
		dx1 = (ball1.getDx() * (m1 - m2) + 2 * ball2.getDx() * m2) / (m1 + m2);
		dy1 = (ball1.getDy() * (m1 - m2) + 2 * ball2.getDy() * m2) / (m1 + m2);
		dx2 = (ball2.getDx() * (m2 - m1) + 2 * ball1.getDx() * m1) / (m1 + m2);
		dy2 = (ball2.getDy() * (m2 - m1) + 2 * ball1.getDy() * m1) / (m1 + m2);
		ball1.setDx(dx1);
		ball1.setDy(dy1);
		ball2.setDx(dx2);
		ball2.setDy(dy2);
	    }
	}
    }
}


var requestID;
var drawAll = function() {
    clear();
    arrayer.map(function(ball) { ball.draw(); });
    collision();
    updateTable();
    requestID = requestAnimationFrame(drawAll);
}

drawAll();

document.getElementById("submit").addEventListener("click", runAddDVD);
document.getElementById("remover").addEventListener("click", remover);
