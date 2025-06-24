import Head from "next/head";
import "@/styles/globals.css";
import "@/styles/gears.css";
import { ExpertiseProvider } from "@/context/ExpertiseContext";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    console.log(isMobile)
    if (!isMobile) return; // 🔒 Only apply fix on mobile

    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVH();
    window.addEventListener("resize", setVH);
    window.addEventListener("orientationchange", setVH);

    return () => {
      window.removeEventListener("resize", setVH);
      window.removeEventListener("orientationchange", setVH);
    };
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </Head>
      <ExpertiseProvider>
        <Component {...pageProps} />
      </ExpertiseProvider>
    </>
  );
}
