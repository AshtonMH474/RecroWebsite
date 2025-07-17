import { TinaMarkdown } from "tinacms/dist/rich-text";
import IconRenderer from "../utils/IconRenderer";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { tinaField } from "tinacms/dist/react";

function SolutionCard({ card }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}

      className={`border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[300px] h-[260px] px-4 py-6 cursor-pointer`}
    >
      <div className="flex items-center mb-3 gap-x-3">
        {card.icon && (
          <div data-tina-field={tinaField(card,'icon')} className="bg-primary rounded-[10px] h-16 w-16 flex-shrink-0 flex items-center justify-center">
            <IconRenderer size="50px" color="#FAF3E0" iconName={card.icon} />
          </div>
        )}
        {card.title && (
          <h3 data-tina-field={tinaField(card,'title')} className="text-[20px] font-bold text-white leading-tight flex-1">
            {card.title}
          </h3>
        )}
      </div>

      {card.description && (
        <div data-tina-field={tinaField(card,'description')}>
          <TinaMarkdown
            content={card.description}
            components={{
              p: ({ children }) => (
                <p className="text-[#C2C2BC] noContentDes text-ellipsis text-[16px]">
                  {children}
                </p>
              ),
            }}
          />
        </div>
      )}
    </motion.div>
  );
}

export default SolutionCard;
