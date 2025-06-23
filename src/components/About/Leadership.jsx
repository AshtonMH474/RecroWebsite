import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { tinaField } from "tinacms/dist/react";
import LeaderCard from "./Leadership/LeaderCard";
import Pagination from "./Leadership/Pagination";
import GearIcon from "../GearIcon";
import { animationVariants } from "./Leadership/LeaderAnimations";
function Leadership(props) {
  // all the cards infos
  const leaders = props.leaders || []
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  // getting the total amount of pages needed based on how many are visbale at once
  const visibleCount = 6;
  const totalPages = Math.ceil(leaders.length / visibleCount);

  // go to what page based off index and the direction
  const goToPage = (pageIndex) => {
    const newStartIndex = pageIndex * visibleCount;
    setDirection(pageIndex > startIndex / visibleCount ? 1 : -1);
    setStartIndex(newStartIndex);
  };
  // these are the cards that are showing
  const visibleCards = leaders.slice(startIndex, startIndex + visibleCount);

// all of this is used to get that faded look based off scroll bar
  const leadershipRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: leadershipRef,
    offset: ["start end", "start start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={leadershipRef} className="bg-black min-h-screen w-full pt-30 pb-24 pb-12 relative overflow-hidden">
        <motion.div
        style={{ opacity: contentOpacity }}
        className="w-full"
        >
          <h2
            data-tina-field={tinaField(props, "leadershipHeading")}
            className="font-bold text-[36px] text-white text-center"
          >
            {props.leadershipHeading}
          </h2>
          <div className="rounded-[12px] h-1 w-80 bg-primary mx-auto mt-2"></div>

          <div className="relative mt-8 flex justify-center items-center min-h-[600px]">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={startIndex}
                custom={direction}
                variants={animationVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-wrap justify-center gap-x-6 gap-y-12 max-w-[1000px] mx-auto px-4 absolute w-full"
              >
                {visibleCards.map((leader, i) => (
                  <LeaderCard key={i} leader={leader} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>


          <Pagination
            totalPages={totalPages}
            currentPage={startIndex / visibleCount}
            goToPage={goToPage}
          />
        </motion.div>
    </div>
  );
}

export default Leadership;