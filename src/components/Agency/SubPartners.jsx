// import { useEffect, useRef, useState } from "react";

// export default function SubPartners({ subs }) {
//   const containerRef = useRef(null);
//   const [trackWidth, setTrackWidth] = useState(0);

//   useEffect(() => {
//     if (containerRef.current) {
//       const totalWidth = containerRef.current.scrollWidth / 2; // width of one set
//       setTrackWidth(totalWidth);
//     }
//   }, [subs]);

//   return (
//     <div className="w-full h-[100px] overflow-hidden relative bg-black">
//       {/* The inner container that will scroll */}
//       <div
//         ref={containerRef}
//         className="flex absolute gap-12"
//         style={{
//           minWidth: trackWidth * 2, // twice the width for two sets
//           animation: `marqueeScroll linear infinite`,
//           animationDuration: `15s`, // speed: 50px/s, adjust as needed
//         }}
//       >
//         {[...subs, ...subs].map((sub, i) => (
//           <img
//             key={i}
//             src={sub.agency}
//             alt={`partner-${i}`}
//             className="h-[100px] w-auto object-contain opacity-80 hover:opacity-100 transition duration-300 flex-shrink-0"
//           />
//         ))}
//       </div>

//       {/* Optional fade edges */}
//       <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
//       <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />

//       {/* CSS styles for animation */}
//       <style jsx>{`
//         @keyframes marqueeScroll {
//           from {
//             transform: translateX(100%);
//           }
//           to {
//             transform: translateX(-100%);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

import { useEffect, useRef, useState } from "react";
import { tinaField } from "tinacms/dist/react";

export default function SubPartners({ subs }) {
  const containerRef = useRef(null);
  const styleRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const [animationKey, setAnimationKey] = useState(0); // to restart animation

  useEffect(() => {
    const updateWidths = () => {
      if (containerRef.current) {
        const totalWidth = containerRef.current.scrollWidth / 2; // width of one set
        setTrackWidth(totalWidth);
      }
      setScreenWidth(window.innerWidth);
      setAnimationKey(prev => prev + 1); // restart animation on resize or width change
    };

    // Run once on mount
    updateWidths();

    // Listen to window resize
    window.addEventListener("resize", updateWidths);

    // Use ResizeObserver to catch container size changes
    let resizeObserver = null;
    if (containerRef.current) {
      resizeObserver = new ResizeObserver(updateWidths);
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateWidths);
      if (resizeObserver && containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [subs]);

  useEffect(() => {
    if (styleRef.current && screenWidth && trackWidth) {
      const styleTag = styleRef.current;
      const animationName = "marqueeScroll";

      styleTag.innerHTML = `
        @keyframes ${animationName} {
          from {
            transform: translateX(${screenWidth}px);
          }
          to {
            transform: translateX(-${trackWidth * 2}px);
          }
        }
      `;
    }
  }, [screenWidth, trackWidth]);

  return (
    <div className="w-full h-[200px] overflow-hidden relative pt-16">
      <style ref={styleRef} />
      <div
        key={animationKey} // re-trigger animation on width change
        ref={containerRef}
        className="flex absolute gap-12"
        style={{
          minWidth: trackWidth * 2,
          animation: `marqueeScroll linear infinite`,
          animationDuration: `${trackWidth / 50}s`, // adjust speed here
        }}
      >
        {[...subs, ...subs].map((sub, i) => (
          <img
            data-tina-field={tinaField(sub,"agency")}
            key={i}
            src={sub.agency}
            alt={`partner-${i}`}
            className="h-[120px] w-auto object-contain flex-shrink-0"
          />
        ))}
      </div>

      {/* Fade overlays */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
    </div>
  );
}





