import React, { useEffect } from 'react';

import ListContainer from './ListContainer';

import tasks from '../fixtures/tasks';

import { setTasks } from './actions';

import { useDispatch } from 'react-redux';

export default function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setTasks(tasks));
	}, []);
	return (
		<div>
			<h1>To-do</h1>
			<ListContainer />
		</div>
	);
}
