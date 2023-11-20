import GitHubAvatar, {
	EventMap,
	isAvatarLoadCompleteEvent,
	isAvatarLoadErrorEvent
} from "./components/GitHubAvatar";

window.customElements.define("github-avatar", GitHubAvatar);

document.querySelectorAll("github-avatar").forEach((avatar) => {
	avatar.addEventListener(EventMap.AVATAR_LOAD_COMPLETE, (e) => {
		if (isAvatarLoadCompleteEvent(e)) {
			console.log("Avatar Loaded", e.detail.avatar);
		}
	});

	avatar.addEventListener(EventMap.AVATAR_LOAD_ERROR, (e) => {
		Event;
		if (isAvatarLoadErrorEvent(e)) {
			console.log("Avatar Load Error", e.detail.error);
		}
	});
});
