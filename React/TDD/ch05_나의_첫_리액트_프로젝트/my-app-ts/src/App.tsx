import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
	text-align: center;
`;

const Header = styled.div`
	background-color: #282c34 !important;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: calc(10px + 2vim);
	color: white;
`;
const spin = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`;
const AppLogo = styled.img`
	height: 40vmin;
	pointer-events: none;

	@media (prefers-reduced-motion: no-preference) {
		animation: ${spin} infinite 20s linear;
	}
`;

const AppLink = styled.a`
	color: #61dafb;
`;

function App() {
	return (
		<Container>
			<Header>
				<AppLogo src={logo} alt="logo" />
				<p>test</p>
				<AppLink
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</AppLink>
			</Header>
		</Container>
	);
}

export default App;
