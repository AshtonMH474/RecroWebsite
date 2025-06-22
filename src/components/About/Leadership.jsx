import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tinaField } from "tinacms/dist/react";
import LeaderCard from "./Leadership/LeaderCard";
import Pagination from "./Leadership/Pagination";
import GearIcon from "../GearIcon";
import { animationVariants } from "./Leadership/LeaderAnimations";
function Leadership({ leaders = [], leadershipHeading }) {
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const visibleCount = 6;
  const totalPages = Math.ceil(leaders.length / visibleCount);

  const goToPage = (pageIndex) => {
    const newStartIndex = pageIndex * visibleCount;
    setDirection(pageIndex > startIndex / visibleCount ? 1 : -1);
    setStartIndex(newStartIndex);
  };

  const visibleCards = leaders.slice(startIndex, startIndex + visibleCount);

  return (
    <div className="bg-black min-h-screen w-full pt-60 pb-24 pb-12 relative overflow-hidden">
      <h2
        data-tina-field={tinaField({ leadershipHeading }, "leadershipHeading")}
        className="font-bold text-[36px] text-white text-center"
      >
        {leadershipHeading}
      </h2>
      <div className="rounded-[12px] h-1 w-80 bg-primary mx-auto mt-2"></div>

      <div className="relative mt-16 flex justify-center items-center">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={startIndex}
            custom={direction}
            variants={animationVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-wrap justify-center gap-x-6 gap-y-20 max-w-[1000px] mx-auto px-4"
          >
            {visibleCards.map((leader, i) => (
              <LeaderCard key={i} leader={leader} />
            ))}
            {/* {visibleCards.map((leader, i) => (
  <div key={i} >
    <LeaderCard leader={leader} />
    {(i + 1) % 3 === 0 && i !== visibleCards.length - 1 && (
      <div className="">
        <GearIcon className="w-10 h-10 text-white animate-spin-slow" />
      </div>
    )}
  </div>
))} */}

          </motion.div>
        </AnimatePresence>
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={startIndex / visibleCount}
        goToPage={goToPage}
      />
    </div>
  );
}

export default Leadership;