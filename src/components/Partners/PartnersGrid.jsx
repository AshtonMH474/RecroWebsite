import { useMemo } from "react";
import { tinaField } from "tinacms/dist/react"



function PartnersGrid({partnersRes,...block}){
    
      const allPartners = partnersRes?.partnerConnection?.edges.map((e) => e.node) || [];

  // Apply filtering but don't break Tina editing
  const filtered = useMemo(() => {
    if (block.category?.category && block.category.category !== "All") {
      return allPartners.filter(
        (partner) => partner?.category?.category === block.category.category
      );
    }
    return allPartners;
  }, [allPartners, block.category?.category]);
    return(
        <>
            <div id={block.partners_id} 
            className="relative bg-black overflow-hidden w-full pb-24" >
                <div className="flex flex-col text-center items-center mt-32 pb-12">
                    {block.partners_heading && (<h2  data-tina-field={tinaField(block,'partners_heading')} className="font-bold text-[32px] md:text-[40px] text-white text-center px-4">{block.partners_heading}</h2>)}
                    <div data-tina-field={tinaField(block,'underline_width')} style={{width:block.underline_width}}  className="rounded-[12px] h-1  bg-primary mt-2"></div>
                </div>
                <div className="relative w-full max-w-[1000px] mx-auto overflow-hidden">
                    <div className="relative  w-full flex flex-wrap items-center justify-center gap-x-6 gap-y-12 px-4">
                        {filtered.map((partner, i) => {
                            const Wrapper = partner.link ? "a" : "div";

                            return (
                                <Wrapper
                                key={partner._id || partner.title || i}
                                className="flex-1 min-w-[250px] sm:basis-[45%] lg:basis-[30%] max-w-[300px]"
                                {...(partner.link ? { href: partner.link, target: "_blank" } : {})}
                                >
                                <div
                                    className="flex items-center justify-center gap-x-2 border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[300px] h-[120px] px-4 py-6"
                                    data-tina-field={tinaField(partner, "logo")}
                                >
                                    <img
                                    className="h-auto max-h-[100px] object-contain"
                                    src={partner.logo}
                                    alt="partner"
                                    />
                                    {partner.needsTitle && partner.title && (
                                    <h1 className="font-bold text-[26px] text-center">{partner.title}</h1>
                                    )}
                                </div>
                                </Wrapper>
                            );
                        })}

                    </div>

                </div>
            </div>
        </>
    )
}

export default PartnersGrid