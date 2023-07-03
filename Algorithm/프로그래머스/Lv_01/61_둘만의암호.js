function solution(s, skip, index) {
	skip = skip.split("").map((v) => v.charCodeAt());
	return s
		.split("")
		.map((word) => word.charCodeAt())
		.map((code) => {
			let newIndex = index;
			for (let a = 0; a < newIndex; a++) {
				if (code === "z".charCodeAt()) {
					code -= 26;
				}
				code++;
				skip.includes(code) && newIndex++;
			}
			return String.fromCharCode(code);
		})
		.join("");
}
