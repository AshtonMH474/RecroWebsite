

import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import IconRenderer from "@/components/utils/IconRenderer";



const Card = ({ ex, onExpand }) => {
  console.log(ex.allContentLink)
  return (
    <>
      <div
        className={`border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[300px] h-[260px] px-4 py-6 ${ex.content?.children?.length && ex.allContentLink && ex.contentIcon  ? "cursor-pointer" : ""}`}
        onClick={onExpand}
      >
        <div className="flex items-center mb-3 gap-x-3">
          {ex.icon && (
            <div
              data-tina-field={tinaField(ex, "icon")}
              className="bg-primary rounded-[10px] h-16 w-16 flex-shrink-0 flex items-center justify-center"
            >
              <IconRenderer size="50px" color="#FAF3E0" iconName={ex.icon} />
            </div>
          )}
          {ex.title && (
            <h3
              data-tina-field={tinaField(ex, "title")}
              className="text-[20px] font-bold text-white leading-tight flex-1"
            >
              {ex.title}
            </h3>
          )}
        </div>

       {ex.description && (ex.allContentLink && ex.contentIcon)  && ( <div data-tina-field={tinaField(ex, "description")}>
          <TinaMarkdown
            content={ex.description}
            components={{
              p: ({ children }) => (
                <p className={`text-[#C2C2BC] expertiseDes text-ellipsis text-[16px]`}>
                  {children}
                </p>
              ),
            }}
          />
        </div>)}

        {ex.description && (ex.allContentLink == null || ex.contentIcon == null)  && ( <div data-tina-field={tinaField(ex, "description")}>
          <TinaMarkdown
            content={ex.description}
            components={{
              p: ({ children }) => (
                <p className={`text-[#C2C2BC] noContentDes text-ellipsis text-[16px]`}>
                  {children}
                </p>
              ),
            }}
          />
        </div>)}

        {ex.allContentLink && ex.contentIcon && (<div className="mt-3 primary-color flex items-center gap-x-1 text-[14px]">
          <div data-tina-field={tinaField(ex, "allContentLink")}>
            {ex.allContentLink}
          </div>
          <div data-tina-field={tinaField(ex, "contentIcon")}>
            <IconRenderer color={"#B55914"} size={"14px"} iconName={ex.contentIcon} />
          </div>
        </div>)}
      </div>

    
    </>
  );
};

export default Card;



