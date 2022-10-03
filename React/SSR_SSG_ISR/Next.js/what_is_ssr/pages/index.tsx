import { css } from '@emotion/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Seo from '../src/components/Seo';
import colors from '../src/constants/colors';

const Home: NextPage = () => {
	const liStyle = css`
		cursor: pointer;
		margin-bottom: 5rem;
		font-size: 2rem;
		:hover {
			color: ${colors.blue300};
		}
	`;

	const router = useRouter();
	return (
		<>
			<Seo templateTitle="SSR" />
			<ul
				css={css`
					margin-top: 4rem;
					display: flex;
					align-content: center;
					align-items: center;
					flex-direction: column;
				`}
			>
				<li
					css={[liStyle, { color: colors.red300 }]}
					onClick={() => router.push('csr')}
				>
					Client Side Rendering
				</li>
				<li
					css={[liStyle, { color: colors.orange300 }]}
					onClick={() => router.push('ssr')}
				>
					Sever Side Rendering
				</li>
				<li
					css={[liStyle, { color: colors.blue300 }]}
					onClick={() => router.push('ssg')}
				>
					Static Side Generation
				</li>
				<li
					css={[liStyle, { color: colors.green300 }]}
					onClick={() => router.push('isr')}
				>
					Incremental Static Regeneration
				</li>
			</ul>
		</>
	);
};

export default Home;
