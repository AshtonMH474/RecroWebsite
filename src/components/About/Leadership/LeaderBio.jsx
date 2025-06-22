// components/Leadership/LeaderBio.jsx
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

function LeaderBio({ leader }) {

  return (
    <div
      data-tina-field={tinaField(leader, "bio")}
      className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-start justify-center px-4 pt-6 text-center overflow-auto"
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
