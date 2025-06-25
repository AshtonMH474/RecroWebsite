import Head from "next/head";
import "@/styles/globals.css";
import "@/styles/gears.css";
import { ExpertiseProvider } from "@/context/ExpertiseContext";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
    useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();
    // window.addEventListener('resize', setVh);
    // return () => window.removeEventListener('resize', setVh);
  }, []);

  return (
    <>
      <Head>
        
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />


      </Head>
      <ExpertiseProvider>
        <Component {...pageProps} />
      </ExpertiseProvider>
      
    </>
  );
}
