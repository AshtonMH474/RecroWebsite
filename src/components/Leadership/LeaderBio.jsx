// components/Leadership/LeaderBio.jsx
// import { tinaField } from "tinacms/dist/react";
// import { TinaMarkdown } from "tinacms/dist/rich-text";

// function LeaderBio({ leader,isVisable }) {

//   return (
//     <div
//       data-tina-field={tinaField(leader, "bio")}
//       className={`absolute inset-0 z-20 
//       ${isVisable ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300 
//       flex items-start md:items-center justify-center px-4 pt-6 text-center overflow-auto`}
//     >
//       <TinaMarkdown
//         content={leader.bio}
//         components={{
//           p: ({ children }) => <p>{children}</p>,
//         }}
//       />
//     </div>
//   );
// }

// export default LeaderBio;

import { useEffect, useRef, useState } from "react";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

function LeaderBio({ leader, isVisable }) {
  const containerRef = useRef(null);
  const [overflowing, setOverflowing] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const el = containerRef.current;
      // check if scroll height exceeds container height
      setOverflowing(el.scrollHeight > el.clientHeight);
    }
  }, [leader.bio, isVisable]);

  return (
    <div
      ref={containerRef}
      data-tina-field={tinaField(leader, "bio")}
      className={`absolute inset-0 z-20 
      ${isVisable ? "opacity-100" : "opacity-0 group-hover:opacity-100"} 
      transition-opacity duration-300 flex justify-center px-4 pt-6 text-center overflow-auto 
      ${overflowing ? "items-start pb-4" : "md:items-center items-start"}`}
    >
      <TinaMarkdown
        content={leader.bio}
        components={{
          p: ({ children }) => <p>{children}</p>,
        }}
      />
    </div>
  );
}

export default LeaderBio;

