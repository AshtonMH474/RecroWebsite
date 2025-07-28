import { motion } from "framer-motion";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

// export default function AgencyCard({ partner }) {
//   return (
//     <motion.div
//       className="border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[300px] h-[260px] px-4 py-6"
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.3 }}
//       transition={{ duration: 0.5, ease: "easeOut" }}
//     >
//      <div className="flex items-center mb-3 gap-x-3">
//         {partner.agency && (
//             <div
//             data-tina-field={tinaField(partner, "agency")}
//             className="bg-primary rounded-[10px] h-16 w-16 flex-shrink-0 flex items-center justify-center"
//              >
//                 <img
//                 src={partner.agency}
//                 alt="agency"
//                 className="w-auto h-[50px] object-contain"
//                 />
//             </div>
//         )}
//         {partner.title && (
//             <h3
//             data-tina-field={tinaField(partner, "title")}
//             className="text-[20px] font-bold text-white leading-tight flex-1"
//             >
//                 {partner.title}
//             </h3>
//         )}
//     </div>
//     {partner.description && ( <div data-tina-field={tinaField(partner, "description")}>
//               <TinaMarkdown
//                 content={partner.description}
//                 components={{
//                   p: ({ children }) => (
//                     <p className={`text-[#C2C2BC] noContentDes text-ellipsis text-[16px]`}>
//                       {children}
//                     </p>
//                   ),
//                 }}
//               />
//     </div>)}
//       {/* <img
//         src={partner.agency}
//         alt="agency"
//         className="max-h-full max-w-full object-contain"
//       /> */}
//     </motion.div>
//   );
// }


export default function AgencyCard({partner,onExpand}){
  return(
    <motion.div
      className="border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[300px] h-[260px] px-4 py-6 cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onClick={onExpand}
    >
      <div data-tina-field={tinaField(partner, "agency")} className="flex flex-col items-center justify-center w-full h-full">
        <img
          src={partner.agency}
          alt="agency"
          className="w-auto h-[150px] object-contain pb-4"
        />
        {partner.title && (<h1 className="text-[20px] font-bold text-white leading-tight ">{partner.title}</h1>)}
      </div>
    </motion.div>
  )
}