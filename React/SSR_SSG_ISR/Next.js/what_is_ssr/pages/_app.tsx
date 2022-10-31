import type { AppProps } from 'next/app';
import GlobalStyle from '../GlobalStyle';
import Amplify from 'aws-amplify';
import awsmobile from '../src/aws-exports';
Amplify.configure({ ...awsmobile, ssr: true });
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<GlobalStyle />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
