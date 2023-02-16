// interface Layer {
// 	layout: FillLayout | LineLayout | PointLayout;
// 	paint: FillPaint | LinePaint | PointPaint;
// }

interface FillLayout {}

interface FillPaint {}

interface LineLayout {}

interface LinePaint {}

interface PointLayout {}

interface PointPaint {}

interface FillLayer {
	type: "fill";
	layout: FillLayout;
	paint: FillPaint;
}

interface LineLayer {
	type: "line";
	layout: LineLayout;
	paint: LinePaint;
}

interface PointLayer {
	type: "point";
	layout: PointLayout;
	paint: PointPaint;
}

type Layer = FillLayer | LineLayer | PointLayer;

interface Person {
	name: string;
	birth?: {
		place: string;
		date: Date;
	};
}

interface Name {
	name: string;
}

interface PersonWithBirth extends Name {
	placeOrBirth: string;
	dateOfBirth: Date;
}

function eulogize(p: PersonWithBirth) {
	if ("placeOrBirth" in p) {
		p;
		const { dateOfBirth } = p;
	}
}
