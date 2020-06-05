let ship;

function setup() {
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	ship = new Ship(width/2, height/2, 10);
}

function draw() {
	background(0);
	ship.display();
}