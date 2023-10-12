/** @jsx createElement */

import { createElement, renderComponent, useState2, useState3 } from "../core";
import { useState } from "../core/useState2";
import "./index.css";

const App = () => {
	const [count, setCount] = useState(0);
	const [count2, setCount2] = useState(0);
	const [count3, setCount3] = useState(0);
	const [count4, setCount4] = useState(0);

	const upDate3 = () => {
		console.log(count);
		setCount((prev) => prev + 1);
		console.log(count);
		setCount((prev) => prev + 1);
		console.log(count);
		setCount((prev) => prev + 1);
	};

	return (
		<div>
			<h1>{String(count)} with Array State</h1>
			<button onClick={upDate3}>+1</button>

			<h1>{String(count2)} with Array State</h1>
			<button onClick={() => setCount2((prev) => prev + 2)}>+2</button>

			<h1>{String(count3)} with Array State</h1>
			<button onClick={() => setCount3((prev) => prev + 3)}>+3</button>

			<h1>{String(count4)} with Array State</h1>
			<button onClick={() => setCount4((prev) => prev + 4)}>+4</button>
		</div>
	);
};

renderComponent(App, {}, document.getElementById("root") as HTMLElement);
