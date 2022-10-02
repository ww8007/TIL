import { css } from '@emotion/react';
import React from 'react';
import colors from '../constants/colors';
import useGetTime from '../hooks/useGetTime';

interface Props {
	dateTime: string;
	title: string;
	description: string;
}

function TimeWithHook({ dateTime, title, description }: Props) {
	const cleanDate = dateTime;

	const realTime = useGetTime();

	const flexStyle = css`
		flex: 1;
	`;

	return (
		<>
			<h2 css={css``}>{title}</h2>
			<ul
				css={css`
					display: flex;
				`}
			>
				<li css={flexStyle}></li>
				<li css={flexStyle}>
					<h3>{cleanDate ? `${description} : ${cleanDate}` : 'LOADING...'}</h3>
				</li>
				<li css={flexStyle}></li>
			</ul>
			<ul
				css={css`
					display: flex;
				`}
			>
				<li css={flexStyle}></li>
				<li css={flexStyle}>
					<h3>Real Time: {realTime}</h3>
				</li>
				<li css={flexStyle}></li>
			</ul>
		</>
	);
}

export default TimeWithHook;
