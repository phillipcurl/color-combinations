import { AppProps } from 'next/app';
// import { ColorProvider } from '../lib/color-context';
import '../styles/index.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <ColorProvider>
    <Component {...pageProps} />
    // </ColorProvider>
  );
}
