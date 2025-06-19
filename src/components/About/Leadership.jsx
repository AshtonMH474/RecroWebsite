import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GearIcon from "../GearIcon";

function Leadership() {
  const cards = Array.from({ length: 10 }, (_, i) => i + 1);
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [gearRotation, setGearRotation] = useState(0);
  const visibleCount = 6;

  const handleSlideLeft = () => {
    if (startIndex + visibleCount < cards.length) {
      setDirection(1);
      setStartIndex(startIndex + 6);
      setGearRotation((prev) => prev + 90);
    }
  };

  const handleSlideRight = () => {
    if (startIndex > 0) {
      setDirection(-1);
      setStartIndex(startIndex - 6);
      setGearRotation((prev) => prev - 90);
    }
  };

  const visibleCards = cards.slice(startIndex, startIndex + visibleCount);

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      position: "absolute",
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "static",
    },
    exit: (dir) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      position: "absolute",
    }),
  };

  return (
    <div className="bg-black min-h-screen w-full mt-42 relative z-0 pb-20 overflow-hidden">
         {/* <motion.div
       
      >
        <GearIcon  animate={{ rotate: gearRotation }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute top-8 left-8 w-12 h-12" />
      </motion.div> */}
      <div className="pt-32 max-w-[1000px] mx-auto">
        <h2 className="font-bold text-[36px] text-white text-center">
          Leadership
        </h2>
        <div className="rounded-[12px] h-1 w-80 bg-primary mx-auto mt-2"></div>

        {/* Animate the card group */}
        <div className="relative h-[260px] mt-16 flex justify-center items-center pt-60">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={startIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex gap-x-6 flex-wrap gap-y-12"
            >
              {visibleCards.map((card) => (
                <div
                  key={card}
                  className="border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[300px] h-[260px] px-4 py-6 cursor-pointer"
                >
                  <p className="text-white text-center">Card {card}</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
          
        </div>

        {/* Buttons */}
             <div className="flex justify-center gap-4 mt-80">
          <button
            onClick={handleSlideRight}
            disabled={startIndex === 0}
            className="bg-white text-black px-4 py-2 rounded disabled:opacity-50"
          >
            Slide Right
          </button>
          <button
            onClick={handleSlideLeft}
            disabled={startIndex + visibleCount >= cards.length}
            className="bg-white text-black px-4 py-2 rounded disabled:opacity-50"
          >
            Slide Left
          </button>
        </div>
      </div>
    </div>
  );
}

export default Leadership;


