
import Head from "next/head";
import "@/styles/globals.css";
import "@/styles/gears.css";
import { useEffect,useRef } from "react";
import BG from "@/components/BG";

export default function App({ Component, pageProps }) {
    const lastSize = useRef({ width: 0, height: 0 });

  // 1️⃣ Initial --vh setup on mount
   useEffect(() => {
    const setVh = () => {
      const initialVh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${initialVh}px`);
      lastSize.current = { width: window.innerWidth, height: window.innerHeight };
    };

    const timeout = setTimeout(setVh, 300); // wait 300ms to stabilize innerHeight
    return () => clearTimeout(timeout);
  }, []);

  // 2️⃣ Debounced resize listener
  useEffect(() => {
    const handleResize = () => {
      clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(() => {
        const currentWidth = window.innerWidth;
        const currentHeight = window.innerHeight;

        const widthDiff = Math.abs(currentWidth - lastSize.current.width);
        const heightDiff = Math.abs(currentHeight - lastSize.current.height);

        // Only update if significant change
        if (widthDiff > 150) {
          const newVh = currentHeight * 0.01;
          document.documentElement.style.setProperty("--vh", `${newVh}px`);
          lastSize.current = { width: currentWidth, height: currentHeight };
        }
      }, 150); // debounce 150ms
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
     
        <BG/>
        <Component {...pageProps} />
      

      
      
    </>
  );
}
