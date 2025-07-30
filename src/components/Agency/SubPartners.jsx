
// import { useEffect, useRef } from "react";
// import { tinaField } from "tinacms/dist/react";

// export default function SubPartners({ subs }) {
//   const containerRef = useRef(null);
//   const wrapperRef = useRef(null);
//   const speed = 0.5; // pixels per frame

//   useEffect(() => {
//     const wrapper = wrapperRef.current;
//     const container = containerRef.current;
//     if (!wrapper || !container) return;

//     let animationFrameId;
//     let offset = 0;
//     let setWidth = 0;
//     const allImages = [];

//     // Clear previous children
//     container.innerHTML = "";

//     // Create 3 full sets of logos for looping
//     for (let i = 0; i < 5; i++) {
//       subs.forEach((sub, index) => {
//   // Create wrapper div
//   const wrapper = document.createElement("div");
//   wrapper.className =
//     "border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[300px] h-[260px] flex items-center justify-center mx-8";

//   // Create image
//   const img = document.createElement("img");
//   img.src = sub.agency;
//   img.alt = `partner-${index}`;
//   img.className =
//     "h-[120px] w-auto object-contain flex-shrink-0 transition-transform duration-300";
//   img.setAttribute("data-tina-field", tinaField(sub, "agency"));

//   // Append image to wrapper, then wrapper to container
//   wrapper.appendChild(img);
//   container.appendChild(wrapper);

//   allImages.push(img);
// });
//     }

//     // Wait for DOM layout to calculate width
//     const firstSet = Array.from(container.children).slice(0, subs.length);
//     setWidth = firstSet.reduce(
//       (acc, img) => acc + img.offsetWidth + 64, // account for mx-8 (32px each side)
//       0
//     );

//     // Start offset to the full width of one set (off-screen right)
//     offset = window.innerWidth;

//     const step = () => {
//       offset -= speed;

//       // Reset loop if first full set has exited the left side
//       if (offset <= -setWidth) {
//         offset += setWidth;
//       }

//       container.style.transform = `translateX(${offset}px)`;

//       // Scaling effect
//       const centerX = window.innerWidth / 2;
//       const maxDistance = 250;
//       const maxScale = 1.3;

//     //   allImages.forEach((img) => {
//     //     const rect = img.getBoundingClientRect();
//     //     const center = rect.left + rect.width / 2;
//     //     const distance = Math.abs(center - centerX);
//     //     const scale =
//     //       distance < maxDistance
//     //         ? maxScale - (distance / maxDistance) * (maxScale - 1)
//     //         : 1;

//     //     img.style.transform = `scale(${scale})`;
//     //   });

//       animationFrameId = requestAnimationFrame(step);
//     };

//     animationFrameId = requestAnimationFrame(step);

//     return () => cancelAnimationFrame(animationFrameId);
//   }, [subs]);

//   return (
//     <div
//       className="w-full h-[400px] overflow-hidden relative pt-16"
//       ref={wrapperRef}
//     >
//       <div
//         ref={containerRef}
//         className="flex absolute left-0 top-0 h-full items-center will-change-transform"
//       />
//       <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
//       <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
//     </div>
//   );
// }

import { useEffect, useRef } from "react";
import { tinaField } from "tinacms/dist/react";

export default function SubPartners({ subs }) {
  const cardWidth = 332;
  const visibleCards = 3;
  const speed = 1;
  const containerRef = useRef(null);
  const offsetRef = useRef(0);

  const loopedSubs = Array.from({ length: 4 }, () => subs).flat();
  const totalStripWidth = subs.length * cardWidth;

  useEffect(() => {
    let frame;

    const step = () => {
      if (!containerRef.current) return;

      offsetRef.current += speed;

      // Reset smoothly
      if (offsetRef.current >= totalStripWidth) {
        offsetRef.current -= totalStripWidth;
      }

      containerRef.current.style.transform = `translateX(-${offsetRef.current}px)`;

      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [subs.length]);

  return (
    <div className="relative mt-16 flex justify-center">
      <div
        className="relative overflow-hidden"
        style={{ width: visibleCards * cardWidth }}
      >
        <div
          ref={containerRef}
          className="flex gap-8 will-change-transform"
        >
          {loopedSubs.map((sub, idx) => (
            <div
              key={`${idx}-${sub.agency}`}
              className="border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[300px] h-[260px] flex items-center justify-center flex-shrink-0"
              data-tina-field={tinaField(sub, "agency")}
            >
              <img
                src={sub.agency}
                alt={`partner-${idx}`}
                className="h-[150px] w-auto object-contain"
              />
            </div>
          ))}
        </div>

        {/* Fades */}
        <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
}

