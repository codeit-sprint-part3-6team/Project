import '@/styles/globals.css';
import '@/styles/fonts.css';
import '@/styles/normalize.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { ToastContainer } from 'react-toastify';
import styles from '@/styles/customToastStyles.module.css';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer
        toastClassName={styles.toast}
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Provider>
  );
}
