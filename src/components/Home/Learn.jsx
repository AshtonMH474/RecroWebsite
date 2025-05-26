import { tinaField } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"

function Learn(props){
    console.log(props)
return(
    <div className="mt-64 bg-black h-screen w-full">
        <div className="flex items-center justify-center h-screen w-full">
            <div className="w-[700px] mb-32" data-tina-field={tinaField(props,'headingLearnTeam')}>
                <TinaMarkdown content={props.headingLearnTeam} components={{
                    h1:props => <h1 className="text-[60px] font-bold" {...props}/>,
                    bold:props => <span className="primary-color" {...props}/>,
                    p:props => <p className="secondary-text mb-6" {...props}/>
                }}/>
               
                <button className="px-4 capitalize py-2 w-30  border primary-border rounded hover:text-white/80 transition-colors duration-300">
                    About Us
                </button>
            </div>
            <div className="move">
                {props?.learnTeamImages.map((image, i) => {
                    console.log(image)

            return (
              <img
                key={i}
                src={image.src}
                alt={image.alt || `team image ${i + 1}`}
                className={`object-cover rounded-[12px]`}
                data-tina-field={tinaField(image, "src")}
                style={{
                    width: image?.width ?? 'auto',
                    height: image?.height ?? 'auto',
                    top: image?.top ?? undefined,
                    left: image?.left ?? undefined,
                    right: image?.right ?? undefined,
                    bottom: image?.bottom ?? undefined,
                    zIndex: image?.zIndex ?? undefined,
                    position: 'relative',
                }}
              />
            );
          })}
            </div>
        </div>
    </div>
)
}

export default Learn