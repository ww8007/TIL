import { useEffect, useState } from 'react';
import TimeWithHook from '../../src/components/TimeWithHook';
import getTimeAPI from '../../src/lib/api/getTime';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { css } from '@emotion/react';
import colors from '../../src/constants/colors';
import Seo from '../../src/components/Seo';
dayjs.locale('ko');

function CSRPage() {
	const [time, setTime] = useState('');
	useEffect(() => {
		setTime(dayjs().format('YYYY-MM-DD HH:mm:ss'));
	}, []);

	return (
		<>
			<Seo title="CSR" />
			<div
				css={css`
					margin: 0 auto;
				`}
			>
				<h1
					css={css`
						color: ${colors.red300};
					`}
				>
					CSR Rendering
				</h1>
				<main
					css={css`
						width: 100%;
						margin: 0 auto;
					`}
				>
					<TimeWithHook
						dateTime={time}
						title="렌더링 마다 클라이언트 사이드에서 변경 됩니다."
						description="CSR Rendering"
					/>
				</main>
			</div>
		</>
	);
}

export default CSRPage;
