import { useEffect, useState } from "react";
import Pagination from "../Leadership/Pagination";
import JobCard from "./JobCard";
import { tinaField } from "tinacms/dist/react";
import JobsModal from "./JobsModal";
import { motion, AnimatePresence } from "framer-motion";
import { animationVariants } from "../Leadership/LeaderAnimations";
import DivGears from "../DivGears";


function Jobs(props){
    const [jobs,setJobs] = useState([])
    useEffect(()=> {
        const handleJobs = async()=> {
            const res = await fetch('/api/jobs')
            const allJobs = await res.json()
            const priortyJobs = allJobs.filter((job)=> job.priorityLevel == 'Critical' || job.priorityLevel == 'High' )
            await setJobs(priortyJobs)
        }
        handleJobs()
    },[])

    // let jobs = props.jobs || []
    const [startIndex, setStartIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const visibleCount = 6;
    const totalPages = Math.ceil(jobs.length / visibleCount);
    const [gearRotation, setGearRotation] = useState(0);


    const goToPage = (pageIndex) => {
        const newStartIndex = pageIndex * visibleCount;
        const goingForward = pageIndex > startIndex / visibleCount;
        const rotationAmount = goingForward ? 90 : -90;

        setDirection(goingForward ? 1 : -1);
        setStartIndex(newStartIndex);
        setGearRotation((prev) => prev + rotationAmount);
    };

    const visibleCards = jobs.slice(startIndex, startIndex + visibleCount);



    const [expandedCardIndex, setExpandedCardIndex] = useState(null); 
    const openCard = (index) => setExpandedCardIndex(index);
    const closeCard = () => setExpandedCardIndex(null);
    
    return(
        <>
            <div id={props.jobs_id} style={{minHeight:'auto'}} 
            className="relative bg-black overflow-hidden w-full pb-24" >
                
                <div className="flex flex-col items-center mt-32 pb-12">
                    {props.jobsHeading && (<h2  data-tina-field={tinaField(props,'jobsHeading')} className="font-bold text-[32px] md:text-[40px] text-white text-center px-4">{props.jobsHeading}</h2>)}
                    <div data-tina-field={tinaField(props,'underline_width')} style={{width:props.underline_width}}  className="rounded-[12px] h-1  bg-primary mt-2"></div>
                </div>
                <div className="w-full relative">
                    <DivGears gearRotation={gearRotation}/>
                   <div  className="relative w-full max-w-[1000px] mx-auto overflow-hidden min-h-[600px]">
                    <AnimatePresence custom={direction} mode="wait">
                        <motion.div
                        key={startIndex} // Triggers re-render on pagination
                        custom={direction}
                        variants={animationVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="relative  w-full flex flex-wrap items-center justify-center gap-x-6 gap-y-12"
                        
                        >
                        {visibleCards.map((job, i) => {
                            const actualIndex = startIndex + i;
                            return (
                            <JobCard
                                key={actualIndex}
                                job={job}
                                props={props}
                                onClose={closeCard}
                                onExpand={() => openCard(actualIndex)}
                                isExpanded={expandedCardIndex === actualIndex}
                            />
                            );
                        })}
                        </motion.div>
                    </AnimatePresence>
                </div>
                </div>
                <div className="pb-6">
                    {totalPages > 1 && (
                        <Pagination totalPages={totalPages}
                        currentPage={startIndex / visibleCount}
                        goToPage={goToPage}/>
                    )}
                </div>
                
                <div className="flex flex-col items-center justify-center  px-8">
                    <a className="flex justify-center " target="_blank" href="https://ats.recro.com/jobboard">
                        {props?.buttonTypeAll === "button" && (
                        <button
                            
                            data-tina-field={tinaField(props, "buttonLabelAll")}
                            className="bg-primary py-2  capitalize cursor-pointer px-4 text-[18px]  w-auto rounded-[8px] hover:opacity-80 text-white"
                        >
                            {props.buttonLabelAll}
                        </button>
                        )}
                        {props?.buttonTypeAll === "border" && (
                        <button
                            
                            data-tina-field={tinaField(props, "buttonLabelAll")}
                            className="px-4  capitalize text-[18px] py-2 w-auto border primary-border rounded-[8px] hover:text-white/80 transition-colors duration-300"
                        >
                            {props.buttonLabelAll}
                        </button>
                        )}
                    </a>
                </div>
                
            </div>

            {expandedCardIndex !== null && (
                <JobsModal
                job={jobs[expandedCardIndex]}
                onClose={closeCard}/>
            )}
        </>
    )
}


export default Jobs