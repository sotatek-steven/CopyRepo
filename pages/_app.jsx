import { Provider } from 'react-redux';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { ToastContainer } from 'react-toastify';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import NProgress from 'nprogress';
import Head from 'next/head';
import Router from 'next/router';
import { theme } from '../theme/index.js';
import { createEmotionCache } from '@/utils/create-emotion-cache.js';
import AutoSwitchNetwork from '@/components/atom/AutoSwitchNetwork.jsx';
import Layout from '@/components/layout/PageLayout';
import { useStore } from '@/store/index.js';
import 'react-toastify/dist/ReactToastify.css';
import 'public/static/css/base.css';
import { BrowserRouter } from 'react-router-dom';

const clientSideEmotionCache = createEmotionCache();

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();

Router.onRouteChangeError = () => NProgress.done();

const getLibrary = (provider) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

function App(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const store = useStore(pageProps.initialReduxState);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/static/assets/img/home/logo-main.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="description" content="Endless fun, lasting profits" />
        <meta property="og:title" content="Corgi NFT Game - Endless fun, lasting profits" key="ogtitle" />
        <meta property="og:description" content="Endless fun, lasting profits" key="ogdesc" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta name="twitter:creator" content="Corgi NFT Game - Endless fun, lasting profits" key="twhandle" />

        {/* Open Graph */}
        <meta property="og:url" content="https://market.corginft.io" key="ogurl" />
        <meta property="og:image" content="/static/assets/img/home/banner.png" key="ogimage" />
        <meta property="og:site_name" content="Corgi NFT Game - Endless fun, lasting profits" key="ogsitename" />
      </Head>
      <Provider store={store}>
        {/* <BrowserRouter> */}
        <Web3ReactProvider getLibrary={getLibrary}>
          <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
              <ToastContainer />
              <CssBaseline />
              <div suppressHydrationWarning>
                {typeof window === 'undefined' ? null : (
                  <Layout>
                    <AutoSwitchNetwork />
                    <Component {...pageProps} />
                  </Layout>
                )}
              </div>
            </ThemeProvider>
          </CacheProvider>
        </Web3ReactProvider>
        {/* </BrowserRouter> */}
      </Provider>
    </>
  );
}

export default App;
