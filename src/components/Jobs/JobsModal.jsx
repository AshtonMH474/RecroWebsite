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
           initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="modal-mobile-landscape relative z-[1000] border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[85%] h-[80%] sm:w-[60%] sm:h-[70%] md:h-[70%] p-4 overflow-hidden flex ">
                <div className="flex flex-col h-full overflow-hidden">
  {/* Header and info */}
  <div className="flex-shrink-0 pb-3">
    <div className="flex items-start justify-between">
      <h3 className="text-[24px] font-bold">{job.title}</h3>
      <button onClick={onClose} aria-label="Close Modal">
        <IoMdClose className="relative  cursor-pointer text-[24px] text-white hover:text-primary transition" />
      </button>
    </div>

    <div className="flex flex-col lg:flex-row gap-x-4 pb-2">
      <h4 className="text-[#C2C2BC] text-[18px]">Clearance: {job.clearanceRequired}</h4>
      <h4 className="text-[#C2C2BC] text-[18px] flex items-center gap-x-1">
        <IoLocationOutline className="text-[#14B5B5]" />
        {job.location}
      </h4>
      {job.salaryRangeMax > 0 && job.salaryRangeMin > 0 && (
        <h4 className="text-[#C2C2BC] text-[18px]">
          <span className="text-[#27AE60]">$</span>
          {job.salaryRangeMin} - <span className="text-[#27AE60]">$</span>
          {job.salaryRangeMax}
        </h4>
      )}
    </div>

    <div className="flex items-center gap-x-2">
      <a href={`https://ats.recro.com/jobapplication/${jobApplyUrlId}`} target="_blank">
        <button className="bg-primary flex justify-center gap-x-1 items-center capitalize cursor-pointer px-4 h-[35px] rounded-[8px] hover:opacity-80 text-white">
          Apply <RiShareBoxLine className="text-[18px]" />
        </button>
      </a>
    </div>
  </div>

  {/* Scrollable job description */}
  <div className="flex-1 overflow-y-auto mt-4 pr-2 text-[#C2C2BC] text-[14px]">
    <div className="content" dangerouslySetInnerHTML={{ __html: jobDesHtml }} />
  </div>
</div>

            </motion.div>
        </div>
    )
}


export default JobsModal