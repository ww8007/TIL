const ERROR_IMAGE = "https://files-82ee7vgzc.now.sh";
const LOADING_IMAGE = "https://files-8bga2nnt0.now.sh";

export const EventMap = {
	AVATAR_LOAD_COMPLETE: "AVATAR_LOAD_COMPLETE",
	AVATAR_LOAD_ERROR: "AVATAR_LOAD_ERROR"
} as const;

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

interface AvatarLoadDetail {
	avatar: string;
}

interface AvatarLoadErrorDetail {
	error: unknown;
}

export const isAvatarLoadCompleteEvent = (
	e: Event
): e is CustomEvent<AvatarLoadDetail> => {
	return e.type === EventMap.AVATAR_LOAD_COMPLETE;
};

export const isAvatarLoadErrorEvent = (
	e: Event
): e is CustomEvent<AvatarLoadErrorDetail> => {
	return e.type === EventMap.AVATAR_LOAD_ERROR;
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

	onLoadAvatarComplete() {
		const event = new CustomEvent<AvatarLoadDetail>(
			EventMap.AVATAR_LOAD_COMPLETE,
			{
				detail: {
					avatar: this.url
				}
			}
		);

		this.dispatchEvent(event);
	}

	onLoadAvatarError(error: unknown) {
		const event = new CustomEvent<AvatarLoadErrorDetail>(
			EventMap.AVATAR_LOAD_ERROR,
			{
				detail: {
					error
				}
			}
		);

		this.dispatchEvent(event);
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
			this.onLoadAvatarComplete();
		} catch (e) {
			this.url = ERROR_IMAGE;
			this.onLoadAvatarError(e);
		}

		this.render();
	}

	connectedCallback() {
		this.render();
		this.loadNewAvatar();
	}
}
