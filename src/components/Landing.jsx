import { useRef, useState, useEffect } from 'react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { tinaField } from 'tinacms/dist/react'
import Link from 'next/link'

function Landing(props) {
const subTextRef = useRef(null)
const [hasPadding, setHasPadding] = useState(false)

useEffect(() => {
  const checkHeight = () => {
    if (subTextRef.current) {
      const height = subTextRef.current.offsetHeight
      setHasPadding(height > 500)
      console.log('Subtext height:', height)
    }
  }

  // Run on mount and when heading changes
  checkHeight()

  // Run on resize
  window.addEventListener('resize', checkHeight)
  
  // Cleanup on unmount
  return () => window.removeEventListener('resize', checkHeight)
}, [props.heading])

  return (
    <div
      style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}
      className={`landing flex flex-col items-center justify-center w-full ${ 
      
        hasPadding ? 'pt-60' : ''
      }`
    }
    >
    <div className="w-90 md:w-150  lg:w-[50%] px-4" >
      {props.heading && (
        <div data-tina-field={tinaField(props, 'heading')}>
          <TinaMarkdown
            content={props.heading}
            components={{
              bold: (props) => <span className="primary-color" {...props} />,
              h1: (props) => (
                <h1
                  className="text-[32px] md:text-[40px] lg:text-[60px] font-bold text-center mb-4"
                  {...props}
                />
              ),
              // Hide p and h3 here — we'll render separately to measure height
              p: () => null,
              h3: () => null,
            }}
          />
        </div>
      )}

      {/* Subtext to measure */}
      {props.heading && (
        <div
          ref={subTextRef}
          className=" text-center"
          data-tina-field={tinaField(props, 'heading')}
        >
          <TinaMarkdown
            content={props.heading}
            components={{
              bold: (props) => <span className="primary-color" {...props} />,
              h1: () => null, // hide h1 here to avoid duplicates
              h3: (props) => <h3 className="text-[16px] secondary-text mb-6" {...props} />,
              p: (props) => <p className="text-[16px] color-white mb-6" {...props} />,
            }}
          />
        </div>
      )}
      </div>

      {/* Buttons */}
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
