let ship;

function setup() {
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	ship = new Ship(width/2, height/2, 10);
}

function draw() {
	background(0);
	ship.update(deltaTime / 1000);
	ship.display();
	refresh();
}

function refresh() {
	let force = createVector(0, 0);
	if(keyIsDown(LEFT_ARROW)) {
		ship.steer(-5);
	} else if(keyIsDown(RIGHT_ARROW)) {
		ship.steer(5);
	} else if(keyIsDown(UP_ARROW)) {
		force = createVector(0, -1);
		force.rotate(ship.heading);
		force.mult(1000);
	} else if(keyIsDown(DOWN_ARROW)) {
		force = createVector(0, 1);
		force.rotate(ship.heading);
		force.mult(1000);
	}
	ship.applyForce(force);
}