// import { useEffect, useRef, useState } from "react";
// import { tinaField } from "tinacms/dist/react";

// export default function SubPartners({ subs }) {
//   const containerRef = useRef(null);
//   const styleRef = useRef(null);
//   const [trackWidth, setTrackWidth] = useState(0);
//   const [screenWidth, setScreenWidth] = useState(0);
//   const [animationKey, setAnimationKey] = useState(0); // to restart animation

//   useEffect(() => {
//     const updateWidths = () => {
//       if (containerRef.current) {
//         const totalWidth = containerRef.current.scrollWidth / 2; // width of one set
//         setTrackWidth(totalWidth);
//       }
//       setScreenWidth(window.innerWidth);
//       setAnimationKey(prev => prev + 1); // restart animation on resize or width change
//     };

//     // Run once on mount
//     updateWidths();

//     // Listen to window resize
//     window.addEventListener("resize", updateWidths);

//     // Use ResizeObserver to catch container size changes
//     let resizeObserver = null;
//     if (containerRef.current) {
//       resizeObserver = new ResizeObserver(updateWidths);
//       resizeObserver.observe(containerRef.current);
//     }

//     return () => {
//       window.removeEventListener("resize", updateWidths);
//       if (resizeObserver && containerRef.current) {
//         resizeObserver.unobserve(containerRef.current);
//       }
//     };
//   }, [subs]);

//   useEffect(() => {
//     if (styleRef.current && screenWidth && trackWidth) {
//       const styleTag = styleRef.current;
//       const animationName = "marqueeScroll";

//       styleTag.innerHTML = `
//         @keyframes ${animationName} {
//           from {
//             transform: translateX(${screenWidth}px);
//           }
//           to {
//             transform: translateX(-${trackWidth * 2}px);
//           }
//         }
//       `;
//     }
//   }, [screenWidth, trackWidth]);

//   return (
//     <div className="w-full h-[200px] overflow-hidden relative pt-16">
//       <style ref={styleRef} />
//       <div
//         key={animationKey} // re-trigger animation on width change
//         ref={containerRef}
//         className="flex absolute gap-16"
//         style={{
//           minWidth: trackWidth * 2,
//           animation: `marqueeScroll linear infinite`,
//           animationDuration: `${trackWidth / 30}s`, // adjust speed here
//         }}
//       >
//         {[...subs, ...subs].map((sub, i) => (
//           <img
//             data-tina-field={tinaField(sub,"agency")}
//             key={i}
//             src={sub.agency}
//             alt={`partner-${i}`}
//             className="h-[120px] w-auto object-contain flex-shrink-0"
//           />
//         ))}
//       </div>

//       {/* Fade overlays */}
//       <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
//       <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
//     </div>
//   );
// }


// import { useEffect, useRef, useState } from "react";
// import { tinaField } from "tinacms/dist/react";

// export default function SubPartners({ subs }) {
//   const containerRef = useRef(null);
//   const styleRef = useRef(null);
//   const [trackWidth, setTrackWidth] = useState(0);
//   const [screenWidth, setScreenWidth] = useState(0);
//   const [animationKey, setAnimationKey] = useState(0); // to restart animation

//   // New: Track index of the logo currently closest to center
//   const [activeIndex, setActiveIndex] = useState(null);

//   useEffect(() => {
//     const updateWidths = () => {
//       if (containerRef.current) {
//         const totalWidth = containerRef.current.scrollWidth / 2; // width of one set
//         setTrackWidth(totalWidth);
//       }
//       setScreenWidth(window.innerWidth);
//       setAnimationKey(prev => prev + 1); // restart animation on resize or width change
//     };

//     updateWidths();

//     window.addEventListener("resize", updateWidths);

//     let resizeObserver = null;
//     if (containerRef.current) {
//       resizeObserver = new ResizeObserver(updateWidths);
//       resizeObserver.observe(containerRef.current);
//     }

//     return () => {
//       window.removeEventListener("resize", updateWidths);
//       if (resizeObserver && containerRef.current) {
//         resizeObserver.unobserve(containerRef.current);
//       }
//     };
//   }, [subs]);

//   useEffect(() => {
//     if (styleRef.current && screenWidth && trackWidth) {
//       const styleTag = styleRef.current;
//       const animationName = "marqueeScroll";

//       styleTag.innerHTML = `
//         @keyframes ${animationName} {
//           from {
//             transform: translateX(${screenWidth}px);
//           }
//           to {
//             transform: translateX(-${trackWidth * 2}px);
//           }
//         }
//       `;
//     }
//   }, [screenWidth, trackWidth]);

//   // New: Track transform offset and detect active logo for zoom
//  useEffect(() => {
//   const container = containerRef.current;
//   if (!container) return;

//   let animationFrameId;

//   const step = () => {
//     if (!container) {
//       animationFrameId = requestAnimationFrame(step);
//       return;
//     }

//     const style = window.getComputedStyle(container);
//     const matrix = new DOMMatrixReadOnly(style.transform);
//     const translateX = matrix.m41;

//     const centerScreenX = window.innerWidth / 2;

//     const MAX_DISTANCE = 250;
//     const MAX_SCALE = 1.3;

//     Array.from(container.children).forEach((child) => {
//       const rect = child.getBoundingClientRect();
//       const childCenterX = rect.left + rect.width / 2;
//       const distance = Math.abs(centerScreenX - childCenterX);

//       let scale = 1;

//       if (distance < MAX_DISTANCE) {
//         scale = MAX_SCALE - ((distance / MAX_DISTANCE) * (MAX_SCALE - 1));
//       }

//       child.style.transform = `scale(${scale})`;
//       child.style.transition = "transform 0.3s ease";
//     });

//     animationFrameId = requestAnimationFrame(step);
//   };

//   animationFrameId = requestAnimationFrame(step);

//   return () => cancelAnimationFrame(animationFrameId);
// }, [animationKey]);


//   return (
//     <div className="w-full h-[200px] overflow-hidden relative pt-16">
//       <style ref={styleRef} />
//       <div
//         key={animationKey}
//         ref={containerRef}
//         className="flex absolute gap-16"
//         style={{
//           minWidth: trackWidth * 2,
//           animation: `marqueeScroll linear infinite`,
//           animationDuration: `${trackWidth / 30}s`,
//           willChange: "transform",
//         }}
//       >
//         {[...subs].map((sub, i) => (
//           <img
//             key={i}
//             data-tina-field={tinaField(sub, "agency")}
//             src={sub.agency}
//             alt={`partner-${i}`}
//             className={`h-[120px] w-auto object-contain flex-shrink-0 transition-transform duration-300 ${
//               i === activeIndex ? "scale-120" : "scale-100"
//             }`}
//             style={{ transformOrigin: "center center" }}
//           />
//         ))}
//       </div>

//       {/* Fade overlays */}
//       <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
//       <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
//     </div>
//   );
// }


import { useEffect, useRef } from "react";
import { tinaField } from "tinacms/dist/react";

export default function SubPartners({ subs }) {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const speed = 0.5; // pixels per frame

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container) return;

    let animationFrameId;
    let offset = 0;
    let setWidth = 0;
    const allImages = [];

    // Clear previous children
    container.innerHTML = "";

    // Create 3 full sets of logos for looping
    for (let i = 0; i < 5; i++) {
      subs.forEach((sub, index) => {
        const img = document.createElement("img");
        img.src = sub.agency;
        img.alt = `partner-${index}`;
        img.className =
          "h-[120px] w-auto object-contain flex-shrink-0 transition-transform duration-300 mx-8";
        img.setAttribute("data-tina-field", tinaField(sub, "agency"));
        container.appendChild(img);
        allImages.push(img);
      });
    }

    // Wait for DOM layout to calculate width
    const firstSet = Array.from(container.children).slice(0, subs.length);
    setWidth = firstSet.reduce(
      (acc, img) => acc + img.offsetWidth + 64, // account for mx-8 (32px each side)
      0
    );

    // Start offset to the full width of one set (off-screen right)
    offset = window.innerWidth;

    const step = () => {
      offset -= speed;

      // Reset loop if first full set has exited the left side
      if (offset <= -setWidth) {
        offset += setWidth;
      }

      container.style.transform = `translateX(${offset}px)`;

      // Scaling effect
      const centerX = window.innerWidth / 2;
      const maxDistance = 250;
      const maxScale = 1.3;

    //   allImages.forEach((img) => {
    //     const rect = img.getBoundingClientRect();
    //     const center = rect.left + rect.width / 2;
    //     const distance = Math.abs(center - centerX);
    //     const scale =
    //       distance < maxDistance
    //         ? maxScale - (distance / maxDistance) * (maxScale - 1)
    //         : 1;

    //     img.style.transform = `scale(${scale})`;
    //   });

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [subs]);

  return (
    <div
      className="w-full h-[200px] overflow-hidden relative pt-16"
      ref={wrapperRef}
    >
      <div
        ref={containerRef}
        className="flex absolute left-0 top-0 h-full items-center will-change-transform"
      />
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
    </div>
  );
}





// import { useEffect, useRef, useState } from "react";
// import { tinaField } from "tinacms/dist/react";

// export default function SubPartners({ subs }) {
//   const containerRef = useRef(null);
//   const speed = 0.5; // pixels per frame

//   // Start with double the subs for seamless scrolling
//   const [visibleImages, setVisibleImages] = useState([...subs, ...subs]);

//   // Track which subs index to add next
//   const nextIndexRef = useRef(subs.length);

//   // Track current offset of transform
//   const offsetRef = useRef(0);

//   // Animation loop
//   useEffect(() => {
//     if (!containerRef.current) return;
//     let animationFrameId;

//     const step = () => {
//       offsetRef.current -= speed;

//       const firstImage = containerRef.current.children[0];
//       if (!firstImage) return;

//       const threshold = firstImage.offsetWidth + 48; // gap-12 = 48px

//       if (-offsetRef.current >= threshold) {
//         // Update visible images to rotate
//         setVisibleImages((prev) => {
//           const newImage = subs[nextIndexRef.current % subs.length];
//           nextIndexRef.current += 1;
//           return [...prev.slice(1), newImage];
//         });
//         // Don't adjust offset here anymore
//       }

//       containerRef.current.style.transform = `translateX(${offsetRef.current}px)`;

//       animationFrameId = requestAnimationFrame(step);
//     };

//     animationFrameId = requestAnimationFrame(step);

//     return () => cancelAnimationFrame(animationFrameId);
//   }, [subs]);

//   // Adjust offset AFTER visibleImages updates and DOM renders
//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const firstImage = container.children[0];
//     if (!firstImage) return;

//     const threshold = firstImage.offsetWidth + 48;
//     offsetRef.current += threshold;
//     container.style.transform = `translateX(${offsetRef.current}px)`;
//   }, [visibleImages]);

//   return (
//     <div className="w-full h-[200px] overflow-hidden relative pt-16 bg-black">
//       <div
//         ref={containerRef}
//         className="flex gap-12 absolute top-0 left-0"
//         style={{ willChange: "transform" }}
//       >
//         {visibleImages.map((sub, i) => (
//           <img
//             key={i}
//             data-tina-field={tinaField(sub, "agency")}
//             src={sub.agency}
//             alt={`partner-${i}`}
//             className="h-[120px] w-auto object-contain flex-shrink-0 mx-6"
//           />
//         ))}
//       </div>

//       {/* Fade edges */}
//       <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
//       <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
//     </div>
//   );
// }


