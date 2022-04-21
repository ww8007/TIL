const vertical = document.querySelector('.vertical');
const horizontal = document.querySelector('.horizontal');
const target = document.querySelector('.target');
const tag = document.querySelector('.tag');

addEventListener('load', () => {
	const targetRect = target.getBoundingClientRect();
	const targetHalfWidth = targetRect.width / 2;
	const targetHalfHeight = targetRect.height / 2;
	document.addEventListener('mousemove', (e) => {
		const x = e.clientX;
		const y = e.clientY;

		vertical.style.transform = `translateX(${x}px)`;
		horizontal.style.transform = `translateY(${y}px)`;
		target.style.transform = `translate(${x - targetHalfWidth}px, ${
			y - targetHalfHeight
		}px)`;
		tag.innerHTML = `${x}px ${y}px`;
		tag.style.transform = `translate(${x + 20}px, ${y + 20}px)`;
	});
});
