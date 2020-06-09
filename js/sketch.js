const buttons = [];
const asteroids = [];
const objects = [];

const ASTEROID_SIZE = {
	small: 8,
	medium: 16,
	large: 32
}

let ship;
let leftButton;
let smaller, larger;

function spawnAsteroid() {
	const side = random(["up", "down", "left", "right"]);
	let pos;
	switch(side) {
	case "up":
		pos = createVector(random(0, width), 0);
		break;
	case "down":
		pos = createVector(random(0, width), height);
		break;
	case "left":
		pos = createVector(0, random(height));
		break;
	case "right":
		pos = createVector(width, random(height));
		break;
	}
	const sizeSelect = random(0, 4) | 0;
	let size;
	switch(sizeSelect) {
	case 0: size = ASTEROID_SIZE.small; break;
	case 1: size = ASTEROID_SIZE.medium; break;
	case 2: size = ASTEROID_SIZE.large; break;
	}
	new Asteroid(pos, size);
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	smaller = width > height? height: width;
	larger = width > height? width: height;smaller
	angleMode(DEGREES);
	ellipseMode(RADIUS);
	rectMode(CENTER);
	ship = new Ship(width/2, height/2, 10);
	for(let i = 0; i < 6; i++)
		spawnAsteroid();
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
		const force = createVector(1, 0);
		force.rotate(ship.heading);
		force.mult(1000);
		ship.applyForce(force);
	})
	//down button
	new Button(createVector(0.25*width, 0.875*height), 0.06*smaller, 40, thisArg => {
		thisArg.color = 160;
		const force = createVector(-1, 0);
		force.rotate(ship.heading);
		force.mult(1000);
		ship.applyForce(force);
	})
	// fire button
	new Button(createVector(0.875*width, 0.75*height), 0.10*smaller, 60, thisArg => {
		thisArg.color = color(236, 238, 71);
		ship.fire();
	});
	// frameRate(2);
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
	detectCollisions();
	if(asteroids.length < 4) spawnAsteroid();
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
		force = createVector(1, 0);
		force.rotate(ship.heading);
		force.mult(1000);
	}
	if(keyIsDown(DOWN_ARROW)) {
		force = createVector(-1, 0);
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