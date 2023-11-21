import { Container } from ".";
import { Params } from "./router";

export default (container: Container) => {
	const home = () => {
		container.textContent = "This is Home page";
	};

	const list = () => {
		container.textContent = "This is List Page";
	};

	const detail = (params: Params) => {
		const { id } = params;
		container.textContent = `This is Detail Page with Id ${id}`;
	};

	const anotherDetail = (params: Params) => {
		const { id, anotherId } = params;
		container.textContent = `
        This is Detail Page with Id ${id} 
        and AnotherId ${anotherId}
      `;
	};

	const notFound = () => {
		container.textContent = "Page Not Found!";
	};

	return {
		home,
		list,
		detail,
		anotherDetail,
		notFound
	};
};
