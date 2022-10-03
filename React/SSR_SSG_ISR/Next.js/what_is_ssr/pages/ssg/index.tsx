import TimeWithHook from '../../src/components/TimeWithHook';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { css } from '@emotion/react';
import colors from '../../src/constants/colors';
import { GetStaticProps } from 'next';
import Seo from '../../src/components/Seo';
dayjs.locale('ko');

interface Props {
	dateTime: string;
}

function SSGPage({ dateTime }: Props) {
	return (
		<>
			<Seo templateTitle="SSG" />
			<div
				css={css`
					margin: 0 auto;
				`}
			>
				<h1
					css={css`
						color: ${colors.blue300};
					`}
				>
					SSG Rendering
				</h1>
				<main
					css={css`
						width: 100%;
						margin: 0 auto;
					`}
				>
					<TimeWithHook
						dateTime={dateTime}
						title="Next build 시의 데이터로 유지 됩니다."
						description="SSG Rendering"
					/>
				</main>
			</div>
		</>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	const dateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');

	return {
		props: {
			dateTime
		}
	};
};

export default SSGPage;
