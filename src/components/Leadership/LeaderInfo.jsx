// components/Leadership/LeaderInfo.jsx
import { tinaField } from "tinacms/dist/react";

function LeaderInfo({ leader}) {
  return (
    <div className={`absolute inset-0 z-10 transition-opacity duration-300 
       ;group-hover:opacity-0
    `}>
      <div className="absolute inset-0 " />
      <div className="absolute bottom-2 left-2 bg-[#1A1A1E] px-3 py-2 rounded-xl min-w-[40%] max-w-[90%]">
        <p
          data-tina-field={tinaField(leader, "name")}
          className="text-white text-sm font-semibold truncate"
        >
          {leader.name},
        </p>
        <p
          data-tina-field={tinaField(leader, "title")}
          className="text-white text-sm"
        >
          {leader.title}
        </p>
      </div>
    </div>
  );
}

export default LeaderInfo;
