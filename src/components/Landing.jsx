import { useRef, useState, useEffect } from 'react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { tinaField } from 'tinacms/dist/react'
import Link from 'next/link'

function Landing(props) {
  const wrapperRef = useRef(null)
  const subTextRef = useRef(null)
  const [hasPadding, setHasPadding] = useState(false)


  const [inlineWidth, setInlineWidth] = useState(undefined);

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
      style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}
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
                h3: (p) => (
                  <h3 className="text-[16px] secondary-text mb-6" {...p} />
                ),
                p: (p) => (
                  <p className="text-[16px] color-white mb-6" {...p} />
                ),
              }}
            />
          </div>
        )}
      </div>

      {/* === Buttons === */}
      <div className="flex gap-x-8 ">
        {props.buttons?.map((button, i) =>
          button.style === 'border' ? (
            <Link href={button.link} key={i}>
              <button
                data-tina-field={tinaField(props.buttons[i], 'label')}
                className="px-8 capitalize py-2 border primary-border rounded hover:text-white/80 transition-colors duration-300"
              >
                {button.label}
              </button>
            </Link>
          ) : button.style === 'button' ? (
            <Link href={button.link} key={i}>
              <button
                data-tina-field={tinaField(props.buttons[i], 'label')}
                className="bg-primary capitalize cursor-pointer px-8 py-2 w-auto rounded hover:opacity-80 text-white"
              >
                {button.label}
              </button>
            </Link>
          ) : null
        )}
      </div>
    </div>
  )
}

export default Landing
