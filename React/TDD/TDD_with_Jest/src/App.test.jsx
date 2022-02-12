import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import App from './App';
import tasks from '../fixtures/tasks';

jest.mock('react-redux');

describe('App', () => {
	const dispatch = jest.fn();

	useDispatch.mockImplementation(() => dispatch);
	useSelector.mockImplementation((selector) =>
		selector({
			tasks: tasks
		})
	);
	it('renders tasks', () => {
		const { container } = render(<App />);
		expect(container).toHaveTextContent('아무 일도 하기 싫다');
		expect(container).toHaveTextContent('건물 매입');
	});
});
