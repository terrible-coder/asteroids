const smallest = 16;
const largest = 64;

const ragged = 15;
const smooth = 10;

class Asteroid extends GameObject {
	constructor(pos, size) {
		super(pos, p5.Vector.mult(p5.Vector.random2D(), 100), null);
		this.radius = size;
		if(this.radius > largest) throw new Error("Too large asteroid.");
		const ratio = (this.radius - smallest) / (largest - smallest);
		const stops = lerp(smooth, ragged, ratio);
		const vertices = [];
		for(let theta = 0; theta < 360; theta += 360/stops) {
			const x = this.radius * cos(theta);
			const y = this.radius * sin(theta);
			const noiseX = 0.5 * this.radius * random(-0.2, 0.5);
			const noiseY = 0.5 * this.radius * random(-0.2, 0.5);
			vertices.push(createVector(x+noiseX, y+noiseY));
		}
		this.shape = new Shape(vertices);
		asteroids.push(this);
	}

	split() {
		if(this.radius < smallest)
			return [];
		const debris = [
			new Asteroid(this.pos.copy(), this.radius/2),
			new Asteroid(this.pos.copy(), this.radius/2)
		];
		debris[0].vel.rotate(5); debris[0].heading += 5;
		debris[1].vel.rotate(-5); debris[1].heading -= 5;
		return debris;
	}

	display() {
		noFill();
		stroke(255);
		super.display();
	}
}