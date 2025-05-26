import { tinaField } from "tinacms/dist/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ExpertiseCard from "./Expertise/ExpertiseCard";

function Expertise(props) {
 // Create a ref to attach to the section element, so we can track its scroll progress
const sectionRef = useRef(null);

// Get the scroll progress of the section element relative to the viewport
// scrollYProgress is a motion value from 0 to 1 as we scroll through the section
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ["start start", "end start"], 
  // "start start" means section top to viewport top, 
  // "end start" means section bottom to viewport top (scroll ends when section bottom hits top)
});

// Animate the heading's opacity from 0 to 1 as scrollYProgress goes from 0 to 0.1
const headingOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

// Animate the heading's scale from 0.8 to 1 as scrollYProgress goes from 0 to 0.1
const headingScale = useTransform(scrollYProgress, [0, 0.1], [0.8, 1]);

// Define a max fixed number of transforms to maintain React Hook rules consistency
const MAX_ITEMS = 6;

// Create an array of transform objects (scale and opacity) for each expertise card
// Each transform is based on scrollYProgress shifting in 0.1 increments to create staggered animations
const transforms = Array.from({ length: MAX_ITEMS }, (_, i) => {
  const start = 0.1 + i * 0.1; // stagger each item's animation start point
  const end = start + 0.1;     // duration of animation window

  // Animate scale from 0.3 to 1 as scrollYProgress moves from start to end
  // Animate opacity from 0 to 1 in the same range
  return {
    scale: useTransform(scrollYProgress, [start, end], [0.3, 1]),
    opacity: useTransform(scrollYProgress, [start, end], [0, 1]),
  };
});

// Pull the expertise items array from props or default to empty array
const expertiseItems = props.expertise || [];

return (
  // The main section containing the Expertise content
  // The height is dynamic based on how many items there are (half per row * 120 viewport height units)
  <section
    ref={sectionRef}
    className="relative"
    style={{
      height: `${Math.ceil(expertiseItems.length / 2) * 120}vh`,
    }}
  >
        {/* 
        Sticky container that remains fixed on screen during scroll of this section 
        This is where heading and cards will animate based on scroll progress 
        */}
        <motion.div
        style={{
            position: "sticky",
            top: 0,
            height: "100vh",
        }}
        className="flex flex-col justify-center items-center"
        >
        {/* Animated heading container */}
        {/* It fades in and scales up as the user starts scrolling the section */}
            <motion.div 
                className="pb-12 pt-12 flex flex-col items-center"
                style={{ opacity: headingOpacity, scale: headingScale }}
            >
                {/* The section heading text, editable with TinaCMS */}
                <h2
                data-tina-field={tinaField(props, "expertise_heading")}
                className="font-bold text-[36px]"
                >
                {props.expertise_heading}
                </h2>

                {/* Underline bar under heading, width controlled by prop */}
                <div
                className={`rounded-[12px] h-1 w-${props.underline_width} bg-primary`}
                ></div>
            </motion.div>

        {/* Container for expertise cards */}
        {/* Uses flex-wrap to arrange cards in rows with horizontal and vertical gaps */}
            <div className="flex flex-wrap justify-start gap-x-6 gap-y-12 max-w-[1000px] mx-auto">
                {/* Map over expertise items, passing the corresponding transform (scale & opacity) */}
                {expertiseItems.map((ex, i) => {
                return (
                    <ExpertiseCard 
                    key={i} 
                    ex={ex} 
                    transform={transforms[i] || {}} // fallback to empty object if out of range
                    />
                );
                })}
            </div>
        </motion.div>
  </section>
);

}


export default Expertise;


