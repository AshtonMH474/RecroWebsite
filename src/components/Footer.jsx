import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ContactUsForm from "./ContactUsForm";

function Footer() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm((prev) => !prev);

  return (
    <div className="bg-black w-full relative z-40">
        <div className="border-t border-b border-white/50 mb-16">
        {/* Banner */}
            <div className="flex justify-center">
            <div className="relative bottom-10 inline-flex items-center justify-center bg-primary h-[60px] mx-auto px-6 rounded-[12px]">
                <h3 className="text-white pr-4 text-[20px]">
                Contact Us and Let’s Reinvent Together
                </h3>
                <button
                onClick={toggleForm}
                className="cursor-pointer text-[20px] text-white border border-white/50 px-4 py-2 rounded hover:bg-white/10 transition"
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
                    className="relative bottom-5 flex items-center justify-center gap-30">
                    <Link href={"/portal"}>Portal</Link>
                    <Link href={"/solutions"}>Solutions</Link>
                    <Link href={"/careers"}>Careers</Link>
                    <Link href={"/about"}>About</Link>
                    </motion.div>
        </div>

            {/* Footer Text */}
            <motion.div key={showForm ? "withForm" : "noForm"}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }} className="flex justify-center">
                <h3 className="relative bottom-8">
                Copyright © 2025 Recro Corporation. All rights reserved.
                </h3>
            </motion.div>
        
    </div>
  );
}

export default Footer;


