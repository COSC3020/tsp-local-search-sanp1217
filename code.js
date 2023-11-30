function tsp_ls(distance_matrix) {
	const n = distance_matrix.length;

	if (n === 0) {
		return 0;
	}

	// Generate an initial solution randomly
	let currentRoute = [];
	for (let i = 0; i < n; i++) {
		currentRoute.push(i);
	}
	currentRoute.sort(() => Math.random() - 0.5);

	let incumbentRoute = [...currentRoute];
	let incumbentDistance = calculateDistance(currentRoute, distance_matrix);
	let improved = true;

	while (improved) {
		//Stopping criterion is based on this variable, it will continue to be true in the for loops
		//as long as a more efficient route is being found.
		improved = false;

		for (let i = 1; i < n - 1; i++) {
			for (let k = i + 1; k < n; k++) {
				if (i === 1 && k === n - 1) {
					// Skip the case where we swap the starting and ending cities
					continue;
				}

				const newRoute = swap(currentRoute, i, k);
				const newDistance = calculateDistance(
					newRoute,
					distance_matrix
				);

				if (newDistance < incumbentDistance) {
					incumbentRoute = [...newRoute];
					incumbentDistance = newDistance;
					currentRoute = [...newRoute];
					improved = true;
				}
			}
		}
	}
	return incumbentDistance;
}

function calculateDistance(route, distanceMatrix) {
	let distance = 0;
	for (let i = 0; i < route.length - 1; i++) {
		distance += distanceMatrix[route[i]][route[i + 1]];
	}
	return distance;
}

function swap(route, i, k) {
	const newRoute = [...route];
	for (let j = 0; j < Math.floor((k - i) / 2); j++) {
		[newRoute[i + j], newRoute[k - j]] = [newRoute[k - j], newRoute[i + j]];
	}
	return newRoute;
}
