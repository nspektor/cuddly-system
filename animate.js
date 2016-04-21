//model for HTML5 canvas-based animation

//access canvas and buttons via DOM
var c = document.getElementById("playground");
var dotButton = document.getElementById( "circle" );
var dvdButton = document.getElementById( "dvd" );
var stopButton = document.getElementById( "stop" );

//prepare to interact with canvas in 2D
var ctx = c.getContext("2d");

//set fill color to red
ctx.fillStyle = "#ff0000";


var requestID;

var clear = function(e) {
    e.preventDefault();
    ctx.clearRect(0, 0, 500, 500);
};

var radius = 0;
var growing = true;


var drawDot = function() {
    
    ctx.clearRect( 0, 0, c.width, c.height );

    if ( growing ) {
	radius = radius + 1;
    }    
    else {
	radius = radius - 1;
    }

    if ( radius == (c.width / 2) )
	growing = false;
    else if ( radius == 0 ) {
	growing = true;
    }
    
    ctx.beginPath();
    ctx.arc( c.width / 2, c.height / 2, radius, 0, 2 * Math.PI );
    ctx.stroke();
    ctx.fill();

    requestID = window.requestAnimationFrame( drawDot );
};



var dvdLogoSetup = function() {
    
    //Q: What good might this do?
    // Stops the previous animation
    window.cancelAnimationFrame( requestID );
   
    //var inits
    var size = 500;
    var xcor = 1;
    var ycor = 1;
    var dx = 1;
    var dy = 1;
    var logo = new Image();
    logo.src = "logo_dvd.jpg"
    var imageX = 90;
    var imageY = 60;
    
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


dotButton.addEventListener( "click", drawDot );
dvdButton.addEventListener( "click", dvdLogoSetup );
stopButton.addEventListener( "click",  stopIt );

