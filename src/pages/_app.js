import Head from "next/head";
import "@/styles/globals.css";
import "@/styles/gears.css";
import { useEffect,useRef } from "react";

export default function App({ Component, pageProps }) {
    const lastSize = useRef({ width: 0, height: 0 });
    
  // 1️⃣ Initial --vh setup on mount
  useEffect(() => {
  const setVh = () => {
    const height = window.visualViewport?.height || window.innerHeight;
    document.documentElement.style.setProperty('--vh', `${height * 0.01}px`);
  };

  setVh(); // initial

  const onResize = () => {
    // Only update if the visual viewport height is truly different from last set height
    const newHeight = window.visualViewport?.height || window.innerHeight;
    if (Math.abs(newHeight - lastSize.current.height) > 50) {
      document.documentElement.style.setProperty('--vh', `${newHeight * 0.01}px`);
      lastSize.current = { width: window.innerWidth, height: newHeight };
    }
  };

  window.visualViewport?.addEventListener('resize', onResize);
  window.addEventListener('resize', onResize); // fallback

  return () => {
    window.visualViewport?.removeEventListener('resize', onResize);
    window.removeEventListener('resize', onResize);
  };
}, []);

  // useEffect(() => {
  //   const initialVh = window.innerHeight * 0.01;
  //   document.documentElement.style.setProperty('--vh', `${initialVh}px`);
  //   lastSize.current = { width: window.innerWidth, height: window.innerHeight };
  // }, []);

  // // 2️⃣ Resize listener that only runs if change > 150px
  // useEffect(() => {
  //   const handleResize = () => {
  //     const currentWidth = window.innerWidth;
  //     const currentHeight = window.innerHeight;

  //     const widthDiff = Math.abs(currentWidth - lastSize.current.width);
  //     const heightDiff = Math.abs(currentHeight - lastSize.current.height);

  //     if (widthDiff > 150 || heightDiff > 150) {
  //       const newVh = currentHeight * 0.01;
  //       document.documentElement.style.setProperty('--vh', `${newVh}px`);
  //       lastSize.current = { width: currentWidth, height: currentHeight };
  //     }
  //   };

  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
        <Component {...pageProps} />

      
      
    </>
  );
}
