import Head from "next/head";
import "@/styles/globals.css";
import "@/styles/gears.css";
import { useEffect,useRef } from "react";
import BG from "@/components/BG";

export default function App({ Component, pageProps }) {
    const lastSize = useRef({ width: 0, height: 0 });

  // 1️⃣ Initial --vh setup on mount
  useEffect(() => {
    requestAnimationFrame(() => {
      const initialVh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${initialVh}px`);
      lastSize.current = { width: window.innerWidth, height: window.innerHeight };

      // Remove .not-ready to reveal body after layout is stable
        // setTimeout(() => {
      document.body.classList.remove("not-ready");
    
    });
  }, []);

  // 2️⃣ Resize listener that only runs if change > 150px
  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;

      const widthDiff = Math.abs(currentWidth - lastSize.current.width);
      const heightDiff = Math.abs(currentHeight - lastSize.current.height);

      if (widthDiff > 150) {
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
      <div className="app-wrapper">
        {/* <BG/> */}
        <Component {...pageProps} />
      </div>

      
      
    </>
  );
}


// import Head from "next/head";
// import "@/styles/globals.css";
// import "@/styles/gears.css";
// import { useEffect, useRef } from "react";
// import BG from "@/components/BG";

// export default function App({ Component, pageProps }) {
//   const lastSize = useRef({ width: 0, height: 0 });

//   // 1️⃣ Initial --vh setup on mount
//   useEffect(() => {
//     requestAnimationFrame(() => {
//       const initialVh = window.innerHeight * 0.01;
//       document.documentElement.style.setProperty("--vh", `${initialVh}px`);
//       lastSize.current = { width: window.innerWidth, height: window.innerHeight };

//       // Remove initial loading blocker
//       document.body.classList.remove("not-ready");
//     });
//   }, []);

//   // 2️⃣ Resize listener (for --vh updates)
//   useEffect(() => {
//     const handleResize = () => {
//       const currentWidth = window.innerWidth;
//       const currentHeight = window.innerHeight;

//       const widthDiff = Math.abs(currentWidth - lastSize.current.width);
//       const heightDiff = Math.abs(currentHeight - lastSize.current.height);

//       if (widthDiff > 150) {
//         const newVh = currentHeight * 0.01;
//         document.documentElement.style.setProperty("--vh", `${newVh}px`);
//         lastSize.current = { width: currentWidth, height: currentHeight };
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // 3️⃣ Scroll listener to freeze layout on pull-down
//   useEffect(() => {
//     let ticking = false;

//     const handleScroll = () => {
//       if (window.scrollY <= 0 && !ticking) {
//         ticking = true;
//         document.body.classList.add("freeze-fix");

//         requestAnimationFrame(() => {
//           setTimeout(() => {
//             document.body.classList.remove("freeze-fix");
//             ticking = false;
//           }, 200);
//         });
//       }
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <>
//       <Head>
//         <meta
//           name="viewport"
//           content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
//         />
//       </Head>
//       <div className="app-wrapper">
//         <BG />
//         <Component {...pageProps} />
//       </div>
//     </>
//   );
// }
