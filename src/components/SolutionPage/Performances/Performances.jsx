import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { tinaField } from "tinacms/dist/react";
import PerformanceCard from "./PerformanceCard";
import PdfModal from "@/components/SolutionsGrid/SolutionModal";

function SolutionPerformances(props){
    

const [expandedCardIndex, setExpandedCardIndex] = useState(null);
const openCard = (index) => setExpandedCardIndex(index);
const closeCard = () => setExpandedCardIndex(null);


const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-100px" });
    return(
        <>
        <section style={{}} className="pb-16 flex justify-center items-center">
            <div className="overflow-hidden z-30 py-12 max-w-[1000px] mx-auto rounded-md">
                <motion.h2
                ref={headingRef}
                initial={{ opacity: 0, y: 20 }}
                animate={headingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeOut" }}
                data-tina-field={tinaField(props, "performance_heading")}
                className="font-bold text-[32px] md:text-[40px] text-white text-center"
                >
                {props.performance_heading}
                </motion.h2>
                <motion.div
                style={{width:props.underline_width}}
                data-tina-field={tinaField(props,'underline_width')}
                initial={{ scaleX: 0 }}
                animate={headingInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="rounded-[12px] h-1  bg-primary mx-auto mt-2 origin-left"
                />

                <div className="pt-12 flex flex-wrap justify-center gap-x-6 gap-y-12">
                    {props?.performances?.map((performance,i) => (
                        <PerformanceCard performance={performance.performance} onExpand={() => openCard(i)} key={i}/>
                    ))}
                </div>
            </div>
        </section>

        <AnimatePresence>
              {expandedCardIndex !== null && (
              <PdfModal
                solution={props.performances[expandedCardIndex].performance}
                onClose={closeCard}
              />
            )}
            </AnimatePresence>
        </>
    )
}

export default SolutionPerformances