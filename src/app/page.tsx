function MyApp({ Component, pageProps }: any) {
  return Component ? <Component {...pageProps} /> : null;
}

export default MyApp;
