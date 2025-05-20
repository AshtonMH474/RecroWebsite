'use client'
import { useRef } from "react";
import GearIcon from "./components/GearIcon";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Home() {
  const ref = useRef(null);

 const { scrollY } = useScroll();

   const rotate = useTransform(scrollY, [0, 1000], [0, 360], {
    clamp: false, // disables clamping so it keeps going beyond 360
  });

  return (
    // <div>
    <>
      <div
        ref={ref}
        className=" background Home h-screen bg-fixed bg-center bg-cover flex flex-col items-end"
       
      >
        
            <motion.div style={{ rotate }} className="mr-10 gear1">
              <GearIcon className="h-80 w-80 text-black" />
            </motion.div>
            <motion.div style={{ rotate }} className="mr-10 gear2">
              <GearIcon className="h-50 w-50 " />
            </motion.div>
            <motion.div style={{ rotate }} className="mr-10 gear3">
              <GearIcon className="h-65 w-65 text-black" />
            </motion.div>
            <motion.div style={{ rotate }} className="mr-10 gear4">
              <GearIcon className="h-80 w-80 " />
            </motion.div>
            <motion.div style={{ rotate }} className="mr-10 gear5">
              <GearIcon className="h-105 w-105 text-black" />
            </motion.div>
       
          
      </div>
      <div className="test"></div>

  
    {/* // </div> */}
    </>
  );
}

