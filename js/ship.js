class Ship {
	constructor(x, y, radius) {
		this.pos = createVector(x, y);
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.bullets = [];
		this.radius = radius;
		this.heading = 0;
	}

	update(dt) {
		const ds = p5.Vector.mult(this.vel, dt);
		const dv = p5.Vector.mult(this.acc, dt);
		this.pos.add(ds);
		this.vel.add(dv);
		this.acc.mult(0);
		this.wrap();
		this.vel.mult(0.95);
		this.bullets.forEach(b => b.update(dt));
		this.removeDeadBullets();
	}

	removeDeadBullets() {
		for(let i = this.bullets.length - 1; i >= 0; i--)
			if(!this.bullets[i].isAlive())
				this.bullets.splice(i, 1);
	}

	wrap() {
		if(this.pos.x > width)
			this.pos.x = this.pos.x - width;
		else if(this.pos.x < 0)
			this.pos.x = this.pos.x + width;
		if(this.pos.y > height)
			this.pos.y = this.pos.y - height;
		else if(this.pos.y < 0)
			this.pos.y = this.pos.y + height;
	}

	steer(angle) {
		this.heading += angle;
		this.vel.rotate(angle);
	}

	applyForce(force) {
		this.acc.add(force);
	}

	fire() {
		this.bullets.push(new Bullet(this.pos.copy(), this.heading-90));
	}

	display() {
		this.bullets.forEach(b => b.display());
		stroke(255);
		noFill();
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.heading);
		beginShape();
		vertex(0, 0);
		vertex(-this.radius * cos(30), this.radius/2);
		vertex(0, -this.radius);
		vertex(this.radius * cos(30), this.radius/2);
		endShape(CLOSE);
		pop();
	}
}