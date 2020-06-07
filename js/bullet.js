class Bullet extends GameObject {
	constructor(pos, dir) {
		super(pos, createVector(200, 0).rotate(dir), null);
		this.shape = new Shape([
			createVector(-6, -1),
			createVector(6, -1),
			createVector(6, 1),
			createVector(-6, 1)
		]);
		this.heading = dir;
		this.life = 150;
	}

	isAlive() {
		return this.life > 0;
	}

	update(dt) {
		this.life--;
		if(this.life <= 0) return;
		super.update(dt);
	}

	display() {
		if(this.life <= 0) return;
		fill(255);
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.heading);
		super.display();
		pop();
	}
}