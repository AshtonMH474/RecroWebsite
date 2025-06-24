

// import { forwardRef, useRef, useState, useEffect, useImperativeHandle } from "react";
// import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
// import ExpertiseCard from "./Expertise/ExpertiseCard";
// import { tinaField } from "tinacms/dist/react";
// import ExpertiseModal from "./Expertise/ExpertiseModal";

// const Expertise = forwardRef(function Expertise(props, ref) {
//   // used for animations
//   const expertiseItems = props.cards || [];
//   const sectionRef = useRef(null);
//   const [rows, setRows] = useState(1);
//   const [vhMultiplier, setVhMultiplier] = useState(1);
//   const [short, setShort] = useState(false);
//   const [height,setHeight] = useState(false)
//   const [sectionHeight, setSectionHeight] = useState(0);



//   // variables for expertise modals
//   const [expandedCardIndex, setExpandedCardIndex] = useState(null);
//   const openCard = (index) => setExpandedCardIndex(index);
//   const closeCard = () => setExpandedCardIndex(null);


//   useImperativeHandle(ref, () => ({
//     scrollToHeading: () => {
//       sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
//     },
//   }));



//   // this is to adjust animation based on screen size
// useEffect(() => {
//   const updateLayout = () => {
//     const screenWidth = window.innerWidth;
//     const screenHeight = window.innerHeight;

//     const cardsPerRow = screenWidth < 640 ? 1 : screenWidth < 1024 ? 2 : 3;
//     const newRows = Math.ceil(expertiseItems.length / cardsPerRow);
//     setRows(newRows);

//     const isShort = screenHeight <= 600;
//     const isHeight = screenHeight >= 1000;
//     if (isShort) setShort(true);
//     if (isHeight) setHeight(true);
//     setVhMultiplier(isShort ? 2 : 1);

//     const rowHeightPx = 0.65 * screenHeight; // 65vh
//     const headingHeightPx = 0.8 * screenHeight; // 80vh
//     const calculatedHeight = (newRows * rowHeightPx + headingHeightPx) * (isShort ? 2 : 1);
//     setSectionHeight(calculatedHeight);
//   };

//   updateLayout();


// }, []);




//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start start", "end end"],
//   });

//   // opacity of each componet and its fade
//   const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
//   const cardsOpacity = useTransform(scrollYProgress, [0.02, 0.3], [0, 1], { clamp: true });
//   const cardsScale = useTransform(scrollYProgress, [0.02, 0.5], [0.1, 1], { clamp: true });

//   // getting right heigh of div based on rows
//   const rowHeightVh = 65;
//   const headingHeightVh = 80;
//   const totalHeightVh = (rows * rowHeightVh + headingHeightVh) * vhMultiplier;

//   return (
//     <>
//     <section
//       ref={sectionRef}
//       style={{ height: `${totalHeightVh}vh` }}
//       className="relative"
//     >
//       <div
//         className="sticky   z-30 py-12 max-w-[1000px] mx-auto rounded-md [@media(max-height:600px)]:top-10"
//         style={{ paddingTop: short ? "5rem" : "3rem" ,
//           position:'sticky',
//           top: height ? '200px' : '80px'
//         }}
//       >
//         <motion.h2
//           data-tina-field={tinaField(props, "cards_heading")}
//           className="font-bold text-[36px] text-white text-center"
//           style={{ opacity: headingOpacity }}
//         >
//           {props.cards_heading}
//         </motion.h2>

//         <motion.div
//           className={`rounded-[12px] h-1 w-${props.underline_width} bg-primary mx-auto mt-2`}
//           style={{ opacity: headingOpacity }}
//         />

//         <motion.div
//           id="target"
//           className="will-change-transform transform-gpu pt-12 flex flex-wrap justify-center gap-x-6 gap-y-12"
//           style={{ opacity: cardsOpacity, scale: cardsScale }}
//         >
//           {/* cards of each expertise */}
//           {expertiseItems.map((ex, i) => (
//             <ExpertiseCard key={i} ex={ex}  isExpanded={expandedCardIndex === i}
//             onExpand={() => openCard(i)}
//             onClose={closeCard}/>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//     {/* opens modal when card is clicked */}
//     <AnimatePresence>    
//       {expandedCardIndex !== null && (
//         <ExpertiseModal
//           ex={expertiseItems[expandedCardIndex]}
//           onClose={closeCard}
//         />
//       )}
//       </AnimatePresence>

//   </>
//   );
// });

// export default Expertise;

import { forwardRef, useRef, useState, useEffect, useImperativeHandle } from "react";
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import ExpertiseCard from "./Expertise/ExpertiseCard";
import { tinaField } from "tinacms/dist/react";
import ExpertiseModal from "./Expertise/ExpertiseModal";

const Expertise = forwardRef(function Expertise(props, ref) {
  const expertiseItems = props.cards || [];
  const sectionRef = useRef(null);
  const [sectionHeight, setSectionHeight] = useState(0);
  const [rows, setRows] = useState(1);
  const [short, setShort] = useState(false);
  const [tall, setTall] = useState(false);

  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const openCard = (index) => setExpandedCardIndex(index);
  const closeCard = () => setExpandedCardIndex(null);

  useImperativeHandle(ref, () => ({
    scrollToHeading: () => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    },
  }));

  // Initial layout setup only (no resize listener)
useEffect(() => {
  const updateRows = () => {
    const screenWidth = window.innerWidth;

    const cardsPerRow = screenWidth < 640 ? 1 : screenWidth < 948 ? 2 : 3;
    const newRows = Math.ceil(expertiseItems.length / cardsPerRow);

    setRows(newRows);
  };

  updateRows(); // Initial
  window.addEventListener("resize", updateRows);

  return () => window.removeEventListener("resize", updateRows);
}, [expertiseItems.length]);

// 2️⃣ When rows change, recalculate section height and flags
useEffect(() => {
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
}, [rows]);



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
        className="relative "
      >
        <div
          className=" overflow-hidden z-30 py-12 max-w-[1000px] mx-auto rounded-md"
          style={{
            position: "sticky",
            paddingTop: short ? "5rem" : "3rem",
            top: tall ? "200px" : "80px",
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
              <ExpertiseCard
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




























