import { tinaField } from "tinacms/dist/react"
import DivGears from "../DivGears"
import { useState } from "react";
import { AnimatePresence,motion } from "framer-motion";
import { animationVariants } from "../Leadership/LeaderAnimations";
import TestimonialCard from "./TestimonialCard";
import Pagination from "../Leadership/Pagination";

function Testimonials(props){
    console.log(props)
    const tests = props.testimonials || []
    const [gearRotation, setGearRotation] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const visibleCount = 6;
    const totalPages = Math.ceil(tests.length / visibleCount);

    const goToPage = (pageIndex) => {
        const newStartIndex = pageIndex * visibleCount;
        const goingForward = pageIndex > startIndex / visibleCount;
        const rotationAmount = goingForward ? 90 : -90;

        setDirection(goingForward ? 1 : -1);
        setStartIndex(newStartIndex);
        setGearRotation((prev) => prev + rotationAmount);
    };

    const visableTests = tests.slice(startIndex, startIndex + visibleCount);
    return (
        <>
           <div style={{minHeight:'100dvh'}}
           className="relative bg-black overflow-hidden w-full pb-24"
           >
                <div className="flex flex-col items-center mt-32 pb-12">
                    {props.testimonialsHeading && (<h2 data-tina-field={tinaField(props,'testimonialsHeading')} className="font-bold text-[36px] text-white">{props.testimonialsHeading}</h2>)}
                    <div  className="rounded-[12px] h-1 w-80 bg-primary mt-2"></div>
                </div>
                <div className="w-full relative">
                    <DivGears gearRotation={gearRotation}/>
                     <div className="relative w-full max-w-[1000px] mx-auto overflow-hidden min-h-[550px]">
                        <AnimatePresence custom={direction} mode="wait">
                            <motion.div
                            key={startIndex} // Triggers re-render on pagination
                            custom={direction}
                            variants={animationVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="relative  w-full flex flex-wrap items-center justify-center gap-x-6 gap-y-12">
                                {visableTests.map((test,i) => {
                                    const actualIndex = startIndex + i
                                    return (<TestimonialCard key={actualIndex} test={test}/>)
                                })}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
                <Pagination totalPages={totalPages}
                currentPage={startIndex / visibleCount}
                goToPage={goToPage}/>
           </div>
        </>
    )
}

export default Testimonials