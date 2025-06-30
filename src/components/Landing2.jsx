import { tinaField } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"

function Landing2(props){
    console.log(props)
    return(
    <div style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }} className="landing flex  items-center justify-center  w-full gap-x-22">
        <div className="">
            {props.headingLanding2 && (
                <div className='w-90 md:w-100' data-tina-field={tinaField(props,'headingLanding2')}>
                    <TinaMarkdown content={props.headingLanding2} components={{
                        h1:props => <h1 className="text-[32px] md:text-[40px] lg:text-[60px] font-bold mb-4" {...props}/>,
                        bold:props => <span className="primary-color" {...props} />,
                        h3:props => <h3 className="text-[16px]  secondary-text mb-6" {...props}/>
                    }}/>
                </div>
            )}
            {props.buttons?.map((button,i) =>
                            button.style === 'border' ? (
                                <button key={i} data-tina-field={tinaField(props.buttons[i], 'label')} className={`px-8 capitalize py-2  border primary-border rounded hover:text-white/80 transition-colors duration-300`}>
                                {button.label}
                                </button>
                            ) : button.style === 'button' ? (
                                <button key={i} data-tina-field={tinaField(props.buttons[i], 'label')} className={`bg-primary capitalize cursor-pointer px-8 py-2 w-auto   rounded hover:opacity-80 text-white`}>
                                {button.label}
                                </button>
                            ) : null
                        )}
        </div>
        <div className="relative mt-20">
             {props.landing2Images?.map((image,i) => (
                <img 
                style={{zIndex: i + 1, 
                top: i == 0 ? '80px' : '',
                left: i === 0 || i === 2 ? '110px' : '',
                right: i == 1 ? '20px' : '',
                bottom: i == 2 ? '40px': ''
                }} 
                className="relative w-full h-auto max-w-[450px] max-h-[300px] object-cover rounded-[12px]" key={i} src={image.src}/>
             ))}           
        </div>
    </div>
    )
}

export default Landing2