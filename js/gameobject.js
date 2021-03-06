class GameObject {
	constructor(pos, vel, callback) {
		this.pos = pos;
		this.vel = vel;
		this.acc = createVector(0, 0);
		this.heading = 0;
		this.shape = new Shape([]);
		this.collisionHandler = callback;
		objects.push(this);
	}

	update(dt) {
		const ds = p5.Vector.mult(this.vel, dt);
		const dv = p5.Vector.mult(this.acc, dt);
		this.pos.add(ds);
		this.vel.add(dv);
		this.acc.mult(0);
		this.wrap();
	}

	get actualShape() {
		const actual = this.shape.copy();
		actual.translate(this.pos);
		actual.rotate(this.heading, this.pos);
		return actual;
	}

	wrap() {
		if(this.pos.x > LENGTH)
			this.pos.x = this.pos.x - LENGTH;
		else if(this.pos.x < 0)
			this.pos.x = this.pos.x + LENGTH;
		if(this.pos.y > LENGTH)
			this.pos.y = this.pos.y - LENGTH;
		else if(this.pos.y < 0)
			this.pos.y = this.pos.y + LENGTH;
	}

	handleCollision(other) {
		if(this.collisionHandler !== null)
			this.collisionHandler(this, other);
	}

	display() {
		this.actualShape.display();
	}
}