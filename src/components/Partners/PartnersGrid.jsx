import { tinaField } from "tinacms/dist/react"



function PartnersGrid({partnersRes,...block}){
    const partners = partnersRes.partnerConnection.edges.map(e => e.node);
    return(
        <>
            <div id={block.partners_id} style={{minHeight:'100dvh'}} 
            className="relative bg-black overflow-hidden w-full pb-24" >
                <div className="flex flex-col items-center mt-32 pb-12">
                    {block.partners_heading && (<h2  data-tina-field={tinaField(block,'partners_heading')} className="font-bold text-[32px] md:text-[40px] text-white">{block.partners_heading}</h2>)}
                    <div data-tina-field={tinaField(block,'underline_width')} style={{width:block.underline_width}}  className="rounded-[12px] h-1  bg-primary mt-2"></div>
                </div>
                <div className="relative w-full max-w-[1000px] mx-auto overflow-hidden min-h-[600px]">
                    <div className="relative  w-full flex flex-wrap items-center justify-center gap-x-6 gap-y-12">
                        {partners.map((partner,i)=> (
                            <a target="_blank" href={partner.link} key={i}>
                                <div
                                key={i}
                                className="flex items-center justify-center gap-x-2 border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[300px] h-[100px] px-4 py-6"
                                data-tina-field={tinaField(partner, "title")}
                                >
                                    <img
                                        className="h-20 object-contain"
                                        src={partner.logo}
                                        alt="partner"
                                    />
                                    {partner.needsTitle && partner.title && (<h1 className="font-bold text-[clamp(14px,2vw,26px)] text-center">{partner.title}</h1>)}
                                </div>
                            </a>
                        ))}
                    </div>

                </div>
            </div>
        </>
    )
}

export default PartnersGrid