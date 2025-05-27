function ContactUsForm() {
  return (
    <div className="flex justify-center items-center w-screen px-4 pb-16">
      <div className="w-full max-w-[800px] bg-[#1A1A1E] rounded-[12px] p-6">
        <form className="space-y-4">

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full sm:w-1/2 p-2 rounded bg-[#2A2A2E] text-white placeholder-white/70"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full sm:w-1/2 p-2 rounded bg-[#2A2A2E] text-white placeholder-white/70"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Company Email"
              className="w-full sm:w-1/2 p-2 rounded bg-[#2A2A2E] text-white placeholder-white/70"
            />
            <input
              type="text"
              placeholder="Organization"
              className="w-full sm:w-1/2 p-2 rounded bg-[#2A2A2E] text-white placeholder-white/70"
            />
          </div>

          
         
          <input
            type="text"
            placeholder="Subject"
            className="w-full p-2 rounded bg-[#2A2A2E] text-white placeholder-white/70"
          />

          <textarea
            placeholder="Message"
            rows={4}
            className="w-full p-2 rounded bg-[#2A2A2E] text-white placeholder-white/70 resize-none"
          ></textarea>

        
          <button
            type="submit"
            className="hover:opacity-80 cursor-pointer w-full py-2 rounded bg-primary text-white hover:bg-primary/80 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUsForm;

