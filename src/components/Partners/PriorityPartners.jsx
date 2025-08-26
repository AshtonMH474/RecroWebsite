import { useState } from "react";
import { tinaField } from "tinacms/dist/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { animationVariants } from "../Leadership/LeaderAnimations";

function PriorityPartners({ partnersRes, ...block }) {
  const partners = partnersRes.partnerConnection.edges.map((e) => e.node);
  const priority = partners.filter((partner) => partner.priority === true);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(priority.length / itemsPerPage);

  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlePrev = () => {
    setDirection(-1);
    setPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
    };

    const handleNext = () => {
    setDirection(1);
    setPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
    };


  const visiblePartners = priority.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage
  );

  return (
    <div className="relative priority  bg-black overflow-hidden w-full pb-8">
      {/* Heading */}
      <div className="flex flex-col items-center mt-10 pb-4">
        {block.partners_heading && (
          <h2
            data-tina-field={tinaField(block, "partners_heading")}
            className="font-bold text-[32px] md:text-[40px] text-white text-center px-4"
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

    <div className="relative w-full flex justify-center">
        <div className="relative w-full max-w-6xl overflow-hidden priority2 flex items-center justify-center">
            {/* AnimatePresence + motion.div for sliding animation */}
            <AnimatePresence custom={direction} mode="wait">
            <motion.div
                key={page}
                custom={direction}
                variants={animationVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex flex-wrap justify-center gap-6"
            >
                {visiblePartners.map((partner, i) => (
                <a
                    key={i}
                    target="_blank"
                    href={partner.link}
                    className="flex-1 min-w-[250px] sm:basis-[45%] lg:basis-[30%] max-w-[300px]"
                >
                    <div
                    className="flex items-center justify-center gap-x-2 border border-white/15 
                                rounded-[8px] bg-[#1A1A1E] w-full h-[120px] px-4 py-6"
                    data-tina-field={tinaField(partner, "logo")}
                    >
                    <img
                        className="object-contain h-auto max-h-[100px] w-auto"
                        src={partner.logo}
                        alt={partner.title || "partner"}
                    />
                    {partner.needsTitle && partner.title && (
                        <h1 className="font-bold text-[26px] text-center text-white">
                        {partner.title}
                        </h1>
                    )}
                    </div>
                </a>
                ))}
            </motion.div>
            </AnimatePresence>

            {/* Arrows inside grid area */}
            <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2
                        bg-black/50 rounded-full p-2 text-white/70 
                        hover:text-white disabled:opacity-30 z-10"
            >
            <ChevronLeft size={28} />
            </button>

            <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2
                        bg-black/50 rounded-full p-2 text-white/70 
                        hover:text-white disabled:opacity-30 z-10"
            >
            <ChevronRight size={28} />
            </button>
        </div>
    </div>



      {/* === Buttons === */}
<div className="flex justify-center gap-x-8 mt-6">
  {block.buttons?.map((button, i) =>
    button.style === "border" && button.link ? (
      <Link href={button.link} key={i}>
        <button
          data-tina-field={tinaField(block.buttons[i], "label")}
          className="px-8 capitalize py-2 border primary-border rounded hover:text-white/80 transition-colors duration-300"
        >
          {button.label}
        </button>
      </Link>
    ) : button.style === "button" && button.link? (
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
