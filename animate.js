//model for HTML5 canvas-based animation

//access canvas and buttons via DOM
var c = document.getElementById("playground");
var dvdButton = document.getElementById( "dvd" );
var stopButton = document.getElementById( "stop" );

//prepare to interact with canvas in 2D
var ctx = c.getContext("2d");

var requestID;

var clear = function(e) {
    e.preventDefault();
    ctx.clearRect(0, 0, 500, 500);
};


var dvdLogoSetup = function(x0=1, y0=1, sizeX=90, sizeY=60) {
   
    //var inits
    var size = 500;
    var xcor = 1;
    var ycor = 1;
    var dx = x0;
    var dy = y0;
    var logo = new Image();
    logo.src = "logo_dvd.jpg"
    var imageX = sizeX;
    var imageY =sizeY;
    
    //a function defined within a function, oh my!
    // References this one instance of this function rather than calling the same function again when the button is pressed repeatedly 
    var dvdLogo = function() {
	
	//propulsion mechanism
	ctx.drawImage(logo, xcor, ycor, imageX, imageY);
	if (xcor + dx < 1 + 1 || xcor + imageX + dx > size - 1) {
	    dx = -dx;
	}
	if (ycor + dy < 1 + 1 || ycor + imageY + dy > size - 1) {
	    dy = -dy;
	}
	xcor += dx;
	ycor += dy;
	
	//Q: Why this here?
	// To call the function again once it has been executed
	requestID = window.requestAnimationFrame( dvdLogo );		
    };

    //Calls the function for the first time after it has been defined
    dvdLogo();
};



var stopIt = function() {
    console.log( requestID );
    window.cancelAnimationFrame( requestID );
};


dvdButton.addEventListener( "click", dvdLogoSetup );
stopButton.addEventListener( "click",  stopIt );

