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
//         <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
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

// pages/_app.js
import Head from "next/head";
import "@/styles/globals.css";
import "@/styles/gears.css";
import { useEffect, useRef } from "react"; // Removed useState for lockedHeight as it's not used

export default function App({ Component, pageProps }) {
  const lastSize = useRef({ width: 0, height: 0 });

  // Refined --vh setup to handle all resize events
  useEffect(() => {
    const updateVh = () => {
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;

      // Always update --vh on resize.
      // The 150px threshold was preventing updates for smaller address bar changes.
      const newVh = currentHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${newVh}px`);

      // Update lastSize for next comparison, if you still want to track it,
      // but for --vh, you want it to be responsive to all changes.
      lastSize.current = { width: currentWidth, height: currentHeight };
    };

    // Initial set
    updateVh();

    // Add event listener for all resize events
    window.addEventListener('resize', updateVh);
    return () => window.removeEventListener('resize', updateVh);
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

  return (
    <>
      <Head>
        {/* Keeping user-scalable=no is generally okay, but be aware of its implications */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      {/* Remove the fixed height div, let CSS handle it with 100dvh or --vh */}
      <div> {/* This div's height isn't controlled by lockedHeight anymore */}
        <Component {...pageProps} />
      </div>
    </>
  );
}
