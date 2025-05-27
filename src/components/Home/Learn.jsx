import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { motion, useViewportScroll, useTransform } from "framer-motion";

function Learn(props) {
    // scrollYProgress tracks scroll from 0(top page) - 1(bottom page)
  const { scrollYProgress } = useViewportScroll();

// was [0.4, 1], consider [0.4, 0.95] so it's done before footer enters
const translateY = useTransform(scrollYProgress, [0.4, 0.95], ["100%", "0%"]);
const contentOpacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);

  return (
    <>
    <motion.div
      className="bg-black h-screen w-full"
      style={{
        y: translateY,
        position: "relative",
        zIndex: 30,
        paddingBottom:'80px'
      }}
    >
      <motion.div
        className="flex items-center justify-center h-screen w-full"
        style={{ opacity: contentOpacity }}
      >
        <div
          className="w-[700px] mb-32"
          data-tina-field={tinaField(props, "headingLearnTeam")}
        >
          <TinaMarkdown
            content={props.headingLearnTeam}
            components={{
              h1: (props) => <h1 className="text-[60px] font-bold" {...props} />,
              bold: (props) => <span className="primary-color" {...props} />,
              p: (props) => <p className="secondary-text mb-6" {...props} />,
            }}
          />

          <button className="px-4 capitalize py-2 w-30 border primary-border rounded hover:text-white/80 transition-colors duration-300">
            About Us
          </button>
        </div>

        <div className="move relative top-[50px]">
          {props?.learnTeamImages?.map((image, i) => (
            <img
              key={i}
              src={image.src}
              alt={image.alt || `team image ${i + 1}`}
              className="object-cover rounded-[12px]"
              data-tina-field={tinaField(image, "src")}
              style={{
                width: image?.width ?? 420,
                height: image?.height ?? 220,
                top: image?.top ?? "auto",
                left: image?.left ?? "auto",
                right: image?.right ?? "auto",
                bottom: image?.bottom ?? "auto",
                zIndex: image?.zIndex ?? "auto",
                position: "relative",
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
    <div className="bg-black h-[100px] w-full" />
    </>
  );
}

export default Learn;


