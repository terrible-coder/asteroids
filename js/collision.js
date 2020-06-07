function detectCollisions() {
	for(let i = 0; i < objects.length; i++) {
		for(let j = i+1; j < objects.length; j++) {
			const obj_i = objects[i], obj_j = objects[j];
			const smooth = obj_i.shape.vertices.length < obj_j.shape.vertices.length? obj_i: obj_j;
			const rugged = obj_i.shape.vertices.length >= obj_j.shape.vertices.length? obj_i: obj_j;
			const smooth_shape = smooth.actualShape;
			const rugged_shape = rugged.actualShape;
			const collided = smooth_shape.vertices.find(v => rugged_shape.isInside(v)) !== undefined;
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
	if(a < 0)
		return coeffs.map(x => -x);
	return coeffs;
}

function side(line, point) {
	const [a, b, c] = line;
	return a * point.x + b * point.y + c;
}