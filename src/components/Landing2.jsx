import Link from "next/link";
import { tinaField } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

function Landing2(props){
    
    return(
    <>
    <div style={{ minHeight: '100%' }} className="landing  lg:-mt-20 flex flex-col lg:flex-row  items-center justify-center  w-full gap-x-22 ">
        <div className="lg:pl-20">
            {props.headingLanding2 && (
                <div className='w-90 md:w-120 ' data-tina-field={tinaField(props,'headingLanding2')}>
                    <TinaMarkdown content={props.headingLanding2} components={{
                        h1:props => <h1 className="text-[40px] lg:text-[60px] text-center lg:text-left font-bold mb-4" {...props}/>,
                        bold:props => <span className="primary-color" {...props} />,
                        h3:props => <h3 className="text-[16px]  secondary-text mb-6 text-center lg:text-left" {...props}/>
                    }}/>
                </div>
            )}
            <div className="flex flex-wrap gap-x-4 justify-center lg:justify-start">
            {props.buttons?.map((button,i) =>
                            button.style === 'border' && button.link ? (
                                <Link href={button.link} key={i}>
                                    <button  data-tina-field={tinaField(props.buttons[i], 'label')} className={`px-8 capitalize py-2  border primary-border rounded hover:text-white/80 transition-colors duration-300`}>
                                    {button.label}
                                    </button>
                                </Link>
                            ) : button.style === 'button' && button.link ? (
                                <Link href={button.link} key={i}>
                                    <button  data-tina-field={tinaField(props.buttons[i], 'label')} className={`bg-primary capitalize cursor-pointer px-8 py-2 w-auto   rounded hover:opacity-80 text-white`}>
                                    {button.label}
                                    </button>
                                </Link>
                            ) : null
                        )}
            </div>
        </div>
        <div className="hidden lg:flex flex-col items-center px-8 w-[95%] sm:w-auto lg:w-[80%] xl:w-auto lg:mt-[120px] gap-y-8 pr-30 lg:pr-40">
             {props.landing2Images?.map((image, i) => {
                const style = {
                    zIndex: i + 1,
                    ...(i === 0 && { top: '100px' }),
                    ...((i === 0 || i === 2) && { left: '110px' }),
                    ...(i === 1 && { right: '20px' }),
                    ...(i === 2 && { bottom: '100px' }),
                };

                return (
                    <img
                    data-tina-field={tinaField(image,'src')}
                    key={i}
                    src={image.src}
                    style={style}
                    className="relative w-full aspect-[3/2] max-w-[400px] max-h-[250px] object-cover rounded-[12px]"
                    />
                );
                })}         
        </div>
   
    </div>
          {/* {props.arrow && (
   <motion.div
  initial={{ y: 0 }}
  animate={{ y: [0, 10, 0] }} // bounce up and down
  transition={{
    duration: 1.2,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="mt-8"
>
  <ChevronDown
     onClick={() => {
  if (props.isSection) {
    // find the first section
    const firstSection = document.querySelector("section");
    if (firstSection) {
      firstSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  } else {
    // fallback: scroll one viewport height
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  }
}}
    className={`w-15 h-15 font-bold cursor-pointer`}
    style={{ color: "#B55914" }} // keep your primary color
  />
</motion.div>
         )} */}
    </>
    )
}

export default Landing2