// pages/_app.js
import Head from "next/head";
import "@/styles/globals.css";
import "@/styles/gears.css";
import { ExpertiseProvider } from "@/context/ExpertiseContext";
import { useEffect } from "react";
import DynamicHeightContainer from "@/components/Height";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const setVH = () => {
      const vh = (window.visualViewport?.height || window.innerHeight) * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVH();
    const handler = () =>
      requestAnimationFrame(() => {
        setVH();
      });

    (window.visualViewport || window).addEventListener("resize", handler);

    return () =>
      (window.visualViewport || window).removeEventListener("resize", handler);
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
        <DynamicHeightContainer>
          <Component {...pageProps} />
        </DynamicHeightContainer>
      </ExpertiseProvider>
    </>
  );
}

