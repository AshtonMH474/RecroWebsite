import { useScroll, useTransform, motion } from "framer-motion";
 import GearIcon from "./GearIcon"
import { useRef } from "react"
 
 function BG() {
    const ref = useRef(null)
    const { scrollY } = useScroll();
     const rotate = useTransform(scrollY, [0, 3000], [0, 360], {
        clamp: false, // disables clamping so it keeps going beyond 360
    });

    return(
        <div
        ref={ref}
        style={{height:'100dvh', minHeight:'100dvh' }}
        className="background Home  overflow-hidden bg-fixed bg-center bg-cover  bg-contain flex flex-col items-end"
         >
        
            <motion.div  style={{ rotate, transformOrigin: "center center", willChange: "transform"}} className="mr-10 gear1">
              <GearIcon className="h-80 w-80 text-black" />
            </motion.div>
            <motion.div style={{ rotate, transformOrigin: "center center", willChange: "transform"}} className="mr-10 gear2">
              <GearIcon className="h-50 w-50 " />
            </motion.div>
            <motion.div style={{ rotate, transformOrigin: "center center", willChange: "transform" }} className="mr-10 gear3">
              <GearIcon className="h-65 w-65 text-black" />
            </motion.div>
            <motion.div style={{ rotate, transformOrigin: "center center", willChange: "transform" }} className="mr-10 gear4">
              <GearIcon className="h-80 w-80 " />
            </motion.div>
            <motion.div style={{ rotate, transformOrigin: "center center", willChange: "transform" }} className="mr-10 gear5">
              <GearIcon className="h-105 w-105 text-black" />
            </motion.div>
       
          
      </div>
)

 }


 export default BG