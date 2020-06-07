class Shape {
	constructor(vertices, closed=true) {
		this.vertices = vertices;
		this.closed = closed;
		this.extremes = {
			xmin: width + 1,
			xmax: -1,
			ymin: height + 1,
			ymax: -1
		};
		vertices.forEach(v => {
			if(v.x < this.extremes.xmin) this.extremes.xmin = v.x;
			if(v.x > this.extremes.xmax) this.extremes.xmax = v.x;
			if(v.y < this.extremes.ymin) this.extremes.ymin = v.y;
			if(v.y > this.extremes.ymax) this.extremes.ymax = v.y;
		});
	}

	translate(origin) {
		this.vertices.forEach(v => v.add(origin));
	}

	rotate(theta) {
		this.vertices.forEach(v => v.rotate(theta));
	}

	isInside(point) {
		if((point.x < this.extremes.xmin || point.x > this.extremes.xmax) &&
			(point.y < this.extremes.ymin || point.y > this.extremes.ymax))
			return false;
		const nvert = this.vertices.length;
		let i, j;
		let c = false;
		for(i = 0, j = nvert-1; i < nvert; j = i++) {
			const vert_i = this.vertices[i], vert_j = this.vertices[j];
			if ( ((vert_i.y>point.y) != (vert_j.y>point.y)) &&
				(point.x < (vert_j.x-vert_i.x) * (point.y-vert_i.y) / (vert_j.y-vert_i.y) + vert_i.x) )
				c = !c;
		}
		return c;
	}

	display() {
		beginShape();
		this.vertices.forEach(v => vertex(v.x, v.y));
		if(this.closed)
			endShape(CLOSE);
		endShape();
	}
}