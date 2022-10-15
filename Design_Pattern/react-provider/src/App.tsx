import React, { useState } from 'react';
import List from './components/List';
import Toggle from './components/Toggle';
import './styles.css';

type Color = {
	background: string;
	color: string;
};

type ToggleThemeContextType = {
	[prop: string]: any;
	toggleTheme?: () => void;
};

type ColorState = {
	light: Color;
	dark: Color;
};

export const themes: ColorState = {
	light: {
		background: '#fff',
		color: '#000'
	},
	dark: {
		background: '#171717',
		color: '#fff'
	}
};

export const ThemeContext = React.createContext<
	Partial<ToggleThemeContextType>
>({});

export default function App() {
	const [theme, setTheme] = useState<Color>(themes.light);

	function toggleTheme() {
		setTheme((prev) => (prev === themes.light ? themes.dark : themes.light));
	}

	console.log(theme);

	return (
		<div className={`App theme-${theme}`}>
			<ThemeContext.Provider value={{ theme, toggleTheme }}>
				<>
					<Toggle />
					<List />
				</>
			</ThemeContext.Provider>
		</div>
	);
}
