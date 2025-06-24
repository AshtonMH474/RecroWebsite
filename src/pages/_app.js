import Head from "next/head";
import "@/styles/globals.css";
import "@/styles/gears.css";
import { ExpertiseProvider } from "@/context/ExpertiseContext";
import { useEffect } from "react";


export default function App({ Component, pageProps }) {
   useEffect(() => {
  const setVH = () => {
    const vh = window.visualViewport?.height || window.innerHeight;
    document.documentElement.style.setProperty("--vh", `${vh * 0.01}px`);
  };

  setVH();

  window.visualViewport?.addEventListener("resize", setVH);
  window.addEventListener("orientationchange", setVH);

  return () => {
    window.visualViewport?.removeEventListener("resize", setVH);
    window.removeEventListener("orientationchange", setVH);
  };
}, []);
  return (
    <>
      <Head>
       <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"/>
      </Head>
        <ExpertiseProvider>
          <Component {...pageProps} />
        </ExpertiseProvider>
    
    </>
  );
  
}
