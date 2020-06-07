const buttons = [];
const asteroids = [];

let ship;
let leftButton;
let smaller, larger;

function setup() {
	createCanvas(windowWidth, windowHeight);
	smaller = width > height? height: width;
	larger = width > height? width: height;smaller
	angleMode(DEGREES);
	ellipseMode(RADIUS);
	rectMode(CENTER);
	ship = new Ship(width/2, height/2, 10);
	for(let i = 0; i < 10; i++)
		new Asteroid(createVector(random(0, width), random(0, height)), random(smallest, largest));
	// left button
	new Button(createVector(0.125*width, 0.75*height), 0.06*smaller, 40, thisArg => {
		thisArg.color = 160;
		ship.steer(-5);
	});
	//right button
	new Button(createVector(0.375*width, 0.75*height), 0.06*smaller, 40, thisArg => {
		thisArg.color = 160;
		ship.steer(5);
	});
	//up button
	new Button(createVector(0.25*width, 0.625*height), 0.06*smaller, 40, thisArg => {
		thisArg.color = 160;
		const force = createVector(0, -1);
		force.rotate(ship.heading);
		force.mult(1000);
		ship.applyForce(force);
	})
	//down button
	new Button(createVector(0.25*width, 0.875*height), 0.06*smaller, 40, thisArg => {
		thisArg.color = 160;
		const force = createVector(0, 1);
		force.rotate(ship.heading);
		force.mult(1000);
		ship.applyForce(force);
	})
	// fire button
	new Button(createVector(0.875*width, 0.75*height), 0.10*smaller, 60, thisArg => {
		thisArg.color = color(236, 238, 71);
		ship.fire();
	});
}

function draw() {
	background(0);
	const dt = deltaTime / 1000;
	ship.update(dt);
	asteroids.forEach(a => a.update(dt));
	ship.display();
	asteroids.forEach(a => a.display());
	buttons.forEach(b => b.display());
	refresh();
}

function refresh() {
	if(keyIsPressed) keyPress();
	if(mouseIsPressed) mousePress();
}

function keyPress() {
	let force = createVector(0, 0);
	if(keyIsDown(LEFT_ARROW))
		ship.steer(-5);
	if(keyIsDown(RIGHT_ARROW))
		ship.steer(5);
	if(keyIsDown(UP_ARROW)) {
		force = createVector(0, -1);
		force.rotate(ship.heading);
		force.mult(1000);
	}
	if(keyIsDown(DOWN_ARROW)) {
		force = createVector(0, 1);
		force.rotate(ship.heading);
		force.mult(1000);
	}
	if(keyIsDown(32))
		ship.fire();
	ship.applyForce(force);
}

function mousePress() {
	buttons.forEach(button => {
		if(button.isClicked(mouseX, mouseY))
			button.execute();
	});
}