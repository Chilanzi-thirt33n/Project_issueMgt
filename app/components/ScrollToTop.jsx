import { useEffect } from "react";
import { useRouter } from "next/router";

const ScrollToTop = () => {
  const router = useRouter(); // Get the Next.js router

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0); // Scroll to the top of the page
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // Clean up the event listener on component unmount
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]); // Only run when router.events changes

  return null;
};

export default ScrollToTop;
