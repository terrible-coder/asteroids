const smallest = 2;
const largest = 64;

const ragged = 10;
const smooth = 2;

class Asteroid {
	constructor(pos, size) {
		this.pos = pos;
		this.vel = p5.Vector.random2D();
		this.vel.mult(100);
		this.radius = size;
		if(this.radius > largest) throw new Error("Too large asteroid.");
		const ratio = (this.radius - smallest) / (largest - smallest);
		const stops = lerp(smooth, ragged, ratio);
		this.vertices = [];
		for(let theta = 0; theta < 360; theta += 360/stops) {
			const x = this.radius * cos(theta);
			const y = this.radius * sin(theta);
			const noiseX = this.radius * random(-0.2, 0.5);
			const noiseY = this.radius * random(-0.2, 0.5);
			this.vertices.push(createVector(x+noiseX, y+noiseY));
		}
		asteroids.push(this);
	}

	update(dt) {
		const ds = p5.Vector.mult(this.vel, dt);
		this.pos.add(ds);
	}

	display() {
		noFill();
		stroke(255);
		push();
		translate(this.pos.x, this.pos.y);
		beginShape();
		this.vertices.forEach(v => {
			vertex(v.x, v.y);
		});
		endShape(CLOSE);
		pop();
	}
}