const smallest = 2;
const largest = 64;

const ragged = 10;
const smooth = 2;

class Asteroid extends GameObject {
	constructor(pos, size) {
		super(pos, p5.Vector.mult(p5.Vector.random2D(), 0), null);
		this.radius = size;
		if(this.radius > largest) throw new Error("Too large asteroid.");
		const ratio = (this.radius - smallest) / (largest - smallest);
		const stops = lerp(smooth, ragged, ratio);
		const vertices = [];
		for(let theta = 0; theta < 360; theta += 360/stops) {
			const x = this.radius * cos(theta);
			const y = this.radius * sin(theta);
			const noiseX = this.radius * random(-0.2, 0.5);
			const noiseY = this.radius * random(-0.2, 0.5);
			vertices.push(createVector(x+noiseX, y+noiseY));
		}
		this.shape = new Shape(vertices);
		asteroids.push(this);
	}

	display() {
		noFill();
		stroke(255);
		// push();
		// translate(this.pos.x, this.pos.y);
		super.display();
		// pop();
	}
}