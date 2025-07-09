// import Head from "next/head";
// import "@/styles/globals.css";
// import "@/styles/gears.css";
// import { useEffect,useRef, useState } from "react";

// export default function App({ Component, pageProps }) {
//     const lastSize = useRef({ width: 0, height: 0 });
//      const [lockedHeight, setLockedHeight] = useState(null);

//   // useEffect(() => {
//   //   // Lock the height to initial load height
//   //   const height = window.innerHeight;
//   //   setLockedHeight(height);
//   // }, []);
//   // 1️⃣ Initial --vh setup on mount
//   useEffect(() => {
//     const initialVh = window.innerHeight * 0.01;
//     document.documentElement.style.setProperty('--vh', `${initialVh}px`);
//     lastSize.current = { width: window.innerWidth, height: window.innerHeight };
//   }, []);

//   // 2️⃣ Resize listener that only runs if change > 150px
//   useEffect(() => {
//     const handleResize = () => {
//       const currentWidth = window.innerWidth;
//       const currentHeight = window.innerHeight;

//       const widthDiff = Math.abs(currentWidth - lastSize.current.width);
//       const heightDiff = Math.abs(currentHeight - lastSize.current.height);

//       if (widthDiff > 150 || heightDiff > 150) {
//         const newVh = currentHeight * 0.01;
//         document.documentElement.style.setProperty('--vh', `${newVh}px`);
//         lastSize.current = { width: currentWidth, height: currentHeight };
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <>
//       <Head>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       </Head>
//         <div
//       style={{
//         height: lockedHeight ? `${lockedHeight}px` : "100vh", // fallback
        
//       }}
//     >
//       <Component {...pageProps} />
//     </div>

      
      
//     </>
//   );
// }

import Head from "next/head";
import "@/styles/globals.css";
import "@/styles/gears.css";
import { useEffect, useRef } from "react";

export default function App({ Component, pageProps }) {
  const lastWidth = useRef(0);

  // 1️⃣ Set --vh on mount
  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    lastWidth.current = window.innerWidth;
  }, []);

  // 2️⃣ Update --vh ONLY on width change
  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      if (currentWidth !== lastWidth.current) {
        const newVh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${newVh}px`);
        lastWidth.current = currentWidth;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div>
        <Component {...pageProps} />
      </div>
    </>
  );
}
