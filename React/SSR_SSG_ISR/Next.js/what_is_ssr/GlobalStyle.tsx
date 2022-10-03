import { Global, css } from '@emotion/react';
import colors from './src/constants/colors';

const GlobalStyle = () => (
	<Global
		styles={css`
			@import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);
			html,
			body,
			div,
			span,
			applet,
			object,
			iframe,
			h1,
			h2,
			h3,
			h4,
			h5,
			h6,
			p,
			blockquote,
			pre,
			a,
			abbr,
			acronym,
			address,
			big,
			cite,
			code,
			del,
			dfn,
			em,
			img,
			ins,
			kbd,
			q,
			s,
			samp,
			small,
			strike,
			strong,
			sub,
			sup,
			tt,
			var,
			b,
			u,
			i,
			center,
			dl,
			dt,
			dd,
			ol,
			ul,
			li,
			fieldset,
			form,
			label,
			legend,
			table,
			caption,
			tbody,
			tfoot,
			thead,
			tr,
			th,
			td,
			article,
			aside,
			canvas,
			details,
			embed,
			figure,
			figcaption,
			footer,
			header,
			hgroup,
			menu,
			nav,
			output,
			ruby,
			section,
			summary,
			time,
			mark,
			audio,
			input,
			textarea,
			video {
				margin: 0;
				padding: 0;
				border: 0;
				font-size: 100%;
				font: inherit;
				font-family: 'apple';
				vertical-align: baseline;
				box-sizing: border-box;
				-webkit-tap-highlight-color: transparent;
				color: ${colors.white};
			}
			html {
				font-size: 100%;
				background-color: ${colors.mainColor};
				margin-top: 10%;
			}
			ol,
			ul {
				list-style: none;
			}
			a {
				background-color: transparent;
				text-decoration: none;
				outline: none;
				color: inherit;
				&:active,
				&:hover {
					text-decoration: none;
					color: inherit;
					outline: 0;
				}
				-webkit-tap-highlight-color: transparent;
			}
			h1 {
				font-size: 3rem;
				text-align: center;
				margin-top: 2rem;
			}
			h2 {
				font-size: 1.7rem;
				text-align: center;
				margin-top: 2rem;
			}
			h3 {
				font-size: 1.3rem;
				margin-top: 2rem;
			}
			button {
				display: flex;
				align-items: center;
				justify-content: center;
				outline: none;
				border: none;
				background: none;
				padding: 0;
				user-select: none;
				cursor: pointer;
				white-space: nowrap;
				letter-spacing: inherit;
				font: inherit;
				color: inherit;
				-webkit-tap-highlight-color: transparent;
			}
		`}
	/>
);
export default GlobalStyle;
