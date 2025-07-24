import { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { tinaField } from "tinacms/dist/react";

export default function Agencies(props) {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const controls = useAnimation();
  const [trackWidth, setTrackWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

 useEffect(() => {
  const init = () => {
    if (trackRef.current && containerRef.current) {
      const track = trackRef.current.scrollWidth;
      const container = containerRef.current.offsetWidth;
      setTrackWidth(track);
      setContainerWidth(container);
      controls.stop();
      startMarquee(track, container);
    }
  };

  // Run immediately on mount
  init();

  // Debounced resize listener
  let resizeTimeout;
  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      init(); // re-run with updated dimensions
    }, 150);
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, [props.partners]);


  const startMarquee = async (track, container) => {
    const distance = track + container; // from far right to far left
    const duration = distance / 100; // speed control

    while (true) {
      await controls.start({
        x: [container, -track],
        transition: {
          duration,
          ease: "linear",
        },
      });
      controls.set({ x: container }); // reset instantly to far right again
    }
  };

  return (
    <section className="w-full bg-black py-12 overflow-hidden">
      <div className="text-center">
        <h2
          data-tina-field={tinaField(props, "agencies_heading")}
          className="text-white font-bold text-[36px]"
        >
          {props.agencies_heading}
        </h2>
        <div className="bg-primary h-1 w-32 md:w-80 mx-auto mt-3 rounded-xl" />
      </div>

      <div
        ref={containerRef}
        className="relative w-full mt-12 overflow-hidden marquee-container"
      >
        <motion.div
          ref={trackRef}
          animate={controls}
          className="flex gap-8 px-20"
          style={{ whiteSpace: "nowrap" }}
        >
          {[...props.partners, ...props.partners].map((partner, i) => (
            <img
              key={i}
              src={partner.agency}
              alt="agency logo"
              className="h-[120px] w-auto object-contain drop-shadow-lg"
            />
          ))}
        </motion.div>

        {/* Gradient fades */}
        <div className="absolute left-0 top-0 h-full w-20 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-20 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none" />
      </div>
    </section>
  );
}


