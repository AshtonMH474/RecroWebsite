import { motion } from "framer-motion";
import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField } from "tinacms/dist/react";

export default function AgencyModal({ partner, onClose }) {
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex justify-center items-center z-[1000]"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm z-[999]"
      />
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="modal-mobile-landscape relative z-[1000] border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[85%] h-[80%] sm:w-[60%] sm:h-[70%] md:h-[70%] p-4 overflow-hidden"
      >
        <div className="flex flex-col space-y-4 h-full overflow-y-auto pr-2">
          {/* Header: Logo, Title, Close */}
          <div className="flex flex-row justify-between items-start w-full">
            <div className="flex items-center">
              <div
                data-tina-field={tinaField(partner, "agency")}
                className="flex items-center justify-center"
              >
                <img
                  src={partner.agency}
                  className="w-auto h-[150px] object-contain"
                  alt="partner"
                />
              </div>
              <h3
                data-tina-field={tinaField(partner, "title")}
                className="pl-3 text-[24px] font-bold"
              >
                {partner.title}
              </h3>
            </div>

            <button onClick={onClose} aria-label="Close Modal">
              <IoMdClose className="cursor-pointer text-[24px] text-white hover:text-primary transition" />
            </button>
          </div>

          {/* Description */}
          <div
            data-tina-field={tinaField(partner, "description")}
            className="text-[#C2C2BC] text-[16px] px-8"
          >
            <TinaMarkdown
              content={partner.description}
              components={{
                p: ({ children }) => <p className="mb-2">{children}</p>,
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
