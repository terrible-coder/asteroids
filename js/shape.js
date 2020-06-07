class Shape {
	constructor(vertices, closed=true) {
		this.vertices = vertices;
		this.closed = closed;
	}

	translate(origin) {
		this.vertices.forEach(v => v.sub(origin));
	}

	rotate(theta) {
		this.vertices.forEach(v => v.rotate(theta));
	}

	display() {
		beginShape();
		this.vertices.forEach(v => vertex(v.x, v.y));
		if(this.closed)
			endShape(CLOSE);
		endShape();
	}
}