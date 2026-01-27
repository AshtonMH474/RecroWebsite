// components/Leadership/LeaderCard.jsx
import { tinaField } from "tinacms/dist/react";
import LeaderInfo from "./LeaderInfo";


function LeaderCard({ leader,onExpand }) {

  return (
    
    <div
      data-tina-field={tinaField(leader, "src")}
      role="img"
      aria-label={`${leader.name}, ${leader.title}`}
      className={`cursor-pointer relative group w-[300px]  h-[400px] md:h-[500px]  rounded-[8px] overflow-hidden shadow-md transform transition-all duration-300 hover:scale-103`}
      onClick={onExpand}
    >
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 "
          style={{ backgroundImage: `url(${leader.src})` }}
        />


        <LeaderInfo leader={leader} />

    </div>
  );
}

export default LeaderCard;

