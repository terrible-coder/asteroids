class Bullet {
	constructor(pos, dir) {
		this.pos = pos;
		this.vel = createVector(200, 0);
		this.heading = dir;
		this.life = 150;
		this.vel.rotate(this.heading);
	}

	isAlive() {
		return this.life > 0;
	}

	update(dt) {
		this.life--;
		if(this.life <= 0) return;
		const ds = p5.Vector.mult(this.vel, dt);
		this.pos.add(ds);
		this.wrap();
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

	display() {
		if(this.life <= 0) return;
		fill(255);
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.heading);
		rect(0, 0, 12, 2);
		pop();
	}
}