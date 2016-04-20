var pic = document.getElementById("vimage");
var intervalID;

var drawDotSetup = function() {
    stop();
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", 250);
    c.setAttribute("cy", 250);
    c.setAttribute("r", "0");
    c.setAttribute("fill", "red");
    c.setAttribute("stroke", "black");
    pic.appendChild(c);
    var delta = 1;

    var drawDot = function() {
	c = document.getElementsByTagName("circle")[0];
	radius = parseInt(c.getAttribute("r"));
	if (Math.abs(125 - (radius+delta)) > 125) {
	    delta = 0 - delta;
	}
	radius = radius + delta;
	c.setAttribute("r", radius.toString());
    }

    intervalID = window.setInterval(drawDot, 16);
}

var dvdSetup = function() {
    stop();
    var d = document.createElementNS("http://www.w3.org/2000/svg", 'image');
    d.setAttribute("height", 60);
    d.setAttribute("width", 90);
    d.setAttribute("x", 0);
    d.setAttribute("y", 0);
    d.setAttributeNS('http://www.w3.org/1999/xlink','href','logo_dvd.jpg');
    pic.appendChild(d);
    var dx = 1;
    var dy = 1;

    var drawDvd = function() {
	d = document.getElementsByTagName("image")[0];
	xcor = parseInt(d.getAttribute("x"));
	ycor = parseInt(d.getAttribute("y"));
	if (xcor + dx < 0 || xcor + 90 + dx > 500) {
	    dx = -dx;
	}
	if (ycor + dy < 0 || ycor + 60 + dy > 500) {
	    dy = -dy;
	}
	xcor = xcor + dx;
	ycor = ycor + dy;
	d.setAttribute("x", xcor.toString());
	d.setAttribute("y", ycor.toString());
    }

    intervalID = window.setInterval(drawDvd, 16);
}

var stop = function() {
    clearInterval(intervalID);
}

var clear = function() {
    while (pic.lastChild) {
	pic.removeChild(pic.lastChild);
    }
}

document.getElementById("circle").addEventListener("click", drawDotSetup);
document.getElementById("dvd").addEventListener("click", dvdSetup);
document.getElementById("stop").addEventListener("click", stop);
document.getElementById("clear").addEventListener("click", clear);

