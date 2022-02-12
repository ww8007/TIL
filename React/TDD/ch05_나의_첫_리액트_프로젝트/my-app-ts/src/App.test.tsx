import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
	it('renders component correctly', () => {
		const { container } = render(<App />);

		const linkElement = screen.getByText(/learn react/i);
		expect(linkElement).toBeInTheDocument();

		expect(container.getElementsByTagName('p')).toHaveLength(1);
		expect(container.getElementsByTagName('p')[0]).toHaveTextContent('test');
		expect(container).toMatchSnapshot();
	});
});
