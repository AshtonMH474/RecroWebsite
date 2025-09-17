import { motion } from "framer-motion"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import { IoMdClose } from "react-icons/io";
import { tinaField } from "tinacms/dist/react";

function LeaderModal({ leader, onClose }) {
  
  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-[1000]"
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm z-[999]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Modal Content */}
      <motion.div
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="
          relative z-[1000] 
          border border-white/15 rounded-[12px] bg-[#1A1A1E] 
          w-[90%] sm:w-[70%] md:w-[50%] 
          max-h-[90vh] 
          p-6 md:p-8 
          overflow-y-auto
          flex flex-col
        "
      >
        {/* Leader Header */}
        <div className="mb-4 text-center">
          <h2 data-tina-field={tinaField(leader,'name')} className="text-2xl md:text-3xl font-bold text-white">{leader.name}</h2>
          <p data-tina-field={tinaField(leader,'title')} className="text-sm md:text-base text-white/70">{leader.title}</p>
        </div>

        {/* Leader Bio */}
        <div data-tina-field={tinaField(leader,'bio')} className="text-white/90 text-sm md:text-base leading-relaxed space-y-4 text-center">
          <TinaMarkdown
            content={leader.bio}
            components={{
              p: ({ children }) => <p className="mb-2">{children}</p>,
            }}
          />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute text-[24px] top-3 right-3 text-white hover:text-primary transition cursor-pointer"
        >
          <IoMdClose />
        </button>
      </motion.div>
    </div>
  );
}


export default LeaderModal 