interface State {
	pageText: string;
	isLoading: boolean;
	error?: string;
}

interface RequestPending {
	state: "pending";
}

interface RequestError {
	state: "error";
	error: string;
}

interface RequestSuccess {
	state: "success";
	pageText: string;
}

type RequestState = RequestPending | RequestError | RequestSuccess;

interface State {
	currentPage: string;
	request: { [page: string]: RequestState };
}

function renderPage(state: State) {
	const { currentPage } = state;
	const requestState = state.request[currentPage];
	switch (requestState.state) {
		case "pending":
			return "Loading...";
		case "error":
			return `Error: ${requestState.error}`;
		case "success":
			return requestState.pageText;
	}
}

async function changePage(state: State, newPage: string) {
	state.request[newPage] = { state: "pending" };
	state.currentPage = newPage;
	try {
		const response = await fetch(newPage);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const pageText = await response.text();
		state.request[newPage] = { state: "success", pageText };
	} catch (e) {
		state.request[newPage] = { state: "error", error: e };
	}
}

interface CockpitControls {
	// 왼쪽 사이드 스틱의 각도, 0 = 중립 + = 앞으로
	leftSideStick: number;
	// 오른쪽 사이드 스틱의 각도, 0 = 중립 + = 앞으로
	rightSideStick: number;
}

function getStickSetting(controls: CockpitControls) {
	const { leftSideStick, rightSideStick } = controls;
	if (leftSideStick === 0) {
		return rightSideStick;
	}
	return leftSideStick;
}
