import { motion } from "framer-motion";
import GearIcon from "./GearIcon";

export default function DivGears({ gearRotation = 0 }) {
  const rotateConfig = {
    animate: { rotate: gearRotation },
    transition: { type: "spring", stiffness: 80, damping: 10 },
    className: "w-full h-full",
  };

  return (
    <div className="
      hidden xl:flex justify-between items-center 
      w-full absolute top-50 left-0 bottom-0 right-0 
      px-6 z-0 pointer-events-none
    ">
      {/* ================= LEFT COLUMN ================= */}
      <div className="flex flex-col">
        {[
          { class: "right-[60px] w-30 h-30" },
          { class: "bottom-[30px] left-[30px] w-20 h-20" },
          { class: "right-[60px] bottom-[80px] w-25 h-25" },
          { class: "right-[60px] bottom-[75px] w-30 h-30" },
          { class: "left-[25px] bottom-[100px] w-20 h-20" },
          { class: "right-[70px] bottom-[150px] w-25 h-25" },
        ].map((gear, i) => (
          <div key={i} className={`relative ${gear.class}`}>
            <motion.div {...rotateConfig}>
              <GearIcon
                stroke="rgba(255, 255, 255, 0.15)"
                className="text-[#1A1A1E] w-full h-full"
              />
            </motion.div>
          </div>
        ))}
      </div>

      {/* ================= RIGHT COLUMN ================= */}
      <div className="flex flex-col relative top-[8px]">
        {[
          { class: "left-[60px] w-30 h-30" },
          { class: "bottom-[40px] right-[5px] w-20 h-20" },
          { class: "left-[60px] bottom-[80px] w-25 h-25" },
          { class: "left-[60px] bottom-[75px] w-30 h-30" },
          { class: "bottom-[110px] w-20 h-20" },
          { class: "left-[70px] bottom-[150px] w-25 h-25" },
        ].map((gear, i) => (
          <div key={i} className={`relative ${gear.class}`}>
            <motion.div {...rotateConfig}>
              <GearIcon
                stroke="rgba(255, 255, 255, 0.15)"
                className="text-[#1A1A1E] w-full h-full"
              />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
