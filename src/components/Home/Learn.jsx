import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

function Learn(props) {
    
    const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const isSmall = window.innerWidth <= 767 && window.innerHeight <= 630;
      setIsSmallScreen(isSmall);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
    // scrollYProgress tracks scroll from 0(top page) - 1(bottom page)
  const { scrollYProgress } = useViewportScroll();

// was [0.4, 1], consider [0.4, 0.95] so it's done before footer enters
const translateY = useTransform(scrollYProgress, [0.4, 0.95], ["100%", "0%"]);
const contentOpacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);

  return (
    <>
    {/* <motion.div */}
   <div
      className={`bg-black  min-h-screen w-full mt-42 `}
      style={{
        // y: translateY,
       
        position: "relative",
        zIndex: 30,
        paddingBottom:'80px'
      }}
    >
      <motion.div
        className="flex flex-col md:gap-16 md:flex-row items-center justify-center min-h-screen w-full"
        // style={{ opacity: contentOpacity }}
      >
        <div
          className="pl-4   mt-16 sm:static md:w-[700px] mb-32 "
          data-tina-field={tinaField(props, "headingLearnTeam")}
        >
          <TinaMarkdown
            content={props.headingLearnTeam}
            components={{
              h1: (props) => <h1 className="pl-4 md:pl-0 text-[36px] md:text-[60px] font-bold" {...props} />,
              bold: (props) => <span className="primary-color" {...props} />,
              p: (props) => <p className="pl-4 md:pl-0 secondary-text mb-6" {...props} />,
            }}
          />
            <div className="pl-4 md:pl-0 ">
                <button className="px-4 capitalize py-2 w-30 border primary-border rounded hover:text-white/80 transition-colors duration-300">
                    About Us
                </button>
            </div>
        </div>

        <div className="move flex flex-col gap-y-4 lg:mt-[120px]">
          {props?.learnTeamImages?.map((image, i) => (
            <img
              key={i}
              src={image.src}
              alt={image.alt || `team image ${i + 1}`}
              className={` object-cover rounded-[12px] lg:relative h-[200px] lg:h-[250px] sm:max-w-none `}
              data-tina-field={tinaField(image, "src")}
              style={{
                // width: image?.width ?? 420,
                // height: image?.height ?? 220,
                top: image?.top ?? "auto",
                left: image?.left ?? "auto",
                right: image?.right ?? "auto",
                bottom: image?.bottom ?? "auto",
                zIndex: image?.zIndex ?? "auto"
              }}
            />
          ))}
        </div>
      </motion.div>
    {/* </motion.div> */}
    </div>
    <div className="bg-black h-[100px] w-full" />
    </>
  );
}

export default Learn;


