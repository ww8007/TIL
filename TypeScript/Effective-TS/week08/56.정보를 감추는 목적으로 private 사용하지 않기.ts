class Foo {
	private secrete = "secrete";
}

const foo4 = new Foo();
foo4.secrete;

declare function hash(text: string): string;

class PasswordChecker {
	checkPassword: (password: string) => boolean;
	constructor(passwordHash: string) {
		this.checkPassword = (password) => hash(password) === passwordHash;
	}
}

const checker = new PasswordChecker(hash("s3cret"));
checker.checkPassword("s3cret");

class PasswordChecker2 {
	#passwordHash: string;
	constructor(passwordHash: string) {
		this.#passwordHash = passwordHash;
	}

	checkPassword(password: string) {
		return hash(password) === this.#passwordHash;
	}
}

const checker2 = new PasswordChecker2(hash("s3cret"));
checker2.checkPassword("s3cret");
checker2.checkPassword("secrete");
