import tasks from '../fixtures/tasks';
import { setTasks, deleteTask } from './actions';
import reducer from './reducer';

describe('reducer', () => {
	describe('setTasks', () => {
		it('changes tasks array', () => {
			const state = reducer(
				{
					tasks: []
				},
				setTasks(tasks)
			);
			expect(state.tasks).not.toHaveLength(0);
		});
	});

	describe('deleteTasks', () => {
		it('remove a task from tasks', () => {
			const state = reducer(
				{
					tasks: [{ id: 1, title: '아무 일도 하기 싫다' }]
				},
				deleteTask(1)
			);
			expect(state.tasks).toHaveLength(0);
		});
	});
});
