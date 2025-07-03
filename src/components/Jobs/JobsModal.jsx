import { motion } from "framer-motion"
import { useEffect } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import {  stripInlineStylesBrowser } from "../utils/HtmlRemover";
import { RiShareBoxLine } from "react-icons/ri";


function JobsModal({onClose,job}){
    
    useEffect(() => {
        const scrollY = window.scrollY;
    
        // Lock scroll and preserve current position
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.overflow = 'hidden';
        document.body.style.width = '100%';
    
        return () => {
          // Restore scroll position
          document.body.style.position = '';
          document.body.style.top = '';
          document.body.style.left = '';
          document.body.style.right = '';
          document.body.style.overflow = '';
          document.body.style.width = '';
          window.scrollTo(0, scrollY); // restore to the same spot
        };
      }, []);
         
      let jobApplyUrlId = job.listingUrl.split('/')[4]
      let jobDesHtml = stripInlineStylesBrowser(job.description)

      
    return(
        <div onClick={onClose} className="fixed inset-0 flex justify-center items-center z-[1000]">
            <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }} 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm z-[999]">
            </motion.div>

            <motion.div onClick={(e) => e.stopPropagation()} // Prevent backdrop click from closing
            initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 180 }}
            transition={{ duration: 0.6, ease: "easeOut" }} 
            className="modal-mobile-landscape relative z-[1000] border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[80%] h-[80%] sm:w-[60%] sm:h-[70%] md:h-[70%] p-4 overflow-hidden flex ">
                <div className="pb-2 px-4">
                    <div className="flex items-start justify-between">
                        <h3 className="text-[24px] font-bold">{job.title}</h3>
                        <button onClick={onClose} aria-label="Close Modal">
                            <IoMdClose className="relative left-4 cursor-pointer text-[24px] text-white hover:text-primary transition" />
                        </button>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-x-4 pb-2 h-auto ">
                        <h4 className="text-[#C2C2BC] text-[18px]">
                            Clearance: {job.clearanceRequired}
                        </h4>
                        <h4 className="text-[#C2C2BC] text-[18px] flex items-center gap-x-1 ">
                            <IoLocationOutline className="text-[#14B5B5]" />
                            {job.location}
                        </h4>
                    </div>
                    <div className="flex items-center gap-x-2 pb-3">
                        <a href={`https://ats.recro.com/jobapplication/${jobApplyUrlId}`} target="_blank">
                        <button className="bg-primary flex justify-center gap-x-1 items-center capitalize cursor-pointer px-4 h-[35px] w-auto rounded-[8px] hover:opacity-80 text-white">Apply <RiShareBoxLine className="text-[18px]"/></button>
                        </a>
                    </div>
                    <div style={{ maxHeight: "calc(100% - 120px)" }} className=" list-disc list-inside overflow-y-auto pt-4 flex flex-col gap-y-2 text-[#C2C2BC] text-[14px] ">
                        <div className="content" dangerouslySetInnerHTML={{__html:jobDesHtml}}/>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}


export default JobsModal