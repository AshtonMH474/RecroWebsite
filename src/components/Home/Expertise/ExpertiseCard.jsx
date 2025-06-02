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
          className="bg-primary rounded-[10px] h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center"
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

// import { tinaField } from "tinacms/dist/react";
// import { TinaMarkdown } from "tinacms/dist/rich-text";
// import { motion } from "framer-motion";
// import { FaArrowRight } from "react-icons/fa6";
// import { IconRenderer } from "@/components/utils/IconRenderer";

// function ExpertiseCard({ ex, transform }) {
//   return (
//     <motion.div
//       style={transform}
//       className="border border-[rgba(255,255,255,0.15)] rounded-[8px] w-full sm:w-[300px] h-auto sm:h-[260px] bg-[#1A1A1E] p-4 sm:p-0"
//     >
//       <div className="flex items-center sm:m-3 sm:mt-6">
//         <div
//           data-tina-field={tinaField(ex, "icon")}
//           className="bg-primary rounded-[10px] h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center"
//         >
//           <IconRenderer iconName={ex.icon} />
//         </div>
//         <h3
//           data-tina-field={tinaField(ex, "title")}
//           className="pl-3 text-[20px] sm:text-[24px] font-bold"
//         >
//           {ex.title}
//         </h3>
//       </div>

//       <div data-tina-field={tinaField(ex, "description")} className="mt-2">
//         <TinaMarkdown
//           content={ex.description}
//           components={{
//             p: ({ children }) => (
//               <p className="text-[#C2C2BC] text-[14px] sm:text-[16px] px-3 sm:px-0">
//                 {children}
//               </p>
//             ),
//           }}
//         />
//       </div>

//       <div className="ml-3 mt-3 primary-color flex items-center gap-x-1 text-[13px] sm:text-[14px]">
//         Learn More <FaArrowRight className="primary-color text-[13px] sm:text-[14px]" />
//       </div>
//     </motion.div>
//   );
// }

// export default ExpertiseCard;

// import { tinaField } from "tinacms/dist/react";
// import { TinaMarkdown } from "tinacms/dist/rich-text";
// import { motion } from "framer-motion";
// import { FaArrowRight } from "react-icons/fa6";
// import { IconRenderer } from "@/components/utils/IconRenderer";

// function ExpertiseCard({ ex, transform }) {
//   return (
//     // border border-[rgba(255,255,255,0.15)] rounded-[8px] w-full sm:w-[300px] h-auto sm:h-[260px] bg-[#1A1A1E] p-4 sm:p-0
//     <motion.div
//       style={transform}
//       className="border border-[rgba(255,255,255,0.15)] rounded-[8px] bg-[#1A1A1E] w-full sm:w-[300px] sm:h-[260px] h-auto px-4 py-6"
//     >
//       <div className="flex items-center mb-4">
//         <div
//           data-tina-field={tinaField(ex, "icon")}
//           className="bg-primary rounded-[10px] h-16 w-16 flex items-center justify-center"
//         >
//           <IconRenderer iconName={ex.icon} />
//         </div>
//         <h3
//           data-tina-field={tinaField(ex, "title")}
//           className="pl-3 text-[20px] md:text-[24px] font-bold"
//         >
//           {ex.title}
//         </h3>
//       </div>
//       <div data-tina-field={tinaField(ex, "description")}>
//         <TinaMarkdown
//           content={ex.description}
//           components={{
//             p: ({ children }) => (
//               <p className="text-[#C2C2BC] text-[16px] mb-2">{children}</p>
//             ),
//           }}
//         />
//       </div>
//       <div className="mt-3 primary-color flex items-center gap-x-1 text-[14px]">
//         Learn More <FaArrowRight className="primary-color text-[14px]" />
//       </div>
//     </motion.div>
//   );
// }

// export default ExpertiseCard;
