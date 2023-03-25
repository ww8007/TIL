import { useEffect } from "react";
import "./App.css";

function App() {
	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry, i) => {
				if (entry.isIntersecting) {
					// console.log(`${entry.target.className}가 뷰포트에 들어옴`);
					(entry.target as HTMLElement).style.opacity = "1";
				} else {
					// console.log(`${entry.target.className}가 뷰포트에서 나감`);
					(entry.target as HTMLElement).style.opacity = "0";
				}
			});
		},
		{
			root: document.querySelector("#box-element"),
			rootMargin: "0px",
			threshold: 1
		}
	);

	useEffect(() => {
		io.observe(document.querySelector(".box1") as HTMLElement);
		io.observe(document.querySelector(".box2") as HTMLElement);
		io.observe(document.querySelector(".box3") as HTMLElement);
		io.observe(document.querySelector(".box4") as HTMLElement);
		io.observe(document.querySelector(".box5") as HTMLElement);
		io.observe(document.querySelector(".box6") as HTMLElement);
	}, []);

	return (
		<div id='box-element' className='App'>
			<div className='box_wrapper'>
				<div id='box1' className='box1' />
				<div id='box2' className='box2' />
				<div id='box3' className='box3' />
				<div id='box4' className='box4' />
				<div id='box5' className='box5' />
				<div id='box6' className='box6' />
			</div>
		</div>
	);
}

export default App;
