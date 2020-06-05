class Button {
	constructor(pos, radius, callback) {
		this.pos = pos;
		this.radius = radius;
		this.onclick = callback;
		buttons.push(this);
	}

	execute() {
		this.onclick();
	}

	isClicked(clickX, clickY) {
		const mouse = createVector(clickX, clickY);
		const dist = this.pos.dist(mouse);
		if(dist <= this.radius)
			return true;
		return false;
	}

	display() {
		fill(40);
		ellipse(this.pos.x, this.pos.y, 2*this.radius);
	}
}