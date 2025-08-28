

// import {  useRef, useState, useEffect } from "react";
// import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
// import Card from "./Card";
// import { tinaField } from "tinacms/dist/react";
// import CardModal from "./CardModal";


// function Cards(props) {
  
//   const expertiseItems = props.cards || [];
//   const sectionRef = useRef(null);
//   const [sectionHeight, setSectionHeight] = useState(0);
//   const [rows, setRows] = useState(1);
//   const [short, setShort] = useState(false);
//   const [tall, setTall] = useState(false);

//   const [expandedCardIndex, setExpandedCardIndex] = useState(null);
//   const openCard = (index) => setExpandedCardIndex(index);
//   const closeCard = () => setExpandedCardIndex(null);


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
//   const screenHeight = window.innerHeight;

//   const isShort = screenHeight <= 600;
//   const isTall = screenHeight >= 1000;

//   setShort(isShort);
//   setTall(isTall);


//   const rowHeightPx = 0.8 * screenHeight;
//   const headingHeightPx = 0.8 * screenHeight;

//   const calculatedHeight =
//     (rows * rowHeightPx + headingHeightPx) *
//     (isShort ? 2 : 1) ;

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
//         id={props.cards_id}
//         ref={sectionRef}
//         style={{ height: `${sectionHeight}px` }}
//         className="relative pb-16"
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
//             className="font-bold text-[32px] px-4 md:text-[40px] text-white text-center"
//             style={{ opacity: headingOpacity }}
//           >
//             {props.cards_heading}
//           </motion.h2>

//           <motion.div
//             className={`rounded-[12px] h-1 bg-primary mx-auto mt-2`}
//             data-tina-field={tinaField(props,"underline_width")}
//             style={{ opacity: headingOpacity,width:props.underline_width }}
//           />

//           <motion.div
//             id="target"
//             className="contain-paint contain-layout transform-gpu pt-12 flex flex-wrap justify-center gap-x-6 gap-y-12"
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
//         {expandedCardIndex !== null && expertiseItems[expandedCardIndex].content.children.length && expertiseItems[expandedCardIndex].allContentLink && expertiseItems[expandedCardIndex].contentIcon && (
//           <CardModal
//             ex={expertiseItems[expandedCardIndex]}
//             onClose={closeCard}
//           />
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Cards;



import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import Card from "./Card";
import { tinaField } from "tinacms/dist/react";
import CardModal from "./CardModal";

function Cards(props) {
  const expertiseItems = props.cards || [];
  const sectionRef = useRef(null);
  const [sectionHeight, setSectionHeight] = useState(0);
  const [rows, setRows] = useState(1);
  const [short, setShort] = useState(false);
  const [tall, setTall] = useState(false);

  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const openCard = (index) => setExpandedCardIndex(index);
  const closeCard = () => setExpandedCardIndex(null);

  // Rows calc
  useEffect(() => {
    const updateRows = () => {
      const screenWidth = window.innerWidth;
      const cardsPerRow = screenWidth < 640 ? 1 : screenWidth < 948 ? 2 : 3;
      setRows(Math.ceil(expertiseItems.length / cardsPerRow));
    };
    updateRows();
    window.addEventListener("resize", updateRows);
    return () => window.removeEventListener("resize", updateRows);
  }, [expertiseItems.length]);

  // Section height + flags
  useEffect(() => {
    const screenHeight = window.innerHeight;
    setShort(screenHeight <= 600);
    setTall(screenHeight >= 1000);

    const rowHeightPx = 0.8 * screenHeight;
    const headingHeightPx = 0.8 * screenHeight;

    setSectionHeight(
      (rows * rowHeightPx + headingHeightPx) * (screenHeight <= 600 ? 2 : 1)
    );
  }, [rows]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <>
      <section
        id={props.cards_id}
        ref={sectionRef}
        style={{ height: `${sectionHeight}px` }}
        className="relative pb-16"
      >
        <div
          className="overflow-hidden z-30 py-12 max-w-[1000px] mx-auto rounded-md"
          style={{
            position: "sticky",
            paddingTop: short ? "5rem" : "3rem",
            top: tall ? "200px" : "80px",
          }}
        >
          <motion.h2
            data-tina-field={tinaField(props, "cards_heading")}
            className="font-bold text-[32px] px-4 md:text-[40px] text-white text-center"
            style={{ opacity: headingOpacity }}
          >
            {props.cards_heading}
          </motion.h2>

          <motion.div
            className="rounded-[12px] h-1 bg-primary mx-auto mt-2"
            data-tina-field={tinaField(props, "underline_width")}
            style={{ opacity: headingOpacity, width: props.underline_width }}
          />

          {/* ✅ Animate each card individually */}
          <div
            id="target"
            className="contain-paint contain-layout transform-gpu pt-12 flex flex-wrap justify-center gap-x-6 gap-y-12"
          >
            {expertiseItems.map((ex, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <Card
                  ex={ex}
                  isExpanded={expandedCardIndex === i}
                  onExpand={() => openCard(i)}
                  onClose={closeCard}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {expandedCardIndex !== null &&
          expertiseItems[expandedCardIndex].content.children.length &&
          expertiseItems[expandedCardIndex].allContentLink &&
          expertiseItems[expandedCardIndex].contentIcon && (
            <CardModal
              ex={expertiseItems[expandedCardIndex]}
              onClose={closeCard}
            />
          )}
      </AnimatePresence>
    </>
  );
}

export default Cards;


























