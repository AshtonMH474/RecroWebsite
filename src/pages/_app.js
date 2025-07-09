import Head from "next/head";
import "@/styles/globals.css";
import "@/styles/gears.css";
import { useEffect,useRef } from "react";

export default function App({ Component, pageProps }) {
    const lastSize = useRef({ width: 0, height: 0 });

  // 1️⃣ Initial --vh setup on mount
  useEffect(() => {
    const initialVh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${initialVh}px`);
    lastSize.current = { width: window.innerWidth, height: window.innerHeight };
  }, []);

  // 2️⃣ Resize listener that only runs if change > 150px
  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;

      const widthDiff = Math.abs(currentWidth - lastSize.current.width);
      const heightDiff = Math.abs(currentHeight - lastSize.current.height);

      if (widthDiff > 150 || heightDiff > 150) {
        const newVh = currentHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${newVh}px`);
        lastSize.current = { width: currentWidth, height: currentHeight };
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
        <Component {...pageProps} />

      
      
    </>
  );
}

// // pages/_app.js
// import Head from "next/head";
// import "@/styles/globals.css";
// import "@/styles/gears.css";
// import { useEffect, useRef } from "react";

// export default function App({ Component, pageProps }) {
//   const lastWidth = useRef(0); // Changed from lastSize to lastWidth

//   // 1️⃣ Set --vh on mount
//   useEffect(() => {
//     const vh = window.innerHeight * 0.01;
//     document.documentElement.style.setProperty('--vh', `${vh}px`);
//     lastWidth.current = window.innerWidth;
//   }, []);

//   // 2️⃣ Update --vh ONLY on width change
//   useEffect(() => {
//     const handleResize = () => {
//       const currentWidth = window.innerWidth;
//       // The key change is here: only update if width changes
//       if(Math.abs(currentWidth - lastWidth.current) > 100) {
//         const newVh = window.innerHeight * 0.01;
//         document.documentElement.style.setProperty('--vh', `${newVh}px`);
//         lastWidth.current = currentWidth;
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <>
//       <Head>
//         {/* Changed to simpler meta tag */}
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       </Head>
//       <div>
//         <Component {...pageProps} />
//       </div>
//     </>
//   );
// }

// import Head from "next/head";
// import "@/styles/globals.css";
// import "@/styles/gears.css";
// import { useEffect, useRef } from "react";

// export default function App({ Component, pageProps }) {
//   const lastWidth = useRef(0);

//   // Set --vh on mount and on width change > 100px
//   useEffect(() => {
//     const setVh = () => {
//       const vh = window.innerHeight * 0.01;
//       document.documentElement.style.setProperty("--vh", `${vh}px`);
//     };

//     // Initial set
//     setVh();
//     lastWidth.current = window.innerWidth;

//     // Update on resize if width changes > 100px
//     const handleResize = () => {
//       const currentWidth = window.innerWidth;
//       if (Math.abs(currentWidth - lastWidth.current) > 100) {
//         setVh();
//         lastWidth.current = currentWidth;
//       }
//     };

//     // window.addEventListener("resize", handleResize);

//     // Also recalc --vh when window regains focus (after pull-to-refresh)
//     window.addEventListener("focus", setVh);

//     return () => {
//       // window.removeEventListener("resize", handleResize);
//       window.removeEventListener("focus", setVh);
//     };
//   }, []);

//   return (
//     <>
//       <Head>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       </Head>
//       {/* Wrap content in scroll-wrapper to isolate scroll */}
//       <div className="scroll-wrapper">
//         <Component {...pageProps} />
//       </div>
//     </>
//   );
// }
