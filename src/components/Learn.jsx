import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

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
        id={props.learn_id}
        ref={learnRef}
        style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}
        className="bg-black overflow-hidden w-full mt-42 relative z-30 pb-20"
      >
        <div
          style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}
          className="flex flex-col lg:gap-x-16  lg:flex-row pt-32 items-center justify-center "
        >
          <motion.div
            style={{ opacity: contentOpacity }}
            className="px-8 mt-16 w-[95%] max-w-[700px] mb-32 pt-30"
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
            <div className="flex gap-x-8 pl-4 md:pl-0">
              {props.buttons?.map((button, i) => {
                const key = button.id || button.label || i;
                const baseProps = {
                  "data-tina-field": tinaField(button, "label"),
                  className:
                    button.style === "border"
                      ? "px-8 capitalize py-2 border primary-border rounded hover:text-white/80 transition-colors duration-300"
                      : "bg-primary capitalize cursor-pointer px-8 py-2 w-auto rounded hover:opacity-80 text-white",
                };
                return (
                  <Link href={button.link} key={key}>
                    <button {...baseProps}>{button.label}</button>
                  </Link>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: contentOpacity }}
            className="flex  flex-col items-center px-8 w-[95%] sm:w-auto lg:w-[80%] xl:w-auto lg:mt-[120px] gap-y-8 lg:pr-30"
          >
            {props?.learnTeamImages?.map((image, i) => (
              <div key={image.id || image.src || i} 
              data-tina-field={tinaField(image, "src")}  
              style={{
                  top: image?.top ?? "auto",
                  left: image?.left ?? "auto",
                  right: image?.right ?? "auto",
                  bottom: image?.bottom ?? "auto",
                  zIndex: image?.zIndex ?? "auto"}} className="aspect-[16/9] w-full md:max-w-[425px] md:relative  overflow-hidden rounded-[20px] ">
              <img
               
                src={image.src}
                alt={image.alt || `team image ${i + 1}`}
                className=" object-cover"
                
                style={{
                  top: image?.top ?? "auto",
                  left: image?.left ?? "auto",
                  right: image?.right ?? "auto",
                  bottom: image?.bottom ?? "auto",
                  zIndex: image?.zIndex ?? "auto",
                }}
              />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="bg-black h-[100px] w-full" />
    </>
  );
}

export default Learn;

