
// import { useRef, useState, useEffect } from "react";
// import { useScroll, useTransform, motion } from "framer-motion";
// import ExpertiseCard from "./Expertise/ExpertiseCard";
// import { tinaField } from "tinacms/dist/react";

// function Expertise(props) {
//   const expertiseItems = props.expertise || [];
//   const sectionRef = useRef(null);
//   const [rows, setRows] = useState(1);
//   const [vhMultiplier, setVhMultiplier] = useState(1);

//   // Adjust cards per row based on screen width
//   useEffect(() => {
//     const updateRows = () => {
//       const screenWidth = window.innerWidth;
//       let cardsPerRow;

//       if (screenWidth < 640) {
//         cardsPerRow = 1; // mobile
//       } else if (screenWidth < 1024) {
//         cardsPerRow = 2; // tablet
//       } else {
//         cardsPerRow = 3; // desktop
//       }

//       setRows(Math.ceil(expertiseItems.length / cardsPerRow));
//     };

//     updateRows();
//     window.addEventListener("resize", updateRows);
//     return () => window.removeEventListener("resize", updateRows);
//   }, [expertiseItems.length]);

//   // Adjust scroll height multiplier based on short viewports
//   useEffect(() => {
//     const updateMultiplier = () => {
//       const isShort = window.innerHeight <= 600;
//       setVhMultiplier(isShort ? 2 : 1); // Increase scrollable height on short screens
//     };

//     updateMultiplier();
//     window.addEventListener("resize", updateMultiplier);
//     return () => window.removeEventListener("resize", updateMultiplier);
//   }, []);

//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start start", "end end"],
//   });

//   const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
//   const cardsOpacity = useTransform(scrollYProgress, [0.02, 0.3], [0, 1], {
//     clamp: true,
//   });
//   const cardsScale = useTransform(scrollYProgress, [0.02, 0.5], [0.1, 1], {
//     clamp: true,
//   });

//   const rowHeightVh = 65; // each row gets 65% of viewport height
//   const headingHeightVh = 80; // heading + intro height
//   const totalHeightVh = (rows * rowHeightVh + headingHeightVh) * vhMultiplier;

//   return (
//     <section
//       ref={sectionRef}
//       style={{ height: `${totalHeightVh}vh` }}
//       className="relative"
//     >
//       <div
//         className={`
//           sticky top-20 z-30 py-12 max-w-[1000px] mx-auto rounded-md
//           [@media(max-height:600px)]:top-10
//         `}
//       >
//         <motion.h2
//           data-tina-field={tinaField(props, "expertise_heading")}
//           className="font-bold text-[36px] text-white text-center"
//           style={{ opacity: headingOpacity }}
//         >
//           {props.expertise_heading}
//         </motion.h2>

//         <motion.div
//           style={{ opacity: headingOpacity }}
//           className={`rounded-[12px] h-1 w-${props.underline_width} bg-primary mx-auto mt-2`}
//         />

//         <motion.div
//           className="pt-12 flex flex-wrap justify-center gap-x-6 gap-y-12"
//           style={{ opacity: cardsOpacity, scale: cardsScale }}
//         >
//           {expertiseItems.map((ex, i) => (
//             <ExpertiseCard key={i} ex={ex} />
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// export default Expertise;


import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import ExpertiseCard from "./Expertise/ExpertiseCard";
import { tinaField } from "tinacms/dist/react";

function Expertise(props) {
  const expertiseItems = props.expertise || [];
  const sectionRef = useRef(null);
  const [rows, setRows] = useState(1);
  const [vhMultiplier, setVhMultiplier] = useState(1);
  const [short,setShort] = useState(false)

  // Throttle resize logic
  useEffect(() => {
    const updateLayout = () => {
      const screenWidth = window.innerWidth;
      const cardsPerRow = screenWidth < 640 ? 1 : screenWidth < 1024 ? 2 : 3;
      setRows(Math.ceil(expertiseItems.length / cardsPerRow));

      const isShort = window.innerHeight <= 600;
      if(isShort)setShort(true)
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

  const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
 const cardsOpacity = useTransform(scrollYProgress, [0.02, 0.3], [0, 1], {
    clamp: true,
  });
  const cardsScale = useTransform(scrollYProgress, [0.02, 0.5], [0.1, 1], {
    clamp: true,
  });




  const rowHeightVh = 65;
  const headingHeightVh = 80;
  const totalHeightVh = (rows * rowHeightVh + headingHeightVh) * vhMultiplier;

  return (
    <section
      ref={sectionRef}
      style={{ height: `${totalHeightVh}vh`
     }}
      className={`relative `}
    //   style={{ marginTop: short ? "4rem" : "0px" }}

    >
      <div className="sticky top-20 z-30 py-12 max-w-[1000px] mx-auto rounded-md [@media(max-height:600px)]:top-10"
      style={{ paddingTop: short ? "5rem" : "3rem" }}>
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
          className="will-change-transform transform-gpu pt-12 flex flex-wrap justify-center gap-x-6 gap-y-12"
          style={{ opacity: cardsOpacity, scale: cardsScale }}
        >
          {expertiseItems.map((ex, i) => (
            <ExpertiseCard key={i} ex={ex} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Expertise;



























