import { FaArrowRight } from "react-icons/fa6";
import { tinaField } from "tinacms/dist/react";
import * as FaIcons from "react-icons/fa";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export function IconRenderer({ iconName }) {
  const IconComponent = FaIcons[iconName];

  if (!IconComponent) return <span>Invalid icon</span>;

  return <IconComponent className="text-[#FAF3E0] text-[50px]" />;
}




function Expertise(props){
    return (
    <div className="pb-16">
        <div className="pb-12 flex flex-col items-center">
            <h2 data-tina-field={tinaField(props,'expertise_heading')} className="font-bold text-[36px]">{props.expertise_heading}</h2>
            <div  className={`rounded-[12px] h-1 w-${props.underline_width} bg-primary`}></div>
        </div>
        <div className="flex flex-wrap justify-center gap-12">
            {props.expertise?.map((ex,i) => 
                <div key={i} className="border border-[rgba(255,255,255,0.2)] rounded-[12px] w-[366.6px] h-[319px] bg-[#1A1A1E]">
                    <div className="flex m-4 mt-8  items-center">
                        <div data-tina-field={tinaField(props.expertise[i],'icon')} className=" bg-primary rounded-[12px] h-20 w-20 flex items-center justify-center"><IconRenderer iconName={ex.icon} /></div>
                        <h3 data-tina-field={tinaField(props.expertise[i],'title')} className="pl-4 text-[30px] font-bold">{ex.title}</h3>
                    </div>
                    <div data-tina-field={tinaField(props.expertise[i], 'description')}>
                        <TinaMarkdown
                            content={ex.description}
                            components={{
                            p: ({ children }) => (
                                <p className="ml-4 mr-4 text-[#C2C2BC] text-[20px]">{children}</p>
                            ),
                            }}
                        />
                    </div>
                    <div className="ml-4 mt-4 primary-color flex items-center gap-x-1">Learn More<FaArrowRight className="primary-color "/></div>
                </div>
            )}
        </div>
    </div>
    )
}

export default Expertise

