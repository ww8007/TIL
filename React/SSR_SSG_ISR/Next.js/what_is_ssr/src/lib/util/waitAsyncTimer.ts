const waitAsyncTimer = (timeToDelay: number) =>
	new Promise((res) => setTimeout(res, timeToDelay));

export default waitAsyncTimer;
