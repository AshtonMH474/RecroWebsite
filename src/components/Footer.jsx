import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ContactUsForm from "./ContactUsForm";
import { tinaField } from "tinacms/dist/react";

function Footer({ res }) {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => setShowForm((prev) => !prev);

  return (
    <footer className="bg-black overflow-hidden w-full z-40 mt-16">
      <div className="border-t border-b border-white/50 py-8 px-4">
        {/* Top section with message and buttons */}
        <div className="flex justify-center">
          <div className="flex flex-col sm:flex-row items-center bg-primary py-4 px-6 rounded-[12px]">
            <h3
              data-tina-field={tinaField(res, "footerMessage")}
              className="text-white text-center text-[16px] mb-2 sm:mb-0 sm:pr-4"
            >
              {res.footerMessage}
            </h3>

            <div className="flex gap-4">
              {res.buttons?.map((button, i) => {
                const baseStyles = "capitalize px-4 py-2 rounded transition-colors duration-300";
                const sharedProps = {
                  key: i,
                  onClick: toggleForm,
                  "data-tina-field": tinaField(res.buttons[i], "label"),
                };

                if (button.style === "border") {
                  return (
                    <button
                      {...sharedProps}
                      className={`${baseStyles} border border-white text-white hover:text-white/80`}
                    >
                      {button.label}
                    </button>
                  );
                }

                if (button.style === "button") {
                  return (
                    <button
                      {...sharedProps}
                      className={`${baseStyles} bg-[#3F3F38] text-white hover:opacity-80`}
                    >
                      {button.label}
                    </button>
                  );
                }

                return null;
              })}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="mt-6"
            >
              <ContactUsForm />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Links */}
        <motion.div
          key={showForm ? "withForm" : "noForm"}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
          className="flex justify-center gap-6 flex-wrap mt-6"
        >
          {res.links?.map((link, i) =>
            link.link ? (
              <Link key={i} href={link.link} data-tina-field={tinaField(res.links[i], "label")}>
                <span className="text-white hover:underline">{link.label}</span>
              </Link>
            ) : null
          )}
        </motion.div>
      </div>

      {/* Footer copyright */}
      <motion.div
        key={showForm ? "withForm" : "noForm"}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
        className="text-center text-white py-4"
      >
        <h3 data-tina-field={tinaField(res, "copyright")}>{res.copyright}</h3>
      </motion.div>
    </footer>
  );
}

export default Footer;



