// import { motion, AnimatePresence } from "framer-motion";
// import { animationVariants } from "@/components/Leadership/LeaderAnimations";
// import { useCarousel } from "./useCarousel";
// import PartnerCard from "./PartnerCard";
// import Controls from "./Controls";
// import Buttons from "./Buttons";
// import Heading from "./Heading";

// export default function PriorityPartners({ partnersRes, ...block }) {
//   const partners = partnersRes.partnerConnection.edges.map((e) => e.node);
//   const priority = partners.filter((partner) => partner.priority === true);

//   const {
//     page,
//     setPage,
//     direction,
//     setDirection,
//     paused,
//     setPaused,
//     itemsPerPage,
//     totalPages,
//   } = useCarousel(priority);

//   const handlePrev = () => {
//     setDirection(-1);
//     setPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setDirection(1);
//     setPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
//   };

//   const visiblePartners = priority.slice(
//     page * itemsPerPage,
//     page * itemsPerPage + itemsPerPage
//   );

//   return (
//     <div className="relative bg-black overflow-hidden w-full mb-16 mt-16 h-[400px] ">
//       <Heading block={block} />

//       <div className="relative w-full flex justify-center">
//         <div className="relative w-full max-w-6xl overflow-hidden flex items-center justify-center">
//           <AnimatePresence custom={direction} mode="wait">
//             <motion.div
//               key={page}
//               custom={direction}
//               variants={animationVariants}
//               initial="enter"
//               animate="center"
//               exit="exit"
//               transition={{ duration: 0.4, ease: "easeInOut" }}
//               className="flex flex-wrap justify-center gap-6"
//             >
//               {visiblePartners.map((partner, i) => (
//                 <PartnerCard key={i} partner={partner} />
//               ))}
//             </motion.div>
//           </AnimatePresence>

//           <Controls
//             handlePrev={handlePrev}
//             handleNext={handleNext}
//           />
//         </div>
//       </div>

//       <Buttons buttons={block.buttons} paused={paused} togglePause={() => setPaused((p) => !p)} />
//     </div>
//   );
// }
import PartnerCard from "./PartnerCard";
import Heading from "./Heading";
import Buttons from "./Buttons";

export default function PriorityPartners({ partnersRes, ...block }) {
  const partners = partnersRes.partnerConnection.edges.map((e) => e.node);
  const priority = partners.filter((partner) => partner.priority === true);

  // Duplicate array for seamless loop
  const loopPartners = [...priority, ...priority];

  return (
    <div className="relative bg-black overflow-hidden w-full mb-16 mt-16 h-[400px]">
  <Heading block={block} />

  {/* Fade overlay on left */}
  <div className="absolute left-0 top-0 h-full w-10 sm:w-24 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />

  {/* Fade overlay on right */}
  <div className="absolute right-0 top-0 h-full w-10 sm:w-24  bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />

  <div className="relative w-full flex items-center overflow-hidden">
    <div className="marquee flex gap-6">
      {loopPartners.map((partner, i) => (
        <PartnerCard key={i} partner={partner} />
      ))}
    </div>
  </div>

  <Buttons buttons={block.buttons} />
</div>
  );
}







