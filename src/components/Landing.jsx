import {TinaMarkdown} from 'tinacms/dist/rich-text'
import { tinaField } from 'tinacms/dist/react'
import Link from 'next/link'

function Landing(props){
    return(
    <div style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }} className="landing flex flex-col items-center justify-center  w-full">
        {props.heading && (<div className='w-90 md:w-150' data-tina-field={tinaField(props,'heading')}>
            <TinaMarkdown content={props.heading} components={{
                bold:props => <span className="primary-color" {...props}/>,
                h1:props => <h1 className="text-[32px] md:text-[40px] lg:text-[60px] font-bold text-center mb-4" {...props}/>,
                h3:props => <h3 className="text-[16px] text-center secondary-text mb-6" {...props}/>
            }}/>
        </div>)}
        
        <div className="flex gap-x-8" >
            {props.buttons?.map((button,i) =>
                button.style === 'border' ? (
                    <Link href={button.link} key={i} >
                    <button  data-tina-field={tinaField(props.buttons[i], 'label')} className={`px-8 capitalize py-2  border primary-border rounded hover:text-white/80 transition-colors duration-300`}>
                    {button.label}
                    </button>
                    </Link>
                ) : button.style === 'button' ? (
                    <Link key={i}  href={button.link}>
                    <button data-tina-field={tinaField(props.buttons[i], 'label')} className={`bg-primary capitalize cursor-pointer px-8 py-2 w-auto   rounded hover:opacity-80 text-white`}>
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
