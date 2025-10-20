import { useRef, useState, useEffect } from 'react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { tinaField } from 'tinacms/dist/react'
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react"; // nice arrow icon
import Link from 'next/link'
import { useAuth } from '@/context/auth'

function Landing(props) {
  const {openModal} = useAuth()
  const wrapperRef = useRef(null)
  const subTextRef = useRef(null)
  const [hasPadding, setHasPadding] = useState(false)



  const [inlineWidth, setInlineWidth] = useState(undefined);

  const handleLogin = () => {
    openModal('login')
  }
  const handleRegister = () => {
    openModal('register')
  }

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setInlineWidth(`${props.width}%`);
    } else{
        setInlineWidth(undefined)
    }
  }, [props.width]);

  useEffect(() => {
    const checkPadding = () => {
      if (!wrapperRef.current || !subTextRef.current) return

      const wrapperHeight = wrapperRef.current.offsetHeight
      const subTextHeight = subTextRef.current.offsetHeight

      // If subtext is tall enough to start eating into the top half of wrapper
      setHasPadding(subTextHeight > wrapperHeight * 0.4)

      if (window.innerWidth >= 1024) {
      setInlineWidth(`${props.width}%`);
    } else{
        setInlineWidth(undefined)
    }
    }

    checkPadding()
    window.addEventListener('resize', checkPadding)
    return () => window.removeEventListener('resize', checkPadding)
  }, [props.heading,props.width])

  return (
    <div
      style={{ minHeight: '100%' }}
      className={`landing flex flex-col items-center justify-center w-full ${
        hasPadding ? 'pt-20' : ''
      }`}
      ref={wrapperRef}
    >
      {/* === H1 Always Centered === */}
     <div
        className="w-auto md:w-150 lg:w-auto px-4"
        style={{ width: inlineWidth }}
        >
        {props.heading && (
          <div data-tina-field={tinaField(props, 'heading')}>
            <TinaMarkdown
              content={props.heading}
              components={{
                bold: (p) => <span className="primary-color" {...p} />,
                h1: (p) => (
                  <h1
                    className="text-[32px] md:text-[40px] lg:text-[60px] font-bold text-center mb-4"
                    {...p}
                  />
                ),
                h2: () => null,
                h3: () => null,
                p: () => null,
              }}
            />
          </div>
        )}

        {/* === Subtext === */}
        {props.heading && (
          <div
            ref={subTextRef}
            className="text-center"
            data-tina-field={tinaField(props, 'heading')}
          >
            <TinaMarkdown
              content={props.heading}
              components={{
                bold: (p) => <span className="primary-color" {...p} />,
                h1: () => null,
                h2:(p) =><h2 className="text-[26px] md:text-[32px] lg:text-[45px]  text-center mb-6" {...p}/> ,
                h3: (p) => (
                  <h3 className="text-[16px] secondary-text mb-6" {...p} />
                ),
                p: (p) => (
                  <p className="text-[16px] secondary-text mb-6" {...p} />
                ),
              }}
            />
          </div>
        )}
      </div>

      {/* === Buttons === */}
      <div className="flex gap-x-8 ">
   {props.buttons?.map((button, i) => {
  const commonProps = {
    "data-tina-field": tinaField(props.buttons[i], "label"),
    className:
      button.style === "border"
        ? "px-8 capitalize py-2 border primary-border rounded hover:text-white/80 transition-colors duration-300"
        : "bg-primary capitalize cursor-pointer px-8 py-2 w-auto rounded hover:opacity-80 text-white",
  };

  // LINK buttons
  if (button?.type === "link" && button.link) {
    return (
      <Link href={button.link} key={i}>
        <button {...commonProps}>{button.label}</button>
      </Link>
    );
  }

  // REGISTER button
  if (button?.type === "register") {
    return (
      <button key={i} {...commonProps} onClick={handleRegister}>
        {button.label}
      </button>
    );
  }

  // LOGIN button
  if (button?.type === "login") {
    return (
      <button key={i} {...commonProps} onClick={handleLogin}>
        {button.label}
      </button>
    );
  }

  return null;
})}


      {/* {button?.type = 'register' && (

      )} */}
      </div>
      {props.arrow && (
   <motion.div
  initial={{ y: 0 }}
  animate={{ y: [0, 10, 0] }} // bounce up and down
  transition={{
    duration: 1.2,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  style={!props?.buttons || props?.buttons?.length == 0 ? { position: 'relative', bottom: '40px' } : undefined}

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
         )}
    </div>
  )
}

export default Landing
