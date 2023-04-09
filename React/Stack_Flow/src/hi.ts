function isPalindrome(s: string): boolean {
	let lp = 0;
	let rp = s.length - 1;

	s = s.replace(/[^a-z0-9]+/gi, "").toUpperCase();

	while (lp < rp) {
		if (s[lp] !== s[rp]) return false;
		lp++;
		rp--;
	}
	return true;
}
