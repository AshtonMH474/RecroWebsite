import { useState } from "react";
import {parseJobDescription, stripHTML} from "../utils/HtmlRemover"
import Pagination from "../Leadership/Pagination";
import JobCard from "./JobCard";
import { tinaField } from "tinacms/dist/react";
import JobsModal from "./JobsModal";


function Jobs(props){
    let jobs = props.jobs
    const [startIndex, setStartIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const visibleCount = 6;
    const totalPages = Math.ceil(jobs.length / visibleCount);

    const goToPage = (pageIndex) => {
    const newStartIndex = pageIndex * visibleCount;
    setDirection(pageIndex > startIndex / visibleCount ? 1 : -1);
    setStartIndex(newStartIndex);
    };

    const visibleCards = jobs.slice(startIndex, startIndex + visibleCount);



    const [expandedCardIndex, setExpandedCardIndex] = useState(null); 
    const openCard = (index) => setExpandedCardIndex(index);
    const closeCard = () => setExpandedCardIndex(null);
    // let jobDes = stripHTML(jobs[0].description)
    // console.log(jobDes)
    // console.log(parseJobDescription(jobDes))
    return(
        <>
            <div style={{minHeight:'100dvh'}}
            className="bg-black overflow-hidden w-full pb-24">
                <div className="flex flex-col items-center mt-32 pb-12">
                    {props.jobsHeading && (<h2 data-tina-field={tinaField(props,'jobsHeading')} className="font-bold text-[36px] text-white">{props.jobsHeading}</h2>)}
                    <div className="rounded-[12px] h-1 w-80 bg-primary mt-2"></div>
                </div>
                <div className="flex flex-wrap items-center justify-center mx-auto gap-x-6 gap-y-12 max-w-[1000px]">
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
                </div>
                <Pagination totalPages={totalPages}
                currentPage={startIndex / visibleCount}
                goToPage={goToPage}/>
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