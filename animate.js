//World Variables
var size = 500;

//Access the canvas
var c = document.getElementById("playground");
var ctx = c.getContext("2d");

var clear = function() {
    ctx.clearRect(0, 0, 500, 500);
};

var dvdLogoSetup = function(x0=1, y0=1, sizeX=90, sizeY=60) {
   
    //"Instance Variables"
    var requestID;
    var xcor = 1;
    var ycor = 1;
    var dx = x0;
    var dy = y0;    
    var logo = new Image();
    logo.src = "logo_dvd.jpg"
    var imageX = sizeX;
    var imageY = sizeY;

    //Method: Draw and propel the DVD logo 
    var dvdLogo = function() {
	ctx.clearRect(xcor, ycor, imageX, imageY);
	if (xcor + dx < 1 + 1 || xcor + imageX + dx > size - 1) {
	    dx = -dx;
	}
	if (ycor + dy < 1 + 1 || ycor + imageY + dy > size - 1) {
	    dy = -dy;
	}
	xcor += dx;
	ycor += dy;
	ctx.drawImage(logo, xcor, ycor, imageX, imageY);
	requestID = window.requestAnimationFrame( dvdLogo );		
    };

    //Method: Remove this DVD logo
    var removeMe = function() {
	clear();
	window.cancelAnimationFrame(requestID);
    }
    
    dvdLogo();
    return {'dx':dx, 'dy':dy, 'sizeX':imageX, 'sizeY':imageY, remove:removeMe};
};

var arrayer = []
var data_table = document.getElementById("info")
var idnum = document.getElementById("removeID")
var runAddDVD = function() {
    var x0 = parseInt(document.getElementById("dx").value);
    var y0 = parseInt(document.getElementById("dy").value);
    var sizeX = parseInt(document.getElementById("xsize").value);
    var sizeY = parseInt(document.getElementById("ysize").value);
    arrayer.push(dvdLogoSetup(x0, y0, sizeX, sizeY));
    var row = data_table.insertRow(-1);
    var row_data = [arrayer.length.toString(), x0.toString(), y0.toString(), sizeX.toString(), sizeY.toString()]
    for (i = 0; i < 5; i++) {
	var cell = row.insertCell(i);
	cell.innerHTML =row_data[i];
    }
    var option = document.createElement('option');
    option.text = arrayer.length.toString();
    option.value = arrayer.length.toString();
    idnum.add(option);
}

var remover = function() {
    var removeID = parseInt(document.getElementById("removeID").value);
    if (0 < removeID && removeID <= arrayer.length) {
	arrayer[removeID - 1].remove();
	arrayer.pop(removeID - 1);
	data_table.deleteRow(removeID);
	for (i = 1; i < data_table.children[0].childElementCount; i++) {
	    data_table.children[0].children[i].children[0].innerHTML = i.toString();
	}
    }
    idnum.remove(idnum.length - 1)
}

document.getElementById("submit").addEventListener("click", runAddDVD);
document.getElementById("remover").addEventListener("click", remover);
