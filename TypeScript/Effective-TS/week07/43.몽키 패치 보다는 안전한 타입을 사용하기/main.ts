(document as any).monkey = "Tamarin";

interface Document {
	monkey: string;
}

document.monkey = "Tamarin";

export {};
declare global {
	interface Document {
		/** 몽키 패치 속(genus) 또는 종(species) */
		monkey: string;
	}
}

document.monkey = "Tamarin";

interface MonkeyDocument extends Document {
	/** 몽키 패치 속(genus) 또는 종(species) */
	monkey: string;
}
(document as MonkeyDocument).monkey = "Tamarin";
