class Ship extends GameObject {
	constructor(x, y, radius) {
		super(createVector(x, y), createVector(0, 0), null);
		const root3by2 = Math.sqrt(3) / 2;
		this.shape = new Shape([
			createVector(0, 0),
			createVector(-radius / 2, -root3by2 * radius),
			createVector(radius, 0),
			createVector(-radius / 2, root3by2 * radius),
		]);
		this.bullets = [];
		this.radius = radius;
		this.heading = -90;
		this.lastFired = 0;
	}

	update(dt) {
		super.update(dt);
		this.vel.mult(0.95);
		this.bullets.forEach(b => b.update(dt));
		this.removeDeadBullets();
	}

	removeDeadBullets() {
		for(let i = this.bullets.length - 1; i >= 0; i--)
			if(!this.bullets[i].isAlive())
				this.bullets.splice(i, 1);
	}

	// wrap() {
	// 	if(this.pos.x > width)
	// 		this.pos.x = this.pos.x - width;
	// 	else if(this.pos.x < 0)
	// 		this.pos.x = this.pos.x + width;
	// 	if(this.pos.y > height)
	// 		this.pos.y = this.pos.y - height;
	// 	else if(this.pos.y < 0)
	// 		this.pos.y = this.pos.y + height;
	// }

	steer(angle) {
		this.heading += angle;
		this.vel.rotate(angle);
	}

	applyForce(force) {
		this.acc.add(force);
	}

	fire() {
		if((frameCount - this.lastFired) < frameRate() / 4)
			return;
		this.bullets.push(new Bullet(this.pos.copy(), this.heading));
		this.lastFired = frameCount;
	}

	display() {
		this.bullets.forEach(b => b.display());
		stroke(255);
		noFill();
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.heading);
		super.display();
		pop();
	}
}