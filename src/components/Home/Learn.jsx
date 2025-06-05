import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function Learn(props) {
  const learnRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: learnRef,
    offset: ["start end", "start start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      <div
        ref={learnRef}
        className="bg-black min-h-screen w-full mt-42 relative z-30 pb-20"
      >
        <div className="flex flex-col md:gap-16 md:flex-row items-center justify-center min-h-screen w-full">
          <motion.div
            style={{ opacity: contentOpacity }}
            className="pl-4 mt-16 sm:static md:w-[700px] mb-32"
            data-tina-field={tinaField(props, "headingLearnTeam")}
          >
            <TinaMarkdown
              content={props.headingLearnTeam}
              components={{
                h1: (props) => (
                  <h1
                    className="pl-4 md:pl-0 text-[36px] md:text-[60px] font-bold"
                    {...props}
                  />
                ),
                bold: (props) => (
                  <span className="primary-color" {...props} />
                ),
                p: (props) => (
                  <p className="pl-4 md:pl-0 secondary-text mb-6" {...props} />
                ),
              }}
            />
            <div className="pl-4 md:pl-0">
              <button className="px-4 capitalize py-2 w-30 border primary-border rounded hover:text-white/80 transition-colors duration-300">
                About Us
              </button>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: contentOpacity }}
            className="move flex flex-col gap-y-4 lg:mt-[120px]"
          >
            {props?.learnTeamImages?.map((image, i) => (
              <img
                key={i}
                src={image.src}
                alt={image.alt || `team image ${i + 1}`}
                className="object-cover rounded-[12px] lg:relative h-[200px] lg:h-[250px] sm:max-w-none"
                data-tina-field={tinaField(image, "src")}
                style={{
                  top: image?.top ?? "auto",
                  left: image?.left ?? "auto",
                  right: image?.right ?? "auto",
                  bottom: image?.bottom ?? "auto",
                  zIndex: image?.zIndex ?? "auto",
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
      <div className="bg-black h-[100px] w-full" />
    </>
  );
}

export default Learn;

