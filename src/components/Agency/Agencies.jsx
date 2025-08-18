import { tinaField } from "tinacms/dist/react";
import AgencyCard from "./AgencyCard";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import AgencyModal from "./AgencyModal";
import SubPartners from "./SubPartners";

export default function Agencies(props) {
  
  const agencies = props.partners || [];
  const subs = props.subPartners || []

  const [expandedCardIndex, setExpandedCardIndex] = useState(null); 
  const openCard = (index) => setExpandedCardIndex(index);
  const closeCard = () => setExpandedCardIndex(null);

  return (
    <>
    <section id={props.agencies_id} className="relative overflow-hidden bg-black w-full pb-24"  style={{minHeight:'100dvh'}}>
      <motion.div
        className="flex flex-col items-center mt-32"
        data-tina-field={tinaField(props, "agencies_heading")}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
          <h2 className="text-white font-bold text-[32px] md:text-[40px]">
            {props.agencies_heading}
          </h2>
          <motion.div
            className="bg-primary h-1  md:w-80 mx-auto mt-3 rounded-xl"
            style={{width:props.underline_width}}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          />
      </motion.div>

      <div className="pt-12 max-w-[1000px] mx-auto flex justify-center flex-wrap gap-x-6 gap-y-12">
        {agencies.map((partner, i) => {

          return (
          <AgencyCard  
          isExpanded={expandedCardIndex === i}
          onExpand={() => openCard(i)}
          onClose={closeCard} 
          partner={partner} key={i} />
          )
          })}
      </div>
      <div>
        <SubPartners subs={subs}/>
      </div>
    </section>
    <AnimatePresence>
        {expandedCardIndex !== null  && (
          <AgencyModal
            partner={agencies[expandedCardIndex]}
            onClose={closeCard}
          />
        )}
      </AnimatePresence>
    </>
  );
}




