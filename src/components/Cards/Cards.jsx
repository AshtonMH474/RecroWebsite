

// import { forwardRef, useRef, useState, useEffect, useImperativeHandle } from "react";
// import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
// import Card from "./Card";
// import { tinaField } from "tinacms/dist/react";
// import CardModal from "./CardModal";


// const Cards = forwardRef(function Cards(props, ref) {
//   const expertiseItems = props.cards || [];
//   const sectionRef = useRef(null);
//   const [sectionHeight, setSectionHeight] = useState(0);
//   const [rows, setRows] = useState(1);
//   const [short, setShort] = useState(false);
//   const [tall, setTall] = useState(false);

//   const [expandedCardIndex, setExpandedCardIndex] = useState(null);
//   const openCard = (index) => setExpandedCardIndex(index);
//   const closeCard = () => setExpandedCardIndex(null);

//   useImperativeHandle(ref, () => ({
//     scrollToHeading: () => {
//       sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
//     },
//   }));

//   // Initial layout setup only (no resize listener)
// useEffect(() => {
//   const updateRows = () => {
//     const screenWidth = window.innerWidth;

//     const cardsPerRow = screenWidth < 640 ? 1 : screenWidth < 948 ? 2 : 3;
//     const newRows = Math.ceil(expertiseItems.length / cardsPerRow);

//     setRows(newRows);
//   };

//   updateRows(); // Initial
//   window.addEventListener("resize", updateRows);

//   return () => window.removeEventListener("resize", updateRows);
// }, [expertiseItems.length]);

// // 2️⃣ When rows change, recalculate section height and flags
// useEffect(() => {
//   const screenWidth = window.innerWidth;
//   const screenHeight = window.innerHeight;

//   const cardsPerRow = screenWidth < 640 ? 1 : screenWidth < 948 ? 2 : 3;
//   const isShort = screenHeight <= 600;
//   const isTall = screenHeight >= 1000;

//   setShort(isShort);
//   setTall(isTall);

//   const stickyMultiplier = cardsPerRow === 1 ? 1.5 : 1;
//   const rowHeightPx = 0.8 * screenHeight;
//   const headingHeightPx = 0.8 * screenHeight;

//   const calculatedHeight =
//     (rows * rowHeightPx + headingHeightPx) *
//     (isShort ? 2 : 1) *
//     stickyMultiplier;

//   setSectionHeight(calculatedHeight);
// }, [rows]);



//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start start", "end end"],
//   });

//   const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
//   const cardsOpacity = useTransform(scrollYProgress, [0.02, 0.3], [0, 1], { clamp: true });
//   const cardsScale = useTransform(scrollYProgress, [0.02, 0.5], [0.1, 1], { clamp: true });
 
//   return (
//     <>
//       <section
//         ref={sectionRef}
//         style={{ height: `${sectionHeight}px` }}
//         className="relative "
//       >
//         <div
//           className=" overflow-hidden z-30 py-12 max-w-[1000px] mx-auto rounded-md"
//           style={{
//             position: "sticky",
//             paddingTop: short ? "5rem" : "3rem",
//             top: tall ? "200px" : "80px",
//           }}
//         >
//           <motion.h2
//             data-tina-field={tinaField(props, "cards_heading")}
//             className="font-bold text-[36px] text-white text-center"
//             style={{ opacity: headingOpacity }}
//           >
//             {props.cards_heading}
//           </motion.h2>

//           <motion.div
//             className={`rounded-[12px] h-1 w-${props.underline_width} bg-primary mx-auto mt-2`}
//             style={{ opacity: headingOpacity }}
//           />

//           <motion.div
//             id="target"
//             className="will-change-transform transform-gpu pt-12 flex flex-wrap justify-center gap-x-6 gap-y-12"
//             style={{ opacity: cardsOpacity, scale: cardsScale }}
//           >
//             {expertiseItems.map((ex, i) => (
//               <Card
//                 key={i}
//                 ex={ex}
//                 isExpanded={expandedCardIndex === i}
//                 onExpand={() => openCard(i)}
//                 onClose={closeCard}
//               />
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       <AnimatePresence>
//         {expandedCardIndex !== null && expertiseItems[expandedCardIndex].content.children.length && (
//           <CardModal
//             ex={expertiseItems[expandedCardIndex]}
//             onClose={closeCard}
//           />
//         )}
//       </AnimatePresence>
//     </>
//   );
// });

// export default Cards;
import { forwardRef, useRef, useState, useEffect, useImperativeHandle, useCallback } from "react";
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import Card from "./Card";
import { tinaField } from "tinacms/dist/react";
import CardModal from "./CardModal";

const Cards = forwardRef(function Cards(props, ref) {
  const expertiseItems = props.cards || [];
  const sectionRef = useRef(null);

  const [sectionHeight, setSectionHeight] = useState(0);
  const [rows, setRows] = useState(1);
  const [short, setShort] = useState(false);
  const [tall, setTall] = useState(false);

  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const openCard = useCallback((index) => setExpandedCardIndex(index), []);
  const closeCard = useCallback(() => setExpandedCardIndex(null), []);

  useImperativeHandle(ref, () => ({
    scrollToHeading: () => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    },
  }));

  // Debounced resize handler
  useEffect(() => {
    let timeoutId;

    const updateRows = () => {
      const screenWidth = window.innerWidth;
      const cardsPerRow = screenWidth < 640 ? 1 : screenWidth < 948 ? 2 : 3;
      const newRows = Math.ceil(expertiseItems.length / cardsPerRow);
      setRows(newRows);
    };

    const debouncedUpdateRows = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateRows, 150);
    };

    updateRows(); // initial call
    window.addEventListener("resize", debouncedUpdateRows);

    return () => {
      window.removeEventListener("resize", debouncedUpdateRows);
      clearTimeout(timeoutId);
    };
  }, [expertiseItems.length]);

  // Recalculate section height and flags when rows or viewport changes
  useEffect(() => {
    const updateHeightFlags = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const cardsPerRow = screenWidth < 640 ? 1 : screenWidth < 948 ? 2 : 3;
      const isShort = screenHeight <= 600;
      const isTall = screenHeight >= 1000;

      setShort(isShort);
      setTall(isTall);

      const stickyMultiplier = cardsPerRow === 1 ? 1.5 : 1;
      const rowHeightPx = 0.8 * screenHeight;
      const headingHeightPx = 0.8 * screenHeight;

      const calculatedHeight =
        (rows * rowHeightPx + headingHeightPx) *
        (isShort ? 2 : 1) *
        stickyMultiplier;

      setSectionHeight(calculatedHeight);
    };

    updateHeightFlags();
    window.addEventListener("resize", updateHeightFlags);

    return () => window.removeEventListener("resize", updateHeightFlags);
  }, [rows]);

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const cardsOpacity = useTransform(scrollYProgress, [0.02, 0.3], [0, 1], { clamp: true });
  const cardsScale = useTransform(scrollYProgress, [0.02, 0.5], [0.1, 1], { clamp: true });

  return (
    <>
      <section
        ref={sectionRef}
        style={{ height: `${sectionHeight}px` }}
        className="relative"
      >
        <div
          className="overflow-hidden z-30 py-12 max-w-[1000px] mx-auto rounded-md"
          style={{
            position: "sticky",
            paddingTop: short ? "5rem" : "3rem",
            top: tall ? "200px" : "80px",
            willChange: "opacity, transform",
          }}
        >
          <motion.h2
            data-tina-field={tinaField(props, "cards_heading")}
            className="font-bold text-[36px] text-white text-center"
            style={{ opacity: headingOpacity }}
          >
            {props.cards_heading}
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
            {expertiseItems.map((ex, i) => (
              <Card
                key={i}
                ex={ex}
                isExpanded={expandedCardIndex === i}
                onExpand={() => openCard(i)}
                onClose={closeCard}
              />
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {expandedCardIndex !== null &&
          expertiseItems[expandedCardIndex]?.content?.children?.length > 0 && (
            <CardModal
              ex={expertiseItems[expandedCardIndex]}
              onClose={closeCard}
            />
          )}
      </AnimatePresence>
    </>
  );
});

export default Cards;





























