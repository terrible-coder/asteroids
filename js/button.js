class Button {
	constructor(pos, radius, color, callback) {
		this.pos = pos;
		this.radius = radius;
		this.onclick = callback;
		this._defaultColor = color;
		this.color = color;
		buttons.push(this);
	}

	execute() {
		this.onclick(this);
	}

	isClicked(clickX, clickY) {
		const mouse = createVector(clickX, clickY);
		const dist = this.pos.dist(mouse);
		if(dist <= this.radius)
			return true;
		return false;
	}

	display() {
		fill(this.color);
		ellipse(this.pos.x, this.pos.y, this.radius);
		this.color = this._defaultColor;
	}
}