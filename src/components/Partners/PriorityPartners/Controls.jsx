import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Controls({ handlePrev, handleNext }) {
  return (
    <>
      <button
        onClick={handlePrev}
        className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2
                   bg-black/50 rounded-full p-2 text-white/70 
                   hover:text-white disabled:opacity-30 z-10"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={handleNext}
        className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2
                   bg-black/50 rounded-full p-2 text-white/70 
                   hover:text-white disabled:opacity-30 z-10"
      >
        <ChevronRight size={28} />
      </button>

      
    </>
  );
}
