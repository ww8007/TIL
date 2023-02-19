// interface Animal {
// 	name: string;
// 	endangered: boolean;
// 	habitat: string;
// }

// const leopard: Animal = {
// 	name: "Leopard",
// 	endangered: true,
// 	habitat: "Africa"
// };

interface Animal {
	commonName: string;
	genus: string;
	species: string;
	status: ConservationStatus;
	climates: KoppenClimate[];
}

type ConservationStatus =
	| "EX"
	| "EW"
	| "CR"
	| "EN"
	| "VU"
	| "NT"
	| "LC"
	| "DD"
	| "NE";

type KoppenClimate =
	| "Af"
	| "Am"
	| "As"
	| "Aw"
	| "BWh"
	| "BWk"
	| "BSh"
	| "BSk"
	| "Cfa"
	| "Cfb"
	| "Cfc"
	| "Csa"
	| "Csb"
	| "Csc"
	| "Cwa"
	| "Cwb"
	| "Cwc"
	| "Dfa"
	| "Dfb"
	| "Dfc"
	| "Dfd"
	| "Dsa"
	| "Dsb"
	| "Dsc"
	| "Dsd"
	| "Dwa"
	| "Dwb"
	| "Dwc"
	| "Dwd"
	| "EF"
	| "ET";

const snowLeopard: Animal = {
	commonName: "Snow Leopard",
	genus: "Panthera",
	species: "uncia",
	status: "VU",
	climates: ["ET", "EF"]
};

interface Vector2D {
	_brand: "2d";
	x: number;
	y: number;
}

function vec2D(x: number, y: number): Vector2D {
	return { _brand: "2d", x, y };
}

function calculateNorm(p: Vector2D) {
	return Math.sqrt(p.x * p.x + p.y * p.y);
}

/////////////////////
