// interface CameraOptions {
// 	camera?: LngLat;
// 	zoom?: number;
// 	bearing?: number;
// 	pitch?: number;
// }

declare function setCamera(camera: CameraOptions): void;
declare function viewportForBounds(bounds: LngLatBounds): CameraOptions;

// type LngLat =
// 	| { lng: number; lat: number }
// 	| [number, number]
// 	| { x: number; y: number };

// type LngLatBounds =
// 	| { northeast: LngLat; southwest: LngLat }
// 	| [LngLat, LngLat]
// 	| [number, number, number, number];

interface LngLat {
	lng: number;
	lat: number;
}

type LngLatLike = LngLat | { lon: number; lat: number } | [number, number];

interface Camera {
	center: LngLat;
	zoom: number;
	bearing: number;
	pitch: number;
}

// interface CameraOptions extends Omit<Partial<Camera>, "center"> {
// 	center?: LngLatLike;
// }
type LngLatBounds =
	| { northeast: LngLatLike; southwest: LngLatLike }
	| [LngLatLike, LngLatLike]
	| [number, number, number, number];

interface CameraOptions {
	center?: LngLatLike;
	zoom?: number;
	bearing?: number;
	pitch?: number;
}

interface Feature {}

declare function calculateBoundsBox(f: Feature): LngLatBounds;

function focusOnFeature(f: Feature) {
	const bounds = calculateBoundsBox(f);
	const camera = viewportForBounds(bounds);
	setCamera(camera);
	const {
		center: { lng, lat },
		zoom
	} = camera;
	zoom;
	window.location.search = `?lng=${lng}&lat=${lat}&zoom=${zoom}`;
}
