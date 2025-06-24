// import Head from "next/head";
// import "@/styles/globals.css";
// import "@/styles/gears.css";
// import { ExpertiseProvider } from "@/context/ExpertiseContext";
// import { useEffect } from "react";


// export default function App({ Component, pageProps }) {
//     useEffect(() => {
//     const setVH = () => {
//       if (window.visualViewport) {
//         const vh = window.visualViewport.height * 0.01;
//         document.documentElement.style.setProperty("--vh", `${vh}px`);
//       } else {
//         const vh = window.innerHeight * 0.01;
//         document.documentElement.style.setProperty("--vh", `${vh}px`);
//       }
//     };

//     setVH();

//     if (window.visualViewport) {
//       window.visualViewport.addEventListener("resize", setVH);
//     } else {
//       window.addEventListener("resize", setVH);
//     }

//     return () => {
//       if (window.visualViewport) {
//         window.visualViewport.removeEventListener("resize", setVH);
//       } else {
//         window.removeEventListener("resize", setVH);
//       }
//     };
//   }, []);
//   return (
//     <>
//       <Head>
//        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"/>
//       </Head>
//         <ExpertiseProvider>
//           <Component {...pageProps} />
//         </ExpertiseProvider>
    
//     </>
//   );
  
// }
import Head from "next/head";
import "@/styles/globals.css";
import "@/styles/gears.css";
import { ExpertiseProvider } from "@/context/ExpertiseContext";
import { useEffect } from "react";
// DynamicHeightContainer is no longer needed, we'll use CSS custom property --vh instead
// import DynamicHeightContainer from "@/components/Height";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const setVH = () => {
      // Use window.visualViewport.height if available, falls back to window.innerHeight
      // This is crucial for handling mobile browser UI bars (address bar, bottom nav)
      const vh = (window.visualViewport?.height || window.innerHeight) * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    // Set initial --vh value
    setVH();

    // Re-calculate --vh on resize and visualViewport resize
    // Using requestAnimationFrame to ensure smooth updates
    const handler = () =>
      requestAnimationFrame(() => {
        setVH();
      });

    // Listen to both window resize and visualViewport resize for comprehensive coverage
    window.addEventListener("resize", handler);
    // visualViewport is specific to browsers and helps with dynamic UI elements
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handler);
    }

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("resize", handler);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handler);
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </Head>
      <ExpertiseProvider>
        {/* We no longer need DynamicHeightContainer as the --vh CSS variable will handle height */}
        {/* Instead, components will use CSS classes that leverage --vh */}
        <Component {...pageProps} />
      </ExpertiseProvider>
    </>
  );
}