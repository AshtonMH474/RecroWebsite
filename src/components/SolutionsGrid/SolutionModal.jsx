// components/PdfModal.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function PdfModal({ solution, onClose }) {
  const pdfUrl = solution.mainPdf;

  useEffect(() => {
    const scrollY = window.scrollY;

    // Lock scroll and preserve current position
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";
    document.body.style.width = "100%";

    return () => {
      // Restore scroll position
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY); // restore to the same spot
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white w-[70%] h-[70%] rounded-lg shadow-xl relative flex flex-col"
          onClick={(e) => e.stopPropagation()} // stop closing when clicking inside
        >
         

          {/* PDF iframe */}
          <iframe
            src={pdfUrl}
            className="w-full bg-black flex-1 rounded-b-lg"
            title="Solution PDF"
          />

            
        
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

