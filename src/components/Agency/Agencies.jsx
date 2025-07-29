// import { useRef, useEffect } from "react";
// import { motion, useAnimation } from "framer-motion";
// import { tinaField } from "tinacms/dist/react";

// export default function Agencies(props) {
//   const trackRef = useRef(null);
//   const containerRef = useRef(null);
//   const controls = useAnimation();

//   const startMarquee = (track, container) => {
//     const distance = track + container;
//     const duration = distance / 100;

//     const animateLoop = async () => {
//       while (true) {
//         await controls.start({
//           x: [container, -track],
//           transition: {
//             duration,
//             ease: "linear",
//           },
//         });
//         // Wait one tick to ensure the DOM is mounted before resetting
//         requestAnimationFrame(() => {
//           controls.set({ x: container });
//         });
//       }
//     };

//     animateLoop();
//   };

//   useEffect(() => {
//     let previousWidth = window.innerWidth;

//     const init = () => {
//       if (trackRef.current && containerRef.current) {
//         const track = trackRef.current.scrollWidth;
//         const container = containerRef.current.offsetWidth;
//         controls.stop();
//         startMarquee(track, container);
//       }
//     };

//     init();

//     const handleResize = () => {
//       const currentWidth = window.innerWidth;
//       const widthDiff = Math.abs(currentWidth - previousWidth);

//       if (widthDiff >= 150) {
//         previousWidth = currentWidth;
//         init(); // only if width changed significantly
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [props.partners]);

//   return (
//     <section className="w-full  py-12 overflow-hidden">
//       <div className="text-center">
//         <h2
//           data-tina-field={tinaField(props, "agencies_heading")}
//           className="text-white font-bold text-[36px]"
//         >
//           {props.agencies_heading}
//         </h2>
//         <div className="bg-primary h-1 w-32 md:w-80 mx-auto mt-3 rounded-xl" />
//       </div>

//       <div
//         ref={containerRef}
//         className="relative w-full mt-12 overflow-hidden marquee-container"
//       >
//         <motion.div
//           ref={trackRef}
//           animate={controls}
//           className="flex gap-8 px-20"
//           style={{ whiteSpace: "nowrap" }}
//         >
//           {[...props.partners, ...props.partners].map((partner, i) => (
//             <img
//               key={i}
//               src={partner.agency}
//               onLoad={() => window.dispatchEvent(new Event('resize'))}
//               alt="agency logo"
//               className="h-[150px] w-auto object-contain drop-shadow-lg"
//             />
//           ))}
//         </motion.div>

//         {/* Gradient fades */}
//         <div className="absolute left-0 top-0 h-full w-20 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none" />
//         <div className="absolute right-0 top-0 h-full w-20 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none" />
//       </div>
//     </section>
//   );
// }

import { tinaField } from "tinacms/dist/react";
import AgencyCard from "./AgencyCard";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import AgencyModal from "./AgencyModal";
import SubPartners from "./SubPartners";

export default function Agencies(props) {
  const agencies = props.partners || [];
  const subs = props.subPartners || []

  const [expandedCardIndex, setExpandedCardIndex] = useState(null); 
  const openCard = (index) => setExpandedCardIndex(index);
  const closeCard = () => setExpandedCardIndex(null);

  return (
    <>
    <section className="relative overflow-hidden bg-black w-full pb-24"  style={{minHeight:'100dvh'}}>
      <motion.div
        className="flex flex-col items-center mt-32"
        data-tina-field={tinaField(props, "agencies_heading")}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
          <h2 className="text-white font-bold text-[32px] md:text-[40px]">
            {props.agencies_heading}
          </h2>
          <motion.div
            className="bg-primary h-1  md:w-80 mx-auto mt-3 rounded-xl"
            style={{width:props.underline_width}}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          />
      </motion.div>

      <div className="pt-12 max-w-[1000px] mx-auto flex justify-center flex-wrap gap-x-6 gap-y-12">
        {agencies.map((partner, i) => {

          return (
          <AgencyCard  
          isExpanded={expandedCardIndex === i}
          onExpand={() => openCard(i)}
          onClose={closeCard} 
          partner={partner} key={i} />
          )
          })}
      </div>
      <div>
        <SubPartners subs={subs}/>
      </div>
    </section>
    <AnimatePresence>
        {expandedCardIndex !== null  && (
          <AgencyModal
            partner={agencies[expandedCardIndex]}
            onClose={closeCard}
          />
        )}
      </AnimatePresence>
    </>
  );
}



