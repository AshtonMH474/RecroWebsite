import { tinaField } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"

function Landing2(props){
    console.log(props)
    return(
    <div style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }} className="landing flex flex-col lg:flex-row  items-center justify-center  w-full gap-x-22">
        <div className=" pt-65 lg:pt-0 lg:pl-20">
            {props.headingLanding2 && (
                <div className='w-90 md:w-100' data-tina-field={tinaField(props,'headingLanding2')}>
                    <TinaMarkdown content={props.headingLanding2} components={{
                        h1:props => <h1 className="text-[40px] lg:text-[60px] text-center lg:text-left font-bold mb-4" {...props}/>,
                        bold:props => <span className="primary-color" {...props} />,
                        h3:props => <h3 className="text-[16px]  secondary-text mb-6 text-center lg:text-left" {...props}/>
                    }}/>
                </div>
            )}
            <div className="flex flex-wrap justify-center lg:justify-start">
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
        </div>
        <div className="flex flex-col items-center px-8 w-[95%] sm:w-auto lg:w-[80%] xl:w-auto lg:mt-[120px] gap-y-8 pr-30 lg:pr-40">
             {props.landing2Images?.map((image,i) => (
                <img 
                style={{zIndex: i + 1, 
                top: i == 0 ? '150px' : '',
                left: i === 0 || i === 2 ? '110px' : '',
                right: i == 1 ? '20px' : '',
                bottom: i == 2 ? '150px': ''
                }} 
                className="relative w-full aspect-[3/2] max-w-[450px] max-h-[300px] object-cover rounded-[12px]" key={i} src={image.src}/>
             ))}           
        </div>
   
    </div>
    )
}

export default Landing2