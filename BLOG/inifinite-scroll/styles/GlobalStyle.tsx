import { css, Global } from "@emotion/react";

const GlobalStyle = () => (
	<Global
		styles={css`
			* {
				scroll-behavior: smooth;
				-webkit-tap-highlight-color: transparent;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				box-sizing: border-box;
			}
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
			button,
			video {
				margin: 0;
				padding: 0;
				border: 0;
				font-size: inherit;
				font: inherit;
				color: white;
				font-family: "NanumSquareRoundR", "NanumSquareRoundB", sans-serif;
				vertical-align: baseline;
				box-sizing: border-box;
				-webkit-tap-highlight-color: transparent;

				/* 모바일 가로, 테블릿 세로 (해상도 480px ~ 767px)*/
				@media all and (min-width: 480px) and (max-width: 767px) {
					font-size: 0.85rem;
				}

				/* 모바일 가로, 테블릿 세로 (해상도 ~ 479px)*/
				@media all and (max-width: 479px) {
					font-size: 0.85rem;
				}
			}
			html {
				background-color: #000;
			}
			body {
				-ms-overflow-style: none !important; /* IE and Edge */
				scrollbar-width: none !important; /* Firefox */
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
