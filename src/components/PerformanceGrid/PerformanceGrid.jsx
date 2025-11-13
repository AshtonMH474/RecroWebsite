import { tinaField } from "tinacms/dist/react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState, memo } from "react";
import PerformanceCard from "../SolutionPage/Performances/PerformanceCard";
import PdfModal from "../SolutionsGrid/SolutionModal";

function PerformanceGrid({performanceRes,...block}){
    const performances = performanceRes?.performanceConnection?.edges.map((e) => e.node) || [];
    const headingRef = useRef(null);
    const headingInView = useInView(headingRef, { once: true, margin: "-100px" });


    const [expandedCardIndex, setExpandedCardIndex] = useState(null);
    const openCard = (index) => setExpandedCardIndex(index);
    const closeCard = () => setExpandedCardIndex(null);
    return(
        <>
        <div id={block.performance_id} 
        className="relative bg-black overflow-hidden w-full pb-24" >
            <div className="flex flex-col text-center items-center mt-32">
                    <motion.h2
                    ref={headingRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={headingInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    data-tina-field={tinaField(block, "performance_heading")}
                    className="font-bold text-[32px] md:text-[40px] text-white text-center"
                    >
                    {block.performance_heading}
                    </motion.h2>
                    <motion.div
                    style={{width:block.underline_width}}
                    data-tina-field={tinaField(block,'underline_width')}
                    initial={{ scaleX: 0 }}
                    animate={headingInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                    className="rounded-[12px] h-1  bg-primary mx-auto mt-2 origin-left"
                    />
            </div>
            <div className="pt-12 flex flex-wrap justify-center gap-x-6 gap-y-12 max-w-[1500px] mx-auto">
                {performances?.map((performance,i) => (
                    <PerformanceCard performance={performance} key={performance._id || performance.title || i} onExpand={() => openCard(i)}/>
                ))}
            </div>
        </div>
        <AnimatePresence>
            {expandedCardIndex !== null && (
            <PdfModal
            solution={performances[expandedCardIndex]}
            onClose={closeCard}
            />
            )}
        </AnimatePresence>
        </>
    )
}

export default memo(PerformanceGrid)