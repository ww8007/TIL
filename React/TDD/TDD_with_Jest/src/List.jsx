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
