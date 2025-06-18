import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { tinaField } from "tinacms/dist/react";
import ApproachCard from "./Approach/ApproachCard";

function Approach(props){
    const approachItems = props.cards || [];
    const sectionRef = useRef(null);
    const [rows,setRows] = useState(1);
    const [vhMultiplier, setVhMultiplier] = useState(1);
    const [short, setShort] = useState(false);
    const [height,setHeight] = useState(false)


     // this is to adjust animation based on screen size
  useEffect(() => {
    const updateLayout = () => {
      const screenWidth = window.innerWidth;
      const cardsPerRow = screenWidth < 640 ? 1 : screenWidth < 1024 ? 2 : 3;
      setRows(Math.ceil(approachItems.length / cardsPerRow));

      const isShort = window.innerHeight <= 600;
      const isHeight = window.innerHeight >= 1000;
      if (isShort) setShort(true);
      if(isHeight) setHeight(true)
      setVhMultiplier(isShort ? 2 : 1);
    };

    updateLayout();
    let timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(updateLayout, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [approachItems.length]);


    const rowHeightVh = 65;
    const headingHeightVh = 80;
    const totalHeightVh = (rows * rowHeightVh + headingHeightVh) * vhMultiplier;

    const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
    });

    const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
    const cardsOpacity = useTransform(scrollYProgress, [0.02, 0.3], [0, 1], { clamp: true });
    const cardsScale = useTransform(scrollYProgress, [0.02, 0.5], [0.1, 1], { clamp: true });

    return(
        <>
            <section
            ref={sectionRef}
            style={{height:`${totalHeightVh}vh`}}
            className="relative">
                <div 
                    className="sticky   z-30 py-12 max-w-[1000px] mx-auto rounded-md [@media(max-height:600px)]:top-10"
                    style={{ paddingTop: short ? "5rem" : "3rem" ,
                    position:'sticky',
                    top: height ? '200px' : '80px'
                }}>
                    <motion.h2
                    data-tina-field={tinaField(props, "cards_heading")}
                    className="font-bold text-[36px] text-white text-center"
                    style={{ opacity: headingOpacity }}
                    >
                    {props.cards_heading}
                    </motion.h2>
                    <motion.div
                    className={`rounded-[12px] h-1 w-${props.underline_width} bg-primary mx-auto mt-2`}
                    style={{ opacity: headingOpacity }}
                    />
                    <motion.div
                    id="target"
                    className="will-change-transform transform-gpu pt-12 flex flex-wrap justify-center gap-x-6 gap-y-12"
                    style={{ opacity: cardsOpacity, scale: cardsScale }}
                    >
                    {/* cards of each expertise */}
                    {approachItems.map((ex, i) => (
                        <ApproachCard key={i} ex={ex} />
                        ))}
                    </motion.div>
                
                </div>
            </section>
        </>
    )
}

export default Approach