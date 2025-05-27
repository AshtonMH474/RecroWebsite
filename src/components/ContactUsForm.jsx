



function ContactUsForm() {

    const handleSubmit = async(e) => {
        e.preventDefault();

        const formData ={
            firstName:e.target.firstName.value,
            lastName:e.target.lastName.value,
            email:e.target.email.value,
            organization:e.target.organization.value,
            subject:e.target.subject.value,
            message:e.target.message.value
        }

        const res = await fetch("/api/submit-form",{
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })

        if (res.ok) {
        alert("Submitted successfully!");
        } else {
        alert("Failed to submit.");
        }

    }
  
    return (
    <div className="flex justify-center items-center w-screen px-4 pb-16">
      <div className="w-full max-w-[800px] bg-[#1A1A1E] rounded-[12px] p-6">
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              name='firstName'
              placeholder="First Name"
              className="w-full sm:w-1/2 p-2 rounded bg-[#2A2A2E] text-white placeholder-white/70"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-full sm:w-1/2 p-2 rounded bg-[#2A2A2E] text-white placeholder-white/70"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              name="email"
              placeholder="Company Email"
              className="w-full sm:w-1/2 p-2 rounded bg-[#2A2A2E] text-white placeholder-white/70"
            />
            <input
              type="text"
              name="organization"
              placeholder="Organization"
              className="w-full sm:w-1/2 p-2 rounded bg-[#2A2A2E] text-white placeholder-white/70"
            />
          </div>

          
         
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            className="w-full p-2 rounded bg-[#2A2A2E] text-white placeholder-white/70"
          />

          <textarea
            placeholder="Message"
            name="message"
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

