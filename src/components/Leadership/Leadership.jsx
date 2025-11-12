import {  useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { tinaField } from "tinacms/dist/react";
import LeaderCard from "./LeaderCard";
import Pagination from "./Pagination";
import { animationVariants } from "./LeaderAnimations";
import DivGears from "../DivGears";
import LeaderModal from "./LeaderModal";

function Leadership(props) {
  // all the cards infos
  const leaders = props.leaders || []
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const [gearRotation, setGearRotation] = useState(0);
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const openCard = (index) => setExpandedCardIndex(index);
  const closeCard = () => setExpandedCardIndex(null);
  // getting the total amount of pages needed based on how many are visbale at once
  const visibleCount = 3;
  const totalPages = Math.ceil(leaders.length / visibleCount);
  
  // go to what page based off index and the direction
 
  const goToPage = (pageIndex) => {
  const newStartIndex = pageIndex * visibleCount;
  const goingForward = pageIndex > startIndex / visibleCount;
  const rotationAmount = goingForward ? 90 : -90;

  setDirection(goingForward ? 1 : -1);
  setStartIndex(newStartIndex);
  setGearRotation((prev) => prev + rotationAmount);
};
  // these are the cards that are showing
  const visibleCards = leaders.slice(startIndex, startIndex + visibleCount);


 
 


  return (
    <>
    <div id={props.leadership_id}  style={{ minHeight: 'auto' }} className="relative  bg-black  w-full pb-24  overflow-hidden">
        

        <div
        className="relative"
        >
          <div className="flex flex-col items-center mt-32 pb-12">
            <h2
              data-tina-field={tinaField(props, "leadershipHeading")}
              className="font-bold text-[32px] md:text-[40px] text-white text-center px-4"
            >
              {props.leadershipHeading}
            </h2>
            <div className="rounded-[12px] h-1 w-80 bg-primary mx-auto mt-2"></div>
          </div>
          <div className="w-full">
            <DivGears  gearRotation={gearRotation}/>
                <div className="relative w-full max-w-[1000px] mx-auto overflow-hidden min-h-[500px]">
                  <AnimatePresence custom={direction} mode="wait">
                    <motion.div
                      key={startIndex}
                      custom={direction}
                      variants={animationVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="relative  w-full flex flex-wrap items-center justify-center gap-x-6 gap-y-12"
                    >
                      {visibleCards.map((leader, i) => (
                        <LeaderCard key={leader._id || leader.name || i} leader={leader} isExpanded={expandedCardIndex === i}
                        onExpand={() => openCard(i)}
                        onClose={closeCard} />
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
          </div>

          {totalPages > 1 && (
            <Pagination
            totalPages={totalPages}
            currentPage={startIndex / visibleCount}
            goToPage={goToPage}
          />
          )}
          
        </div>
    </div>
      <AnimatePresence>
        {expandedCardIndex !== null && (
          <LeaderModal
            leader={visibleCards[expandedCardIndex]}
            onClose={closeCard}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Leadership;