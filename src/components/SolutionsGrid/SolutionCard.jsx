import Link from "next/link"
import IconRenderer from "../utils/IconRenderer"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import { tinaField } from "tinacms/dist/react"

function SolutionCard({card,props}){
    
    return(
        <>
            <Link href={`/solutions/${card._sys.filename}`}>
                <div className={`border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[300px] h-[260px] px-4 py-6 cursor-pointer`}>
                    <div className="flex items-center mb-3 gap-x-3">
                        {card.icon && (
                            <div
                            className="bg-primary rounded-[10px] h-16 w-16 flex-shrink-0 flex items-center justify-center"
                            >
                                <IconRenderer size="50px" color="#FAF3E0" iconName={card.icon} />
                            </div>
                        )}
                        {card.title && (
                            <h3
                            className="text-[20px] font-bold text-white leading-tight flex-1"
                            >
                                {card.title}
                            </h3>
                        )}
                    </div>

                    {card.description && (
                        <div>
                         <TinaMarkdown
                        content={card.description}
                        components={{
                            p: ({ children }) => (
                                <p className={`text-[#C2C2BC] expertiseDes text-ellipsis text-[16px]`}>
                                    {children}
                                </p>
                                ),
                        }}
                        />
                        </div>
                    )}

                    <div className="mt-3 primary-color flex items-center gap-x-1 text-[14px]">
                        <div data-tina-field={tinaField(props,'link_heading')}>
                            {props.link_heading}
                        </div>
                        <div data-tina-field={tinaField(props,'link_icon')}>
                            <IconRenderer color={"#B55914"} size={'14px'} iconName={props.link_icon}/>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default SolutionCard