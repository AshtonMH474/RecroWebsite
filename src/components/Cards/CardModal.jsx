import { useEffect } from "react";
import { motion } from "framer-motion";
import IconRenderer from "@/components/utils/IconRenderer";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { IoMdClose } from "react-icons/io";

function CardModal({ ex, onClose }) {
  console.log('i')
  useEffect(() => {
    const scrollY = window.scrollY;

    // Lock scroll and preserve current position
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.width = '100%';

    return () => {
      // Restore scroll position
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY); // restore to the same spot
    };
  }, []);


  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-[1000]"
      onClick={onClose}
    >
      {/* Faded Background */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm z-[999]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Spinning Modal Content */}
      <motion.div
        onClick={(e) => e.stopPropagation()} // Prevent backdrop click from closing
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="modal-mobile-landscape relative z-[1000] border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[80%] h-[80%] sm:w-[60%] sm:h-[70%] md:h-[50%] p-4 overflow-hidden"
      >
        {/* Header with Close */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div
              data-tina-field={tinaField(ex, "icon")}
              className="bg-primary rounded-[10px] h-16 w-16 min-w-16 flex items-center justify-center"
            >
              <IconRenderer size={"50px"} color={"#FAF3E0"} iconName={ex.icon} />
            </div>
            <h3
              data-tina-field={tinaField(ex, "title")}
              className="pl-3 text-[24px] font-bold"
            >
              {ex.title}
            </h3>
          </div>
          <button onClick={onClose} aria-label="Close Modal">
            <IoMdClose className="cursor-pointer text-[24px] text-white hover:text-primary transition" />
          </button>
        </div>

        {/* Description */}
        <div data-tina-field={tinaField(ex, "description")}>
          <TinaMarkdown
            content={ex.description}
            components={{
              p: ({ children }) => (
                <p className="text-[#C2C2BC] text-[16px]">{children}</p>
              ),
            }}
          />
        </div>

        {/* Content Scrollable */}
        <div
          data-tina-field={tinaField(ex, "content")}
          className="overflow-y-auto mt-4 pr-2"
          style={{ maxHeight: "calc(100% - 120px)" }}
        >
          <TinaMarkdown
            content={ex.content}
            components={{
              p: ({ children }) => (
                <p className="text-[#C2C2BC] text-[16px] mb-2">{children}</p>
              ),
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default CardModal;
