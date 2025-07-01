import { tinaField } from "tinacms/dist/react";
import { parseJobDescription,stripHTML } from "../utils/HtmlRemover"
import { IoLocationOutline } from "react-icons/io5";

function JobCard({props,job,onExpand}){
    return(
        <>
            <div onClick={onExpand} className="border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[300px] h-[260px] px-4 py-6" >
                <div className="pb-2">
                        <h3 className="text-[24px] font-bold">{job.title}</h3>
                        <h4 className="text-[#C2C2BC] text-[18px] flex items-center gap-x-1">
                            <IoLocationOutline />
                            {job.location}
                        </h4>
                </div>
                <div>
                        <p className="text-[#C2C2BC] text-[12px] pb-3">
                                {parseJobDescription(stripHTML(job.description))[1].content}
                        </p>
                        {props?.buttonType == 'button' && (<button data-tina-field={tinaField(props,'buttonLabel')} className="bg-primary capitalize cursor-pointer px-4 h-[35px] w-auto rounded-[8px] hover:opacity-80 text-white">{props.buttonLabel}</button>)}
                        {props?.buttonType == 'border' && (<button data-tina-field={tinaField(props,'buttonLabel')} className="px-4 capitalize h-[35px] w-auto border primary-border rounded-[8px] hover:text-white/80 transition-colors duration-300">{props.buttonLabel}</button>)}
                </div>
             </div>
        </>
    )
}


export default JobCard