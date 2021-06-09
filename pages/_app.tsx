import type { AppProps } from 'next/app';

import Navigation from '../components/Navigation';
import { ToastContainer } from 'react-toastify';
import { Provider } from '../context';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => (
    <Provider>
        <Navigation />
        <Component {...pageProps} />
        <ToastContainer position="top-right" />
    </Provider>
);

export default App;
