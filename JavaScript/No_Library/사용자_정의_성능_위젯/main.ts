let panel: HTMLDivElement;
let start: number;
let frame = 0;

const create = () => {
	const div = document.createElement("div");

	div.style.position = "fixed";
	div.style.left = "0";
	div.style.top = "0";
	div.style.width = "50px";
	div.style.height = "50px";
	div.style.background = "black";
	div.style.color = "white";

	return div;
};

const tick = () => {
	// 프레임 수를 증가
	frame++;
	// 현재
	const now = window.performance.now();
	// 1초마다 FPS를 업데이트
	if (now >= start + 1000) {
		panel.innerText = `${frame} FPS`;
		start = now;
		frame = 0;
	}
	window.requestAnimationFrame(tick);
};

const init = (parent = document.body) => {
	panel = create();

	window.requestAnimationFrame(() => {
		start = window.performance.now();
		parent.appendChild(panel);
		tick();
	});
};

init();

export default { init };
