import Link from "next/link"
import IconRenderer from "../utils/IconRenderer"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import { tinaField } from "tinacms/dist/react"
import { downloadPdf } from "../utils/download"

function SolutionCard({card,props}){
    const isSolutionGrid = true
    return(
        <>
            
                <div  className={`border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[300px] h-[260px] px-4 py-6`}>
                    <div className="flex items-center mb-3 gap-x-3">
                        {card.icon && (
                            <div
                            data-tina-field={tinaField(card,'icon')}
                            className="bg-primary rounded-[10px] h-16 w-16 flex-shrink-0 flex items-center justify-center"
                            >
                                <IconRenderer size="50px" color="#FAF3E0" iconName={card.icon} />
                            </div>
                        )}
                        {card.title && (
                            <h3
                            data-tina-field={tinaField(card,'title')}
                            className="text-[20px] font-bold text-white leading-tight flex-1"
                            >
                                {card.title}
                            </h3>
                        )}
                    </div>

                    {card.description && (
                        <div data-tina-field={tinaField(card,'description')}>
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
                    <div className="flex mt-3 gap-x-2">
                        {/* Button */}
                        <button
                            data-tina-field={tinaField(props,'pdf_heading')}
                            onClick={() => downloadPdf(card,isSolutionGrid)}
                            className="px-4 text-[14px] capitalize py-1 bg-primary  rounded hover:opacity-80 transition-colors duration-300 cursor-pointer"
                        >
                            {props.pdf_heading}
                        </button>
                            <Link href={`/solutions/${card._sys.filename}`}>
                                <button className="px-4 py-1 text-[14px]  flex items-center gap-x-1 border primary-border rounded hover:text-white/80">
                                                    <div data-tina-field={tinaField(props,'link_heading')}>
                                    {props.link_heading}
                                    </div>
                                    <div data-tina-field={tinaField(props,'link_icon')}>
                                    <IconRenderer color={"#B55914"} size={'12px'} iconName={props.link_icon}/>
                                    </div>
                                </button>
                            </Link>

                    
                    </div>

                </div>
            
        </>
    )
}

export default SolutionCard



