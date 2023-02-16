/** 이 녹음은 어떤 환경에서 이루어지는지? */
type Recording = "studio" | "live";

interface Album {
	artist: string;
	title: string;
	releaseDate: Date;
	recordingType: Recording;
}

function pluck<T>(records: T[], key: keyof T): any[] {
	return records.map((record) => record[key]);
}

function pluck2<T, K extends keyof T>(records: T[], key: K): T[K][] {
	return records.map((record) => record[key]);
}
