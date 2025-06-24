import Head from "next/head";
import "@/styles/globals.css";
import "@/styles/gears.css";
import { ExpertiseProvider } from "@/context/ExpertiseContext";
import { useEffect } from "react";


export default function App({ Component, pageProps }) {
    useEffect(() => {
    const setVH = () => {
      if (window.visualViewport) {
        const vh = window.visualViewport.height * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      } else {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      }
    };

    setVH();

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", setVH);
    } else {
      window.addEventListener("resize", setVH);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", setVH);
      } else {
        window.removeEventListener("resize", setVH);
      }
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
