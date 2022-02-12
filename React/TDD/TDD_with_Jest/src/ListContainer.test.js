import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fireEvent, render } from '@testing-library/react';

import ListContainer from './ListContainer';

import tasks from '../fixtures/tasks';

jest.mock('react-redux');

describe('ListContainer', () => {
	const dispatch = jest.fn();

	useDispatch.mockImplementation(() => dispatch);
	useSelector.mockImplementation((selector) =>
		selector({
			tasks: tasks
		})
	);
	it('renders tasks', () => {
		const { container, getAllByText } = render(<ListContainer />);
		expect(container).toHaveTextContent('아무 일도 하기 싫다');
		expect(container).toHaveTextContent('건물 매입');

		const buttons = getAllByText('완료');

		fireEvent.click(buttons[0]);

		expect(dispatch).toBeCalledWith({
			type: 'deleteTask',
			payload: { id: 1 }
		});
	});
});
