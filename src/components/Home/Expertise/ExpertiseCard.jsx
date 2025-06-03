// import { tinaField } from "tinacms/dist/react";
// import { TinaMarkdown } from "tinacms/dist/rich-text";
// import { motion } from "framer-motion";
// import { FaArrowRight } from "react-icons/fa6";
// import { IconRenderer } from "@/components/utils/IconRenderer";

//  function ExpertiseCard({ ex, transform }) {
//   return (
//     <motion.div
//       style={transform}
//       className="border border-[rgba(255,255,255,0.15)] rounded-[8px] sm:w-[300px] sm:h-[260px] bg-[#1A1A1E]"
//     >
//       <div className="flex m-3 mt-6 items-center">
//         <div
//           data-tina-field={tinaField(ex, "icon")}
//           className="bg-primary rounded-[10px] h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center"
//         >
//           <IconRenderer iconName={ex.icon} />
//         </div>
//         <h3
//           data-tina-field={tinaField(ex, "title")}
//           className="pl-3 text-[24px] font-bold"
//         >
//           {ex.title}
//         </h3>
//       </div>
//       <div data-tina-field={tinaField(ex, "description")}>
//         <TinaMarkdown
//           content={ex.description}
//           components={{
//             p: ({ children }) => (
//               <p className="ml-3 mr-3 text-[#C2C2BC] text-[16px]">{children}</p>
//             ),
//           }}
//         />
//       </div>
//       <div className="ml-3 mt-3 primary-color flex items-center gap-x-1 text-[14px]">
//         Learn More <FaArrowRight className="primary-color text-[14px]" />
//       </div>
//       </motion.div>
    
//   );
// }

// export default ExpertiseCard
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { FaArrowRight } from "react-icons/fa6";
import { IconRenderer } from "@/components/utils/IconRenderer";
import { motion } from "framer-motion";

function ExpertiseCard({ ex }) {
  return (
    <motion.div
      initial={{ scale: 0.4, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: .8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="border border-[rgba(255,255,255,0.15)] rounded-[8px] bg-[#1A1A1E]  w-[300px] h-[260px] px-4 py-6"
    >
      <div className="flex items-center mb-4">
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
              <p className=" text-[#C2C2BC] text-[16px]">{children}</p>
            ),
          }}
        />
      </div>
      <div className="mt-3 primary-color flex items-center gap-x-1 text-[14px]">
        Learn More <FaArrowRight className="primary-color text-[14px]" />
      </div>
    </motion.div>
  );
}

export default ExpertiseCard;
