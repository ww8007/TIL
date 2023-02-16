import { Feature } from "geojson";

interface Coordinate {
	x: number;
	y: number;
}

interface BoundingBox {
	geometry: {
		coordinates: Coordinate[];
	};
}

function calculateBoundsBox(f: Feature): BoundingBox | null {
	let box: BoundingBox | null = null;

	const helper = (coords: any[]) => {
		//...
	};

	const { geometry } = f;
	if (geometry) {
		if (geometry.type === "GeometryCollection") {
			throw new Error("GeometryCollection is not supported");
		}
		helper(geometry.coordinates);
	}
	return box;
}

query {
    repository(owner: "microsoft", name: "TypeScript") {
        createdAt;
        description;
    }
}