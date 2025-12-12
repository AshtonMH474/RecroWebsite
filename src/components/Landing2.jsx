import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

function Landing2(props) {
  return (
    <>
      <div
        style={{ minHeight: "100%" }}
        className="landing lg:-mt-20 flex flex-col justify-center items-center w-full"
      >
        {/* ======================== Main Row ======================== */}
        <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-x-22">
          
          {/* ======================== LEFT SIDE ======================== */}
          <div className="lg:pl-20">
            {props.headingLanding2 && (
              <div
                className="w-90 md:w-120"
                data-tina-field={tinaField(props, "headingLanding2")}
              >
                <TinaMarkdown
                  content={props.headingLanding2}
                  components={{
                    h1: (p) => (
                      <h1
                        className="text-[40px] lg:text-[60px] text-center lg:text-left font-bold mb-4"
                        {...p}
                      />
                    ),
                    bold: (p) => <span className="primary-color" {...p} />,
                    h3: (p) => (
                      <h3
                        className="text-[16px] secondary-text mb-6 text-center lg:text-left"
                        {...p}
                      />
                    ),
                  }}
                />
              </div>
            )}

            {/* ======================== BUTTONS + ARROW ======================== */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="flex flex-col items-center">
                
                {/* ---- Buttons Row ---- */}
                <div className="flex flex-wrap gap-x-4 justify-center lg:justify-start">
                  {props.buttons?.map((button, i) => {
                    const field = tinaField(props.buttons[i], "label");

                    if (button.style === "border" && button.link) {
                      return (
                        <Link href={button.link} key={i}>
                          <button
                            data-tina-field={field}
                            className="px-8 py-2 capitalize border primary-border rounded hover:text-white/80 transition-colors duration-300"
                          >
                            {button.label}
                          </button>
                        </Link>
                      );
                    }

                    if (button.style === "button" && button.link) {
                      return (
                        <Link href={button.link} key={i}>
                          <button
                            data-tina-field={field}
                            className="bg-primary text-white px-8 py-2 capitalize rounded cursor-pointer hover:opacity-80"
                          >
                            {button.label}
                          </button>
                        </Link>
                      );
                    }

                    return null;
                  })}
                </div>

                {/* ---- Animated Arrow ---- */}
                {props.arrow && (
                  <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="mt-6 flex justify-center"
                  >
                    <ChevronDown
                      onClick={() => {
                        if (props.isSection) {
                          const firstSection = document.querySelector("section");
                          firstSection?.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                          });
                        } else {
                          window.scrollBy({
                            top: window.innerHeight,
                            behavior: "smooth",
                          });
                        }
                      }}
                      className="w-15 h-15 font-bold cursor-pointer"
                      style={{ color: "#B55914" }}
                    />
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* ======================== RIGHT SIDE IMAGES ======================== */}
          <div className="hidden lg:flex flex-col items-center px-8 w-[95%] sm:w-auto lg:w-[80%] xl:w-auto lg:mt-[120px] gap-y-8 pr-30 lg:pr-40">
            {props.landing2Images?.map((image, i) => {
              const positionStyles = {
                zIndex: i + 1,
                ...(i === 0 && { top: "100px", left: "110px" }),
                ...(i === 1 && { right: "20px" }),
                ...(i === 2 && { bottom: "100px", left: "110px" }),
              };

              return (
                <img
                  key={i}
                  data-tina-field={tinaField(image, "src")}
                  src={image.src}
                  style={positionStyles}
                  className="relative w-full aspect-[3/2] max-w-[400px] max-h-[250px] object-cover rounded-[12px]"
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing2;
