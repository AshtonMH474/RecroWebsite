import { motion } from "framer-motion";
import { tinaField } from "tinacms/dist/react";

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
