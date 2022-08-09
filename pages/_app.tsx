import React from "react";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import type { AppProps } from "next/app";
import { store } from "../src/redux/store";
import "../styles/globals.css";
import Layout from "@src/componentes/layout/Layout";

// if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
//   require('../src/__mocks__');
// }

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <SnackbarProvider preventDuplicate>
          <Component {...pageProps} />
        </SnackbarProvider>
      </Layout>
    </Provider>
  );
}

export default MyApp;
