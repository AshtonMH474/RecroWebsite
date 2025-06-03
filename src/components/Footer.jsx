import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ContactUsForm from "./ContactUsForm";
import { tinaField } from "tinacms/dist/react";

function Footer({res}) {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm((prev) => !prev);

  return (
    <div className="bg-black w-full relative z-40">
        <div className="border-t border-b border-white/50 mb-16">
            <div className="flex justify-center">
            <div className="relative gap-2 sm:gap-0 flex-col sm:flex-row bottom-10 inline-flex items-center justify-center bg-primary h-[60px] mx-auto sm:pt-0 sm:pb-0 pt-12 pb-12 px-6 rounded-[12px]">
                <h3 data-tina-field={tinaField(res,'footerMessage')} className="text-white pr-4 sm:text[20px] text-[16px]">{res.footerMessage}</h3>

                <button
                onClick={toggleForm}
                className="cursor-pointer sm:text[20px] text-[16px] text-white border border-white/50 px-4 py-2 rounded hover:bg-white/10 transition"
                >
                Contact Us
                </button>
            </div>
            </div>

            {/* Animated Contact Form */}
            <AnimatePresence>
            {showForm && (
                <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                <ContactUsForm />
                </motion.div>
            )}
            </AnimatePresence>
            
                {/* Links */}
                    <motion.div key={showForm ? "withForm" : "noForm"}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
                    className="relative bottom-5 flex flex-col gap-4 sm:flex-row items-center justify-center sm:gap-30">
                        {res.links?.map((link,i) => 
                            link.link ? (
                                <Link data-tina-field={tinaField(res.links[i], 'label')} key={i} href={link.link}>{link.label}</Link>
                            ) : null
                        )}
                    </motion.div>
        </div>

            {/* Footer Text */}
            <motion.div key={showForm ? "withForm" : "noForm"}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }} className="flex justify-center">
                <h3 data-tina-field={tinaField(res,'copyright')} className="relative bottom-8 text-center">
                    {res.copyright}
                </h3>
            </motion.div>
        
    </div>
  );
}

export default Footer;


