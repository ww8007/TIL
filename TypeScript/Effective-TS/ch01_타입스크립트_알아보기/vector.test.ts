test("getAuthors", () => {
	const authors = getAuthors({
		runQuery: (query: string) => {
			return [
				{ first: "Bob", last: "Smith" },
				{ first: "Alice", last: "Jones" }
			];
		}
	});
	expect(authors).toEqual([
		{ first: "Bob", last: "Smith" },
		{ first: "Alice", last: "Jones" }
	]);
});
