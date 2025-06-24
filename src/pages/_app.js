import Head from "next/head";
import "@/styles/globals.css";
import "@/styles/gears.css";
import { ExpertiseProvider } from "@/context/ExpertiseContext";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [bottomInset, setBottomInset] = useState(0);

  useEffect(() => {
    const setVH = () => {
      const vh = window.visualViewport?.height || window.innerHeight;
      document.documentElement.style.setProperty("--vh", `${vh * 0.01}px`);
    };

    const updateInset = () => {
      const vv = window.visualViewport;
      if (vv) {
        const inset = window.innerHeight - vv.height;
        setBottomInset(inset > 0 ? inset : 0);
      }
    };

    setVH();
    updateInset();

    window.visualViewport?.addEventListener("resize", () => {
      setVH();
      updateInset();
    });
    window.addEventListener("orientationchange", () => {
      setVH();
      updateInset();
    });

    return () => {
      window.visualViewport?.removeEventListener("resize", setVH);
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
      <div
        style={{
          paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + ${bottomInset}px)`,
        }}
      >
        <ExpertiseProvider>
          <Component {...pageProps} />
        </ExpertiseProvider>
      </div>
    </>
  );
}

