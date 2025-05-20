'use client'
import { useRef } from "react";
import GearIcon from "./components/GearIcon";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Home() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div>
      {/* Full viewport section with a fixed background image */}
      <div
        ref={ref}
        className=" background Home h-screen bg-fixed bg-center bg-cover flex items-center justify-end"
       
      >
        <motion.div style={{ rotate }} className="mr-10">
          <GearIcon className="h-40 w-40 text-white" />
        </motion.div>

          
      </div>
      <div className="test"></div>

      {/* More content below so you can scroll */}
  
    </div>
  );
}

