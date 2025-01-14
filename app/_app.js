import ScrollToTop from "../components/ScrollToTop"; // Import the ScrollToTop component

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ScrollToTop />{" "}
      {/* Add this component to scroll to the top on route change */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
