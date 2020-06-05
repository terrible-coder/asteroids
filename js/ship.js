class Ship {
	constructor(x, y, radius) {
		this.pos = createVector(x, y);
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.radius = radius;
	}

	update(dt) {
		const ds = p5.Vector.mult(this.vel, dt);
		const dv = p5.Vector.mult(this.acc, dt);
		this.pos.add(ds);
		this.vel.add(dv);
		this.acc.mult(0);
	}

	applyForce(force) {
		this.acc.add(force);
	}

	display() {
		stroke(255);
		noFill();
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading());
		beginShape();
		vertex(0, 0);
		vertex(-this.radius * cos(30), this.radius/2);
		vertex(0, -this.radius);
		vertex(this.radius * cos(30), this.radius/2);
		endShape(CLOSE);
		pop();
	}
}