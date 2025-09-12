import { tinaField } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react"; // nice arrow icon
import { useEffect, useState } from "react";

function SolutionLanding({ solution }) {
    
      const [inlineWidth, setInlineWidth] = useState(undefined);
    
      useEffect(() => {
        if (window.innerWidth >= 1024) {
          setInlineWidth(`${solution.width}%`);
        } else{
            setInlineWidth(undefined)
        }
      }, [solution.width]);
  return (
    <div
      style={{ minHeight: "100%" }}
      className="landing flex flex-col items-center justify-center w-full"
    >
      <div className="w-90 md:w-150 lg:w-auto px-4" style={{width:inlineWidth}}>
        <h1
          data-tina-field={tinaField(solution, "title")}
          className="text-[32px] md:text-[40px] lg:text-[60px] font-bold text-center mb-4"
        >
          {solution.title}
        </h1>
        <div data-tina-field={tinaField(solution, "description")}>
          <TinaMarkdown
            content={solution.description}
            components={{
              p: ({ children }) => (
                <p className="text-[16px] text-center secondary-text mb-6">
                  {children}
                </p>
              ),
            }}
          />
        </div>
      </div>

      {/* 👇 Scroll Down Arrow */}
      {solution.arrow && (
      <motion.div 
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mt-8"
      >
        <ChevronDown className="w-15 h-15 primary-color font-bold" />
      </motion.div>
         )}
    </div>
 
  );
}

export default SolutionLanding;
