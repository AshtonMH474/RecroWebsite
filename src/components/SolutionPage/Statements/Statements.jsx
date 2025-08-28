import DivGears from "@/components/DivGears"
import { useState } from "react";
import { tinaField } from "tinacms/dist/react"
import StatementCard from "./StatementCard";
import Pagination from "@/components/Leadership/Pagination";
import { AnimatePresence,motion } from "framer-motion";
import { animationVariants } from "@/components/Leadership/LeaderAnimations";
import StatementForm from "./StatementForm";


function Statements(props){
    const statements = props.statements || []
    const visibleCount = 6;
    const totalPages = Math.ceil(statements.length / visibleCount);
    const [startIndex, setStartIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [gearRotation, setGearRotation] = useState(0);


    const goToPage = (pageIndex) => {
        const newStartIndex = pageIndex * visibleCount;
        const goingForward = pageIndex > startIndex / visibleCount;
        const rotationAmount = goingForward ? 90 : -90;

        setDirection(goingForward ? 1 : -1);
        setStartIndex(newStartIndex);
        setGearRotation((prev) => prev + rotationAmount);
    };

    const visbaleStatments = statements.slice(startIndex, startIndex + visibleCount);

    const [expandedStatementIndex, setExpandedStatementIndex] = useState(null); 
    const openStatement = (index) => setExpandedStatementIndex(index);
    const closeStatement = () => setExpandedStatementIndex(null);

    return (
        <>
            <div style={{minHeight:'100%'}}
            className="relative bg-black overflow-hidden w-full pb-24">
                <div className="flex flex-col items-center mt-32 pb-12">
                    {props.statement_heading && (<h2 data-tina-field={tinaField(props,'statement_heading')} className="font-bold text-[32px] md:text-[40px] text-white">{props.statement_heading}</h2>)}
                    <div data-tina-field={tinaField(props,'underline_width')} style={{width:props.underline_width}}  className="rounded-[12px] h-1  bg-primary mt-2"></div>
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
                                {visbaleStatments.map((statement,i) => {
                                    const actualIndex = startIndex + i
                                    return (<StatementCard key={actualIndex} statement={statement} onExpand={() => openStatement(actualIndex)}/>)
                                })}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
                <Pagination totalPages={totalPages}
                currentPage={startIndex / visibleCount}
                goToPage={goToPage}/>
            </div>
            {expandedStatementIndex !== null && (
                <StatementForm statement={statements[expandedStatementIndex]} onClose={closeStatement}/>
            )}
        </>
    )
}

export default Statements