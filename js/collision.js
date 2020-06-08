function drawArrow(base, vec, myColor) {
	push();
	stroke(myColor);
	strokeWeight(3);
	fill(myColor);
	translate(base.x, base.y);
	line(0, 0, vec.x, vec.y);
	rotate(vec.heading());
	let arrowSize = 7;
	translate(vec.mag() - arrowSize, 0);
	triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
	pop();
}

function getNeighbours(arr, i) {
	const neighbours = [];
	const indices = [i-1, i, i+1];
	indices.forEach(index => {
		if(index < 0) neighbours.push(arr[index + arr.length]);
		else if(index >= arr.length) neighbours.push(arr[index - arr.length]);
		else neighbours.push(arr[index]);
	});
	return neighbours;
}

function isCollinding(A, B) {
	// assume A is smoother
	const r = p5.Vector.sub(A.pos, B.pos);
	const theta = createVector(1, 0).angleBetween(r);
	// console.log(theta);
	const shapeA = A.actualShape;
	shapeA.translate(createVector(-B.pos.x, -B.pos.y));
	shapeA.rotate(-theta);
	const shapeB = B.actualShape;
	shapeB.translate(createVector(-B.pos.x, -B.pos.y));
	shapeB.rotate(-theta);
	const angleWithVertices = shapeB.vertices.map(v => abs(createVector(1, 0).angleBetween(v)));
	let minPos = 0;
	for(let i = 0; i < angleWithVertices.length; i++) {
		const d = angleWithVertices[i];
		const projection = shapeB.vertices[i].x;
		if(d !== 0 && d < angleWithVertices[minPos] && projection >= 0)
			minPos = i;
	}
	const vertices = getNeighbours(shapeB.vertices, minPos);
	// debuggers
	// push();
	// translate(100, 100);
	// drawArrow(createVector(0, 0), createVector(r.mag(), 0), 255);
	// shapeA.display();
	// shapeB.display();
	// console.log(angleWithVertices[minPos]);
	// const selectFrom = shapeB.vertices.concat(shapeB.vertices);
	// vertices.forEach(v => ellipse(v.x, v.y, 2));
	// ellipse(shapeB.vertices[minPos].x, shapeB.vertices[minPos].y, 4);
	// pop();
	const line1 = createLine(vertices[0], vertices[1]);
	const line2 = createLine(vertices[1], vertices[2]);
	return shapeA.vertices.some(v => {
		if(vertices.every(t => v.x > t.x))
			return false;
			const side1 = side(line1, v);
			const side2 = side(line2, v);
			if(side1 > 0 && side2 > 0) return false;
			if(side1 <= 0) {
				if(v.x >= line1.xrange[0] && v.x <= line1.xrange[1] &&
					v.y >= line1.yrange[0] && v.y <= line1.yrange[1]) return true;
			}
			if(side2 <= 0) {
				if(v.x >= line2.xrange[0] && v.x <= line2.xrange[1] &&
					v.y >= line2.yrange[0] && v.y <= line2.yrange[1]) return true;
			}
			return false;
		});
}

function detectCollisions() {
	for(let i = 0; i < objects.length; i++) {
		for(let j = i+1; j < objects.length; j++) {
			const obj_i = objects[i], obj_j = objects[j];
			const smooth = obj_i.shape.vertices.length < obj_j.shape.vertices.length? obj_i: obj_j;
			const rugged = obj_i.shape.vertices.length >= obj_j.shape.vertices.length? obj_i: obj_j;
			const collided = isCollinding(smooth, rugged);
			if(collided) {
				smooth.handleCollision(rugged);
				rugged.handleCollision(smooth);
			}
		}
	}
}

function createLine(p1, p2) {
	const a = p2.y - p1.y;
	const b = -(p2.x - p1.x);
	const c = p2.x * p1.y - p1.x * p2.y;
	const coeffs = [a, b, c];
	return {
		coeffs: a < 0? coeffs.map(x => -x): coeffs,
		p1: p1,
		p2: p2,
		xrange: [Math.min(p1.x, p2.x), Math.max(p1.x, p2.x)],
		yrange: [Math.min(p1.y, p2.y), Math.max(p1.y, p2.y)]
	};
}

function side(line, point) {
	const [a, b, c] = line.coeffs;
	return a * point.x + b * point.y + c;
}