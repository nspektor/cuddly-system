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
	ctx.drawImage(logo, xcor, ycor, imageX, imageY);
	if (xcor + dx < 1 + 1 || xcor + imageX + dx > size - 1) {
	    dx = -dx;
	}
	if (ycor + dy < 1 + 1 || ycor + imageY + dy > size - 1) {
	    dy = -dy;
	}
	xcor += dx;
	ycor += dy;
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

var runAddDVD = function() {
    var x0 = '';
    var y0 = '';
}
