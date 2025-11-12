import { downloadPdf } from "@/components/utils/downlaod";
import IconRenderer from "@/components/utils/IconRenderer";
import { useAuth } from "@/context/auth";
import { motion,useInView } from "framer-motion";
import { useRef } from "react";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

function PerformanceCard({performance}){
    const performanceData =performance
    const {openModal,user} = useAuth() 
    

    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return(
       <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[300px] h-[260px] px-4 py-6 cursor-pointer`}
      onClick={() => {
        if(!user) openModal("register")
        else downloadPdf(performance,false,user,'performance')
        }}
    >
        <div className="flex items-center mb-3 gap-x-3">
                {performanceData?.icon && (
                  <div data-tina-field={tinaField(performanceData,'icon')} className="bg-primary rounded-[10px] h-16 w-16 flex-shrink-0 flex items-center justify-center">
                    <IconRenderer size="50px" color="#FAF3E0" iconName={performanceData?.icon} />
                  </div>
                )}
                {performanceData?.title && (
                  <h3 data-tina-field={tinaField(performanceData,'title')} className="text-[20px] font-bold text-white leading-tight flex-1">
                    {performanceData?.title}
                  </h3>
                )}
        </div>
        {performanceData?.description && (
                <div data-tina-field={tinaField(performanceData,'description')}>
                  <TinaMarkdown
                    content={performanceData?.description}
                    components={{
                      p: ({ children }) => (
                        <p className="text-[#C2C2BC] expertiseDes text-ellipsis text-[16px]">
                          {children}
                        </p>
                      ),
                    }}
                  />
                </div>
        )}
        <div className="mt-3 primary-color flex items-center gap-x-1 text-[14px]">
                Click to Download
        </div>
    </motion.div>
    )
}

export default PerformanceCard