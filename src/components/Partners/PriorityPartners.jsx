import { useState } from "react";
import { tinaField } from "tinacms/dist/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { animationVariants } from "../Leadership/LeaderAnimations";

function PriorityPartners({ partnersRes, ...block }) {
  const partners = partnersRes.partnerConnection.edges.map((e) => e.node);
  const priority = partners.filter((partner) => partner.priority === true);
    console.log(block)
  const itemsPerPage = 3;
  const totalPages = Math.ceil(priority.length / itemsPerPage);

  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlePrev = () => {
    if (page > 0) {
      setDirection(-1);
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages - 1) {
      setDirection(1);
      setPage((prev) => prev + 1);
    }
  };

  const visiblePartners = priority.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage
  );

  return (
    <div className="relative bg-black overflow-hidden w-full pb-8">
      {/* Heading */}
      <div className="flex flex-col items-center mt-10 pb-4">
        {block.partners_heading && (
          <h2
            data-tina-field={tinaField(block, "partners_heading")}
            className="font-bold text-[32px] md:text-[40px] text-white"
          >
            {block.partners_heading}
          </h2>
        )}
        <div
          data-tina-field={tinaField(block, "underline_width")}
          style={{ width: block.underline_width }}
          className="rounded-[12px] h-1 bg-primary mt-2"
        />
      </div>

      {/* Carousel with Arrows */}
      <div className="relative w-full max-w-[1000px] mx-auto flex items-center">
        {/* Left arrow */}
        <button
          onClick={handlePrev}
          disabled={page === 0}
          className="absolute -left-12 md:-left-16 text-white/70 hover:text-white disabled:opacity-30 z-10"
        >
          <ChevronLeft size={36} />
        </button>

        {/* Animated cards */}
        <div className="overflow-hidden w-full min-h-[120px]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={page} // 🔑 important for triggering exit/enter
              custom={direction}
              variants={animationVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex justify-center gap-x-6"
            >
              {visiblePartners.map((partner, i) => (
                <div key={i} className="flex-shrink-0 w-[300px] flex justify-center">
                  <a target="_blank" href={partner.link}>
                    <div
                      className="flex items-center justify-center gap-x-2 border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[300px] h-[100px] px-4 py-6"
                      data-tina-field={tinaField(partner, "logo")}
                    >
                      <img
                        className="h-20 object-contain"
                        src={partner.logo}
                        alt={partner.title || "partner"}
                      />
                      {partner.needsTitle && partner.title && (
                        <h1 className="font-bold text-[clamp(14px,2vw,26px)] text-center text-white">
                          {partner.title}
                        </h1>
                      )}
                    </div>
                  </a>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right arrow */}
        <button
          onClick={handleNext}
          disabled={page === totalPages - 1}
          className="absolute -right-12 md:-right-16 text-white/70 hover:text-white disabled:opacity-30 z-10"
        >
          <ChevronRight size={36} />
        </button>
      </div>
      {/* === Buttons === */}
      {/* === Buttons === */}
<div className="flex justify-center gap-x-8 mt-2">
  {block.buttons?.map((button, i) =>
    button.style === "border" ? (
      <Link href={button.link} key={i}>
        <button
          data-tina-field={tinaField(block.buttons[i], "label")}
          className="px-8 capitalize py-2 border primary-border rounded hover:text-white/80 transition-colors duration-300"
        >
          {button.label}
        </button>
      </Link>
    ) : button.style === "button" ? (
      <Link href={button.link} key={i}>
        <button
          data-tina-field={tinaField(block.buttons[i], "label")}
          className="bg-primary capitalize cursor-pointer px-8 py-2 w-auto rounded hover:opacity-80 text-white"
        >
          {button.label}
        </button>
      </Link>
    ) : null
  )}
</div>

    </div>
  );
}

export default PriorityPartners;
