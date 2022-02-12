# frontend-tdd-feconf2020

FEConf2020 Frontend TDD로 개발하기 예제.

## Redux를 쓰는 이유

- 관심사의 분리
- App이 커지는 경우 관심사의 분리가 중요

- 요소를 만들 때
- ┣ 작게작게 만들 수 있도록 해야함
- ┣ Single Responsibility Principle (SRP)
- ┣ 의존성이 생기지 않도록

## Container 만들기

```jsx
import React from 'react';
import { useSelector } from 'react-redux';

import List from './List';

export default function ListContainer() {
	const { tasks } = useSelector((state) => ({
		tasks: state.tasks
	}));

	return <List tasks={tasks} />;
}
```

> ListContainer.test.js

```js
import React from 'react';

import { useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import ListContainer from './ListContainer';

describe('ListContainer', () => {
	useSelector.mockImplementation((selector) =>
		selector({
			tasks: [
				{ id: 1, title: '아무 일도 하기 싫다' },
				{ id: 2, title: '건물 매입' }
			]
		})
	);
	it('renders tasks', () => {
		const { container } = render(<ListContainer />);
		expect(container).toHaveTextContent('아무 일도 하기 싫다');
		expect(container).toHaveTextContent('건물 매입');
	});
});
```

> `__mocks__`

    가짜로 구현

```js
export const useDispatch = jest.fn();

export const useSelector = jest.fn();
```

> 그 후 test.js에서 모킹을 해줌

```js
jest.mock('react-redux');
```

> App.test 구현

- App 에서는 ListContainer를 렌더링 하지만
- ┣ mocking이 되어 있지 않아서
- ┣ 테스트가 실패하게 됨
- ┣ 고로 mocking을 독같이 진행해줌

```js
import React from 'react';

import { useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import App from './App';

jest.mock('react-redux');

describe('App', () => {
	useSelector.mockImplementation((selector) =>
		selector({
			tasks: [
				{ id: 1, title: '아무 일도 하기 싫다' },
				{ id: 2, title: '건물 매입' }
			]
		})
	);
	it('renders tasks', () => {
		const { container } = render(<App />);
		expect(container).toHaveTextContent('아무 일도 하기 싫다');
		expect(container).toHaveTextContent('건물 매입');
	});
});
```

## redux 구성

- TDD를 진행할 때
- ┣ 굳이 test code에서 interface를 정해놓는 것이
- ┣ 아닌 실제 task에서 정해도 좋음

> App.jsx

```js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ListContainer from './ListContainer';

import tasks from '../fixtures/tasks';

import { setTasks } from './actions';

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
```

> App.test.js dispatch 가짜로 구현

```js
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
```

## BDD

- 테스트를 잘 때 행위 중심으로
- ┣ 상황에 따라 다르게 행동
- ┣ RPG : 검이 없는 경우
- ┣ `describe context it`

- Jest에서 context를 사용하기 위해서는

> 설치

    "jest-plugin-context": "^2.9.0",

```js
import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

// with tasks
// renders tasks

// without tasks
// renders no tasks message

describe('List', () => {
	context('with tasks', () => {
		it('renders tasks', () => {
			const { container } = render(
				<List
					tasks={[
						{ id: 1, title: '아무 일도 하기 싫다' },
						{ id: 2, title: '건물 매입' }
					]}
				/>
			);
			expect(container).toHaveTextContent('아무 일도 하기 싫다');
			expect(container).toHaveTextContent('건물 매입');
		});
	});

	context('without tasks', () => {
		it('renders no tasks', () => {
			const { container } = render(<List tasks={[]} />);
			expect(container).toHaveTextContent('할 일이 없어요');
		});
	});
});
```

## fireEvent

> 완료 버튼 찾아오기

```js
// List.test.js
it('renders "완료" buttons to delete a task', () => {
	const { getAllByText } = render(<List tasks={tasks} />);

	const buttons = getAllByText('완료');

	fireEvent.click(buttons[0]);
});

// List.js
import React from 'react';

export default function List({ tasks, onClick }) {
	if (tasks.length === 0) {
		return <p>할 일이 없어요!</p>;
	}
	return (
		<ul>
			{tasks.map((task) => (
				<li key={task.id}>
					{task.title}
					<button type="button" onClick={() => onClick(task.id)}>
						완료
					</button>
				</li>
			))}
		</ul>
	);
}
```

- 완료 버튼가 중요한게 아니라
- 상태 변화가 중요함

> ListContainer에서의 버튼 클릭

```js
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
			// 액션에 대한 type과 payload 지정
			type: 'deleteTask',
			payload: { id: 1 }
		});
	});
});
```

> List 에서의 버튼 클릭 인수 추가

```js
it('renders "완료" buttons to delete a task', () => {
	const { getAllByText } = renderList(tasks);

	const buttons = getAllByText('완료');

	fireEvent.click(buttons[0]);

	expect(handleClick).toBeCalledWith(1); // id 값 설정
});
```

## 비동기 액션 테스트 코드

- `redux-mock-store`를 이용해
- ┣ 임의의 가짜 스토어 구현 가능

> api

```js
import axios from 'axios';

const TASKS_URL = 'https://jsonplaceholder.typicode.com/todos';

export async function fetchTasks() {
	const { data } = await axios.get(TASKS_URL);
	return data;
}

export default {};
```

```js
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
```

## 정리

- 좋은 설계를 위한 방법 중 하나
- ┣ 왜 하냐 :
- ┣ 1. `추후의 고통을 지금`
- ┣ 2. `요구사항을 명확하게`
- ┣ 만들다 보니 이게 아닌데
- ┣ `원하는게 무었인지 명세`에 대해 자세하게 생각
- ┣ `Specification By Example 사용 예`
