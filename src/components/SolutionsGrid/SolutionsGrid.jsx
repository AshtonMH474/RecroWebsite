


import { tinaField } from "tinacms/dist/react"
import SolutionCard from "./SolutionCard"
import { useEffect, useRef, useState } from "react";
import { useScroll,motion, useTransform, AnimatePresence } from "framer-motion";
import PdfModal from "./SolutionModal";

function SolutionsGrid({solutionRes,...block}){
    const solutions = solutionRes.solutionConnection.edges.map(e => e.node);
    const sectionRef = useRef(null);
    const [sectionHeight, setSectionHeight] = useState(0);
    const [rows, setRows] = useState(1);
    const [short, setShort] = useState(false);
    const [tall, setTall] = useState(false);
    const isSolutionGrid = true

    useEffect(() => {
      const updateRows = () => {
        const screenWidth = window.innerWidth;
    
        const cardsPerRow = screenWidth < 640 ? 1 : screenWidth < 948 ? 2 : 3;
        const newRows = Math.ceil(solutions.length / cardsPerRow);
    
        setRows(newRows);
      };
    
      updateRows(); // Initial
      window.addEventListener("resize", updateRows);
    
      return () => window.removeEventListener("resize", updateRows);
    }, [solutions.length]);
    
    // 2️⃣ When rows change, recalculate section height and flags
    useEffect(() => {
      const screenHeight = window.innerHeight;
    
      const isShort = screenHeight <= 600;
      const isTall = screenHeight >= 1000;
    
      setShort(isShort);
      setTall(isTall);
    
    
      const rowHeightPx = 0.8 * screenHeight;
      const headingHeightPx = 0.8 * screenHeight;
    
      const calculatedHeight =
        (rows * rowHeightPx + headingHeightPx) *
        (isShort ? 2 : 1) ;
    
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
            <section id={block.solutions_id} ref={sectionRef}
            style={{ height: `${sectionHeight}px` }}
            className="scrollCenter pb-16 relative" >
                <div style={{
                    position: "sticky",
                    paddingTop: short ? "5rem" : "3rem",
                    top: tall ? "200px" : "80px",
                }} className=" overflow-hidden z-30 py-12 max-w-[1000px] mx-auto rounded-md">
                        <motion.h2 style={{ opacity: headingOpacity }} data-tina-field={tinaField(block,'solutions_heading')} className="font-bold px-4 text-[32px] md:text-[40px] text-white text-center">
                            {block.solutions_heading}
                        </motion.h2>
                        <motion.div data-tina-field={tinaField(block,'underline_width')} style={{ opacity: headingOpacity,width:block.underline_width }}
                        className={`rounded-[12px] h-1  bg-primary mx-auto mt-2`}
                        />
                        <motion.div style={{ opacity: cardsOpacity, scale: cardsScale }} className=" contain-paint contain-layout will-change-transform transform-gpu pt-12 flex flex-wrap justify-center gap-x-6 gap-y-12">
                            {solutions.map((card,i) => (
                                <SolutionCard card={card}  key={i} props={block} />
                            ))}
                        </motion.div>
                </div>
            </section>

            
        </>
    )
}

export default SolutionsGrid
