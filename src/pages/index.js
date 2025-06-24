
import { useRef } from "react";
import GearIcon from "../components/GearIcon";
import { useScroll, useTransform, motion } from "framer-motion";
import Landing from "../components/Home/Landing";
import {useTina} from 'tinacms/dist/react'
import Nav from "../components/Nav";
import Expertise from "../components/Home/Expertise";
import Learn from "@/components/Home/Learn";
import Footer from "@/components/Footer";
import { useExpertise } from "@/context/ExpertiseContext";



export async function getStaticProps(){
    const {client} = await import("../../tina/__generated__/databaseClient");
    const res = await client.queries.page({relativePath:'home.md'})
    const navRes = await client.queries.nav({relativePath:'nav.md'})
    const footerRes = await client.queries.footer({relativePath:"footer.md"})

    return {
      props:{
        res:res,
        navData:navRes,
        footerData:footerRes,
      }
    }
  
}


export default function Home({res,navData,footerData}) {
  const ref = useRef(null);
 
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
        style={{ height: '100vh',overflowAnchor:'none'}}
        className="background Home  bg-fixed bg-center bg-cover sm:bg-cover bg-contain flex flex-col items-end"
      >
        
            <motion.div  style={{ rotate, transformOrigin: "center center"}} className="mr-10 gear1">
              <GearIcon className="h-80 w-80 text-black" />
            </motion.div>
            <motion.div style={{ rotate, transformOrigin: "center center"}} className="mr-10 gear2">
              <GearIcon className="h-50 w-50 " />
            </motion.div>
            <motion.div style={{ rotate, transformOrigin: "center center" }} className="mr-10 gear3">
              <GearIcon className="h-65 w-65 text-black" />
            </motion.div>
            <motion.div style={{ rotate, transformOrigin: "center center" }} className="mr-10 gear4">
              <GearIcon className="h-80 w-80 " />
            </motion.div>
            <motion.div style={{ rotate, transformOrigin: "center center" }} className="mr-10 gear5">
              <GearIcon className="h-105 w-105 text-black" />
            </motion.div>
       
          
      </div>
      {data.page.blocks?.map((block,i) => {
        switch(block?.__typename){
          case "PageBlocksLanding":{
            return <Landing key={i} {...block}/>
          }
          case "PageBlocksCards":{
            return <Expertise key={i} ref={expertiseRef} {...block}/>
          }
        case "PageBlocksLearnTeam":{
          return <Learn key={i} {...block}/>
        }
        }
      })}


      <Footer res={footerContent.footer}/>
      

      
      

      

  
   
    </>
  );
}

