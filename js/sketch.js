const buttons = [];

let ship;
let leftButton;

function setup() {
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	ship = new Ship(width/2, height/2, 10);
	leftButton = new Button(createVector(0.05*width, 0.90*height), 20, () => ship.steer(-5));
}

function draw() {
	background(0);
	ship.update(deltaTime / 1000);
	ship.display();
	leftButton.display();
	refresh();
}

function refresh() {
	if(keyIsPressed) keyPress();
	if(mouseIsPressed) mousePress();
}

function keyPress() {
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

function mousePress() {
	buttons.forEach(button => {
		if(button.isClicked(mouseX, mouseY))
			button.execute();
	});
}