// components/Leadership/LeaderCard.jsx
import { tinaField } from "tinacms/dist/react";
import LeaderInfo from "./LeaderInfo";
import LeaderBio from "./LeaderBio";
import { useState } from "react";

function LeaderCard({ leader,isMobile }) {
  // using this to show if bio should be visable or not
  const [isVisable,setVisable] = useState()
  return (
    <div
      data-tina-field={tinaField(leader, "src")}
      role="img"
      aria-label={`${leader.name}, ${leader.title}`}
      className={`${isMobile ? 'cursor-pointer' : ''} relative group w-[300px]  h-[300px] sm:h-[400px] md:h-[500px]  rounded-[8px] overflow-hidden shadow-md transform transition-all duration-300 hover:scale-105`}
      onClick={() => {
        if(isMobile)setVisable(!isVisable)
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 group-hover:opacity-0"
        style={{ backgroundImage: `url(${leader.src})` }}
      />

      <div className={`absolute inset-0 bg-[#1A1A1E] ${isVisable ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}  transition-opacity duration-300`}/>

     {!isVisable && (<LeaderInfo leader={leader} />)} 
      <LeaderBio leader={leader} isMobile={isMobile} isVisable={isVisable}/>
    </div>
  );
}

export default LeaderCard;

