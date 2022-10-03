import { css } from '@emotion/react';

import { useEffect, useState } from 'react';
import useGetTime from '../hooks/useGetTime';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

interface Props {
	dateTime: any;
	title: string;
	description: string;
}

function TimeWithHook({ dateTime, title, description }: Props) {
	const [formedDate, setFormedDate] = useState('');
	const [realTime, setRealTime] = useState('');

	const realTimeHook = useGetTime();

	useEffect(() => {
		setFormedDate(dayjs(dateTime).format('YYYY-MM-DD HH:mm:ss'));
		setRealTime(realTimeHook);
	}, [dateTime, realTimeHook]);

	// const cleanDate = dateTime;

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
					<h3>
						{formedDate ? `${description} : ${formedDate}` : 'LOADING...'}
					</h3>
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
					<h3>Real Time: {realTime ? realTime : 'Loading'}</h3>
				</li>
				<li css={flexStyle}></li>
			</ul>
		</>
	);
}

export default TimeWithHook;
