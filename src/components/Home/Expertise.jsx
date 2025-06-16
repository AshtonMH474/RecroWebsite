

import { forwardRef, useRef, useState, useEffect, useImperativeHandle } from "react";
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import ExpertiseCard from "./Expertise/ExpertiseCard";
import { tinaField } from "tinacms/dist/react";
import ExpertiseModal from "./Expertise/ExpertiseModal";

const Expertise = forwardRef(function Expertise(props, ref) {
  // used for animations
  const expertiseItems = props.expertise || [];
  const sectionRef = useRef(null);
  const [rows, setRows] = useState(1);
  const [vhMultiplier, setVhMultiplier] = useState(1);
  const [short, setShort] = useState(false);


  // variables for expertise modals
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const openCard = (index) => setExpandedCardIndex(index);
  const closeCard = () => setExpandedCardIndex(null);


  useImperativeHandle(ref, () => ({
    scrollToHeading: () => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    },
  }));



  // this is to adjust animation based on screen size
  useEffect(() => {
    const updateLayout = () => {
      const screenWidth = window.innerWidth;
      const cardsPerRow = screenWidth < 640 ? 1 : screenWidth < 1024 ? 2 : 3;
      setRows(Math.ceil(expertiseItems.length / cardsPerRow));

      const isShort = window.innerHeight <= 600;
      if (isShort) setShort(true);
      setVhMultiplier(isShort ? 2 : 1);
    };

    updateLayout();
    let timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(updateLayout, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [expertiseItems.length]);



  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // opacity of each componet and its fade
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const cardsOpacity = useTransform(scrollYProgress, [0.02, 0.3], [0, 1], { clamp: true });
  const cardsScale = useTransform(scrollYProgress, [0.02, 0.5], [0.1, 1], { clamp: true });

  // getting right heigh of div based on rows
  const rowHeightVh = 65;
  const headingHeightVh = 80;
  const totalHeightVh = (rows * rowHeightVh + headingHeightVh) * vhMultiplier;

  return (
    <>
    <section
      ref={sectionRef}
      style={{ height: `${totalHeightVh}vh` }}
      className="relative"
    >
      <div
        className="sticky top-20 z-30 py-12 max-w-[1000px] mx-auto rounded-md [@media(max-height:600px)]:top-10"
        style={{ paddingTop: short ? "5rem" : "3rem" }}
      >
        <motion.h2
          data-tina-field={tinaField(props, "expertise_heading")}
          className="font-bold text-[36px] text-white text-center"
          style={{ opacity: headingOpacity }}
        >
          {props.expertise_heading}
        </motion.h2>

        <motion.div
          className={`rounded-[12px] h-1 w-${props.underline_width} bg-primary mx-auto mt-2`}
          style={{ opacity: headingOpacity }}
        />

        <motion.div
          id="target"
          className="will-change-transform transform-gpu pt-12 flex flex-wrap justify-center gap-x-6 gap-y-12"
          style={{ opacity: cardsOpacity, scale: cardsScale }}
        >
          {/* cards of each expertise */}
          {expertiseItems.map((ex, i) => (
            <ExpertiseCard key={i} ex={ex}  isExpanded={expandedCardIndex === i}
            onExpand={() => openCard(i)}
            onClose={closeCard}/>
          ))}
        </motion.div>
      </div>
    </section>
    {/* opens modal when card is clicked */}
    <AnimatePresence>    
      {expandedCardIndex !== null && (
        <ExpertiseModal
          ex={expertiseItems[expandedCardIndex]}
          onClose={closeCard}
        />
      )}
      </AnimatePresence>

  </>
  );
});

export default Expertise;


























