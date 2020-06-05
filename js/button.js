const defaultColor = 40;
class Button {
	constructor(pos, radius, callback) {
		this.pos = pos;
		this.radius = radius;
		this.onclick = callback;
		this.color = defaultColor;
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
		ellipse(this.pos.x, this.pos.y, 2*this.radius);
		this.color = defaultColor;
	}
}