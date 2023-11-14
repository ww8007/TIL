const ERROR_IMAGE = "https://files-82ee7vgzc.now.sh";
const LOADING_IMAGE = "https://files-8bga2nnt0.now.sh";

const getGitHubAvatarUrl = async (user: string) => {
	if (!user) {
		return;
	}

	const url = `https://api.github.com/users/${user}`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	const data = await response.json();
	return data.avatar_url;
};

export default class GitHubAvatar extends HTMLElement {
	private url: string;
	constructor() {
		super();
		this.url = LOADING_IMAGE;
	}

	get user() {
		return this.getAttribute("user") || "";
	}

	set user(value: string) {
		this.setAttribute("user", value);
	}

	render() {
		window.requestAnimationFrame(() => {
			this.innerHTML = "";
			const img = document.createElement("img");
			img.src = this.url;
			this.appendChild(img);
		});
	}

	async loadNewAvatar() {
		const { user } = this;
		if (!user) {
			return;
		}
		try {
			this.url = await getGitHubAvatarUrl(user);
		} catch (e) {
			this.url = ERROR_IMAGE;
		}

		this.render();
	}

	connectedCallback() {
		this.render();
		this.loadNewAvatar();
	}
}
