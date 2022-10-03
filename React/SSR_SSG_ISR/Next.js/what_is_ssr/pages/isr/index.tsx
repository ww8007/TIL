import { useEffect, useState } from 'react';
import TimeWithHook from '../../src/components/TimeWithHook';
import getTimeAPI from '../../src/lib/api/getTime';
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

function ISRPage({ dateTime }: Props) {
	return (
		<>
			<Seo title="ISR" />
			<div
				css={css`
					margin: 0 auto;
				`}
			>
				<h1
					css={css`
						color: ${colors.green300};
					`}
				>
					ISR Rendering
				</h1>
				<main
					css={css`
						width: 100%;
						margin: 0 auto;
					`}
				>
					<TimeWithHook
						dateTime={dateTime}
						title="10초 마다 재빌드 합니다."
						description="ISG Rendering"
					/>
				</main>
			</div>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const dateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');

	return {
		props: {
			dateTime: dateTime
		},
		revalidate: 10
	};
};

export default ISRPage;
