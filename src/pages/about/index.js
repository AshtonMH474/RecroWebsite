import GearIcon from "@/components/GearIcon";
import { useRef } from "react"
import { useScroll, useTransform, motion } from "framer-motion";
import Nav from "@/components/Nav";
import { useTina } from "tinacms/dist/react";
import Footer from "@/components/Footer";
import LandingAbout from "@/components/About/Landing";
import { useExpertise } from "@/context/ExpertiseContext";
import Approach from "@/components/About/Approach";
import Leadership from "@/components/About/Leadership";


export async function getStaticProps(){
    const {client} = await import('../../../tina/__generated__/databaseClient')
    const res = await client.queries.page({relativePath:'about.md'})
    const navRes = await client.queries.nav({relativePath:'nav.md'})
    const footerRes = await client.queries.footer({relativePath:"footer.md"})
    return {
      props:{
        res:res,
        navData:navRes,
        footerData:footerRes
      }
    }
  
}

function About({res,navData,footerData}){
    const ref = useRef(null)
    const {expertiseRef} = useExpertise()
    const { scrollY } = useScroll();
    const rotate = useTransform(scrollY, [0, 3000], [0, 360], {
    clamp: false, // disables clamping so it keeps going beyond 360
    });

    const {data} = useTina(res)
    const {data:navContent} = useTina(navData)
    const {data:footerContent} = useTina(footerData)

    const scrollToExpertise = () => {
        expertiseRef.current?.scrollToHeading();
    };
    return (
        <>
            <Nav res={navContent.nav} onExpertiseClick={scrollToExpertise}/>
            <div
            ref={ref}
            style={{height:'100dvh', minHeight:'calc(var(--vh, 1vh) * 100)'}}
            className="background Home overflow-hidden bg-fixed bg-center bg-cover sm:bg-cover bg-contain flex flex-col items-end"
            >
        
                <motion.div  style={{ rotate, transformOrigin: "center center", willChange: "transform" }} className="mr-10 gear1">
                <GearIcon className="h-80 w-80 text-black" />
                </motion.div>
                <motion.div style={{ rotate, transformOrigin: "center center", willChange: "transform" }} className="mr-10 gear2">
                <GearIcon className="h-50 w-50 " />
                </motion.div>
                <motion.div style={{ rotate, transformOrigin: "center center", willChange: "transform" }} className="mr-10 gear3">
                <GearIcon className="h-65 w-65 text-black" />
                </motion.div>
                <motion.div style={{ rotate, transformOrigin: "center center", willChange: "transform" }} className="mr-10 gear4">
                <GearIcon className="h-80 w-80 " />
                </motion.div>
                <motion.div style={{ rotate, transformOrigin: "center center", willChange: "transform" }} className="mr-10 gear5">
                <GearIcon className="h-105 w-105 text-black" />
                </motion.div>
       
          
            </div>
             {data.page.blocks?.map((block,i) => {
        switch(block?.__typename){
          case "PageBlocksLanding":{
            return <LandingAbout key={i} {...block}/>
          }
          case "PageBlocksCards":{
            return <Approach key={i} {...block}/>
          }
          case "PageBlocksLeadership":{
            return <Leadership key={i} {...block}/>
          }
        }
      })}
            
            <Footer res={footerContent.footer}/>
        </>
    )
}

export default About