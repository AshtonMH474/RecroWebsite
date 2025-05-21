import {TinaMarkdown} from 'tinacms/dist/rich-text'


function Landing(props){

    console.log(props)
    return(
    <div className="flex flex-col items-center justify-center h-screen w-full">
        <TinaMarkdown content={props.heading} components={{
            h1:props => <h1 className="text-5xl font-bold text-center mb-4" {...props}/>,
            h3:props => <h3 className="text-center secondary-text mb-6" {...props}/>
        }}/>
        
        <div className="flex gap-x-8">
            {props.buttons?.map((button) =>
                button.style === 'border' ? (
                    <button key={button.label} className="px-4 capitalize py-2 w-30 border primary-border rounded hover:text-white/80 transition-colors duration-300">
                    {button.label}
                    </button>
                ) : button.style === 'button' ? (
                    <button key={button.label} className="bg-primary capitalize cursor-pointer px-4 py-2 w-30 rounded hover:opacity-80 text-white">
                    {button.label}
                    </button>
                ) : null
            )}

            
        </div>
</div>

    )
}


export default Landing