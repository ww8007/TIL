import { counter } from './counter.js';

const button = document.getElementById('blue');
button.addEventListener('click', () => {
	console.log('Counter total: ', counter.increment());
});
