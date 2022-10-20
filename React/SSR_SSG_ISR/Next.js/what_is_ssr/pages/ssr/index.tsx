import TimeWithHook from '../../src/components/TimeWithHook';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { css } from '@emotion/react';
import colors from '../../src/constants/colors';
import { GetServerSideProps } from 'next';
import axios from 'axios';
dayjs.locale('ko');

interface Props {
	dateTime: string;
	title: string;
}

function SSRPage({ dateTime, title }: Props) {
	return (
		dateTime && (
			<div
				css={css`
					margin: 0 auto;
				`}
			>
				<h1
					css={css`
						color: ${colors.orange300};
					`}
				>
					SSR Rendering
				</h1>
				<h2>The Server Data is : {title}</h2>
				<main
					css={css`
						width: 100%;
						margin: 0 auto;
					`}
				>
					<TimeWithHook
						dateTime={dateTime}
						title="렌더링 마다 클라이언트 사이드에서 변경 됩니다."
						description="SSR Rendering"
					/>
				</main>
			</div>
		)
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	// const { data } = await axios.get(
	// 	'https://d66dbgb0z8.execute-api.ap-northeast-2.amazonaws.com/blah'
	// );

	const dateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');

	return {
		props: {
			dateTime: dateTime,
			title: 'this is ssr page'
		}
	};
};

export default SSRPage;
