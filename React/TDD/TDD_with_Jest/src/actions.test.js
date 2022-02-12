import configureStore from 'redux-mock-store';

import thunk from 'redux-thunk';

import { fetchTasks } from './services/api';

import { loadTasks } from './actions';

jest.mock('./services/api');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('loadTasks', () => {
	const tasks = [
		{ id: 1, title: '아무 것도 하기 싫다' },
		{ id: 2, title: '건물 매입' }
	];

	beforeEach(() => {
		fetchTasks.mockResolvedValue(tasks);
	});

	it('set tasks', async () => {
		const store = mockStore({
			tasks: []
		});

		await store.dispatch(loadTasks());

		const actions = store.getActions();

		expect(actions).toEqual([
			{ type: 'setTasks', payload: { tasks: [] } },
			{ type: 'setTasks', payload: { tasks } }
		]);
	});
});
