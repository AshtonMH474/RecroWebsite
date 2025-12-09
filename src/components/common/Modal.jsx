import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

export default function Modal({ isOpen, onClose, children, className = "" }) {
  useLockBodyScroll();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          <motion.div
            className={`relative bg-[#1A1A1E] rounded-[12px] w-full lg:w-auto lg:max-w-[90%] max-h-[80vh] overflow-y-auto shadow-2xl ${className}`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-4 z-10"
              aria-label="Close Modal"
            >
              <IoMdClose className="cursor-pointer text-white text-[22px] hover:text-primary transition" />
            </button>

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
