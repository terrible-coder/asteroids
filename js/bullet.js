class Bullet extends GameObject {
	constructor(pos, dir) {
		super(pos, createVector(200, 0).rotate(dir), (thisArg, other) => {
			if(!thisArg.isAlive()) return;
			if(other instanceof Asteroid) {
				const debris = other.split();
				asteroids.splice(asteroids.indexOf(other), 1);
				objects.splice(objects.indexOf(other), 1);
				asteroids.concat(debris);
				thisArg.life = 0;
			}
		});
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
		super.display();
	}
}