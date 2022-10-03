import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

function useGetTime() {
	const [time, setTime] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'));

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTime(dayjs().format('YYYY-MM-DD HH:mm:ss'));
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return time;
}

export default useGetTime;
