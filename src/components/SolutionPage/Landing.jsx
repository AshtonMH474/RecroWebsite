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
  initial={{ y: 0 }}
  animate={{ y: [0, 10, 0] }} // bounce up and down
  transition={{
    duration: 1.2,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="mt-8"
>
  <ChevronDown
    onClick={() => {
      if (solution?.blocks && solution?.blocks?.length > 0) {
        window.scrollBy({
          top: window.innerHeight, // scroll down one viewport height
          behavior: "smooth",
        });
      }
    }}
    className={`w-15 h-15 font-bold cursor-pointer`}
    style={{ color: "#B55914" }} // keep your primary color
  />
</motion.div>
         )}
    </div>
 
  );
}

export default SolutionLanding;
