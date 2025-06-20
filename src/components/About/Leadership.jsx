import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GearIcon from "../GearIcon";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

function Leadership(props) {
  const leaders = props.leaders || [];
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

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      position: "absolute",
      width: "100%",
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative",
      width: "100%",
    },
    exit: (dir) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      position: "absolute",
      width: "100%",
    }),
  };

  return (
    <div className="bg-black min-h-screen w-full pt-32 pb-20 relative overflow-hidden">
      <h2
        data-tina-field={tinaField(props, "leadershipHeading")}
        className="font-bold text-[36px] text-white text-center"
      >
        {props.leadershipHeading}
      </h2>
      <div className="rounded-[12px] h-1 w-80 bg-primary mx-auto mt-2"></div>

      {/* Animated Flex Container */}
      <div className="relative mt-16 flex justify-center items-center h-[580px]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={startIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-wrap justify-center gap-x-6 gap-y-12 max-w-[1000px] mx-auto px-4"
          >
            {visibleCards.map((leader, i) => (
              <div
                data-tina-field={tinaField(leader, "src")}
                key={i}
                role="img"
                aria-label={`${leader.name}, ${leader.title}`}
                className="relative group w-full sm:w-[300px] h-[260px] rounded-[8px] overflow-hidden shadow-md transform transition-all duration-300 hover:scale-105"
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 group-hover:opacity-0"
                  style={{ backgroundImage: `url(${leader.src})` }}
                />

                {/* Solid background on hover */}
                <div className="absolute inset-0 bg-[#1A1A1E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content layer (gradient + text) */}
                <div className="absolute inset-0 z-10 transition-opacity duration-300 group-hover:opacity-0">
                
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <div className="absolute bottom-2 left-2 bg-[#1A1A1E] px-3 py-2 rounded-xl min-w-[40%] max-w-[90%] ">
                    <p
                      data-tina-field={tinaField(leader, "name")}
                      className="text-white text-sm font-semibold truncate"
                    >
                      {leader.name},
                    </p>
                    <p
                      data-tina-field={tinaField(leader, "title")}
                      className="text-white text-sm"
                    >
                      {leader.title}
                    </p>
                  </div>
                </div>
                <div
                  data-tina-field={tinaField(leader, "bio")}
                  className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-start justify-center px-4 pt-6 text-center overflow-auto"
                >
                  <TinaMarkdown
                  content={leader.bio}
                  components={{
                    p:({children}) => (
                      <p  >{children}</p>
                    )
                  }}/>
                </div>
              </div>
            ))}
          </motion.div>

        </AnimatePresence>
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center gap-2 mt-10 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={`px-4 py-2 rounded transition-all duration-200 ${
              startIndex / visibleCount === i
                ? "bg-primary text-white"
                : "cursor-pointer border border-white/15 bg-[#1A1A1E] text-white hover:opacity-80 transition-opacity duration-200"
            }`}
          >
           {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Leadership;



