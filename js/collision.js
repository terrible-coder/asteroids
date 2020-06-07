function detectCollisions() {
	for(let i = 0; i < objects.length; i++) {
		for(let j = i+1; j < objects.length; j++) {
			const obj_i = objects[i], obj_j = objects[j];
			const smooth = obj_i.shape.vertices.length < obj_j.shape.vertices.length? obj_i: obj_j;
			const rugged = obj_i.shape.vertices.length >= obj_j.shape.vertices.length? obj_i: obj_j;
			const collided = smooth.shape.vertices.find(v => rugged.shape.isInside(v)) !== undefined;
			if(collided) {
				smooth.handleCollision(rugged);
				rugged.handleCollision(smooth);
			}
		}
	}
}