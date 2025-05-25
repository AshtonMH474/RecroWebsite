import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import { IconRenderer } from "@/components/utils/IconRenderer";

 function ExpertiseCard({ ex, transform }) {
  return (
    <motion.div
      style={transform}
      className="border border-[rgba(255,255,255,0.15)] rounded-[8px] w-[300px] h-[260px] bg-[#1A1A1E]"
    >
      <div className="flex m-3 mt-6 items-center">
        <div
          data-tina-field={tinaField(ex, "icon")}
          className="bg-primary rounded-[10px] h-16 w-16 flex items-center justify-center"
        >
          <IconRenderer iconName={ex.icon} />
        </div>
        <h3
          data-tina-field={tinaField(ex, "title")}
          className="pl-3 text-[24px] font-bold"
        >
          {ex.title}
        </h3>
      </div>
      <div data-tina-field={tinaField(ex, "description")}>
        <TinaMarkdown
          content={ex.description}
          components={{
            p: ({ children }) => (
              <p className="ml-3 mr-3 text-[#C2C2BC] text-[16px]">{children}</p>
            ),
          }}
        />
      </div>
      <div className="ml-3 mt-3 primary-color flex items-center gap-x-1 text-[14px]">
        Learn More <FaArrowRight className="primary-color text-[14px]" />
      </div>
    </motion.div>
  );
}

export default ExpertiseCard
