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

      <div  className="fixed top-0 left-0 w-full h-full -z-20">
        <div
        ref={ref}
        style={{height:'100dvh', minHeight:'100dvh'}}
        className="background Home  overflow-hidden bg-fixed bg-center bg-cover  bg-contain flex flex-col items-end"
         >
        
            <motion.div  style={{ rotate, transformOrigin: "center center"}} className="mr-10 gear1 will-change-transform translate-z-0">
              <GearIcon className="h-80 w-80 text-black" />
            </motion.div>
            <motion.div style={{ rotate, transformOrigin: "center center"}} className="mr-10 gear2 will-change-transform translate-z-0">
              <GearIcon className="h-50 w-50 " />
            </motion.div>
            <motion.div style={{ rotate, transformOrigin: "center center" }} className="mr-10 gear3 will-change-transform translate-z-0">
              <GearIcon className="h-65 w-65 text-black" />
            </motion.div>
            <motion.div style={{ rotate, transformOrigin: "center center" }} className="mr-10 gear4 will-change-transform translate-z-0">
              <GearIcon className="h-80 w-80 " />
            </motion.div>
            <motion.div style={{ rotate, transformOrigin: "center center" }} className="mr-10 gear5 will-change-transform translate-z-0">
              <GearIcon className="h-105 w-105 text-black" />
            </motion.div>
       
          
      </div>
      </div>
)

 }


 export default BG