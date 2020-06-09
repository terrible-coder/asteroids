class Ship extends GameObject {
	constructor(x, y, radius) {
		super(createVector(x, y), createVector(0, 0), (thisArg, other) => {
			if(other instanceof Asteroid)
				noLoop();
		});
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
			if(!this.bullets[i].isAlive()) {
				const dead = this.bullets[i];
				objects.splice(objects.indexOf(dead), 1);
				this.bullets.splice(i, 1);
			}
	}

	steer(angle) {
		this.heading += angle;
		this.vel.rotate(angle);
	}

	applyForce(force) {
		this.acc.add(force);
	}

	fire() {
		if(this.bullets.length >= 4)
			return;
		if((frameCount - this.lastFired) < frameRate() / 4)
			return;
		this.bullets.push(new Bullet(this.pos.copy(), this.heading));
		this.lastFired = frameCount;
	}

	display() {
		this.bullets.forEach(b => b.display());
		stroke(255);
		noFill();
		super.display();
	}
}