import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { NextUIProvider } from '@nextui-org/react';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '@/store';
import { darkTheme } from '@/themes';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NextUIProvider theme={darkTheme}>
          <Component {...pageProps} />
        </NextUIProvider>
      </PersistGate>
    </Provider>
  );
}
