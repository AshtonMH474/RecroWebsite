import { useEffect } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";


function StatementForm({ statement,onClose }){
     
const downloadPDF = () => {
  const link = document.createElement("a");
  link.href = `/api/s3/download?fileUrl=${encodeURIComponent(statement.file)}`;
  link.download = "capability-statement.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.overflow = "hidden";
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.overflow = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = {
    firstName: e.target.firstName.value,
    lastName: e.target.lastName.value,
    email: e.target.email.value,
    organization: e.target.organization.value,
    subject: e.target.subject.value,
    message: e.target.message.value,
  };

  const res = await fetch("/api/submit-form", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (res.ok) {
    e.target.reset();
    alert("Submitted successfully!");

    downloadPDF(); // 👈 trigger download
    onClose();     // 👈 close modal after download
  } else {
    alert("Failed to submit.");
  }
};

    function skipDownload(){
        downloadPDF()
        onClose()
    }


  return (
    <div className="fixed inset-0 z-[1000] flex justify-center items-center" onClick={onClose}>
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Modal Content */}
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4 }}
        className="relative z-[1001] w-[90%] max-w-[800px] max-h-[90%] overflow-y-auto bg-[#1A1A1E] rounded-[12px] p-6"
      >
        {/* Header */}
        <div className="flex justify-end  mb-8">
          <button onClick={onClose} aria-label="Close Modal">
            <IoMdClose className="cursor-pointer text-white text-[24px] hover:text-primary transition" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input type="text" name="firstName" placeholder="First Name"
              className="w-full sm:w-1/2 p-2 rounded bg-[#2A2A2E] text-white placeholder-white/70" />
            <input type="text" name="lastName" placeholder="Last Name"
              className="w-full sm:w-1/2 p-2 rounded bg-[#2A2A2E] text-white placeholder-white/70" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <input type="email" name="email" placeholder={"Company Email"}
              className="w-full sm:w-1/2 p-2 rounded bg-[#2A2A2E] text-white placeholder-white/70" />
            <input type="text" name={"organization"} placeholder={"Organization"}
              className="w-full sm:w-1/2 p-2 rounded bg-[#2A2A2E] text-white placeholder-white/70" />
          </div>

          <input type="text" name="subject" placeholder="Subject"
            className="w-full p-2 rounded bg-[#2A2A2E] text-white placeholder-white/70" />

          <textarea name="message" placeholder="Message" rows={4}
            className="w-full p-2 rounded bg-[#2A2A2E] text-white placeholder-white/70 resize-none" />
            
          <button type="submit"
            className="cursor-pointer w-full py-2 rounded bg-primary text-white hover:bg-primary/80 transition">
            Download
          </button>
        </form>
      </motion.div>
    </div>
  );
}


export default StatementForm