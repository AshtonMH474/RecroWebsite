

import { memo } from "react";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { IconRenderer } from "@/components/utils/IconRenderer";
import ExpertiseModal from "./ExpertiseModal";
import { useState } from "react";
import { useModal } from "@/context/Modal";

// const ExpertiseCard = memo(({ ex }) => {
    
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const openModal = () => setIsModalOpen(true);
//      const closeModal = () => setIsModalOpen(false);   
    

//   return (
//     <>
//     <div className="border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[300px] h-[260px] px-4 py-6">
//       <div className="flex items-center mb-4">
//         <div
//           data-tina-field={tinaField(ex, "icon")}
//           className="bg-primary rounded-[10px] h-16 w-16 flex items-center justify-center"
//         >
//           <IconRenderer size={'50px'} color={'#FAF3E0'} iconName={ex.icon} />
//         </div>
//         <h3
//           data-tina-field={tinaField(ex, "title")}
//           className="pl-3 text-[24px] font-bold"
//         >
//           {ex.title}
//         </h3>
//       </div>

//       <div data-tina-field={tinaField(ex, "description")}>
//         <TinaMarkdown
//           content={ex.description}
//           components={{
//             p: ({ children }) => (
//               <p className="text-[#C2C2BC] expertiseDes text-ellipsis text-[16px]">{children}</p>
//             ),
//           }}
//         />
//       </div>

//       <div onClick={openModal} className="mt-3 primary-color flex items-center gap-x-1 text-[14px]">
//         <div data-tina-field={tinaField(ex, "allContentLink")}>{ex.allContentLink}</div>
//         <div  data-tina-field={tinaField(ex, "contentIcon")}><IconRenderer color={'#B55914'} size={'14px'} iconName={ex.contentIcon} /></div>
        
//       </div>
      
//     </div>
//            {isModalOpen && <ExpertiseModal ex={ex} onClose={closeModal} />}
//     </>
//   );
// });

// export default ExpertiseCard;


// const ExpertiseCard = memo(({ ex }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   return (
//     <>
//       <div className="border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[300px] h-[260px] px-4 py-6">
//         <div className="flex items-center mb-4">
//           <div
//             data-tina-field={tinaField(ex, "icon")}
//             className="bg-primary rounded-[10px] h-16 w-16 flex items-center justify-center"
//           >
//             <IconRenderer size={'50px'} color={'#FAF3E0'} iconName={ex.icon} />
//           </div>
//           <h3
//             data-tina-field={tinaField(ex, "title")}
//             className="pl-3 text-[24px] font-bold"
//           >
//             {ex.title}
//           </h3>
//         </div>

//         <div data-tina-field={tinaField(ex, "description")}>
//           <TinaMarkdown
//             content={ex.description}
//             components={{
//               p: ({ children }) => (
//                 <p className="text-[#C2C2BC] expertiseDes text-ellipsis text-[16px]">{children}</p>
//               ),
//             }}
//           />
//         </div>

//         <div onClick={openModal} className="mt-3 primary-color flex items-center gap-x-1 text-[14px] cursor-pointer">
//           <div data-tina-field={tinaField(ex, "allContentLink")}>{ex.allContentLink}</div>
//           <div data-tina-field={tinaField(ex, "contentIcon")}>
//             <IconRenderer color={'#B55914'} size={'14px'} iconName={ex.contentIcon} />
//           </div>
//         </div>
//       </div>

//       {isModalOpen && <ExpertiseModal ex={ex} onClose={closeModal} />}
//     </>
//   );
// });

// export default ExpertiseCard;
// import { tinaField, TinaMarkdown } from "tinacms/dist/react";
// import IconRenderer from "../IconRenderer";

const ExpertiseCard = ({ ex, isExpanded, onExpand, onClose }) => {
  return (
    <>
      <div
        className="border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[300px] h-[260px] px-4 py-6 cursor-pointer"
        onClick={onExpand}
      >
        <div className="flex items-center mb-4">
          <div
            data-tina-field={tinaField(ex, "icon")}
            className="bg-primary rounded-[10px] h-16 w-16 flex items-center justify-center"
          >
            <IconRenderer size={"50px"} color={"#FAF3E0"} iconName={ex.icon} />
          </div>
          <h3
            data-tina-field={tinaField(ex, "title")}
            className="pl-3 text-[24px] font-bold"
          >
            {ex.title}
          </h3>
        </div>

        <div data-tina-field={tinaField(ex, "description")}>
          <TinaMarkdown
            content={ex.description}
            components={{
              p: ({ children }) => (
                <p className="text-[#C2C2BC] expertiseDes text-ellipsis text-[16px]">
                  {children}
                </p>
              ),
            }}
          />
        </div>

        <div className="mt-3 primary-color flex items-center gap-x-1 text-[14px]">
          <div data-tina-field={tinaField(ex, "allContentLink")}>
            {ex.allContentLink}
          </div>
          <div data-tina-field={tinaField(ex, "contentIcon")}>
            <IconRenderer color={"#B55914"} size={"14px"} iconName={ex.contentIcon} />
          </div>
        </div>
      </div>

      {/* {isExpanded && (
        <ExpertiseModal ex={ex} onClose={onClose}/>
      )} */}
    </>
  );
};

export default ExpertiseCard;


// const ExpertiseCard = memo(({ ex }) => {
//   const { setModalContent, closeModal } = useModal();

//   const openModal = () => {
//     setModalContent(
//       <ExpertiseModal
//         ex={ex}
//         onClose={() => {
//           closeModal();
//         }}
//       />
//     );
//   };

//   return (
//     <div className="border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[300px] h-[260px] px-4 py-6">
//       <div className="flex items-center mb-4">
//         <div
//           data-tina-field={tinaField(ex, 'icon')}
//           className="bg-primary rounded-[10px] h-16 w-16 flex items-center justify-center"
//         >
//           <IconRenderer size={'50px'} color={'#FAF3E0'} iconName={ex.icon} />
//         </div>
//         <h3
//           data-tina-field={tinaField(ex, 'title')}
//           className="pl-3 text-[24px] font-bold"
//         >
//           {ex.title}
//         </h3>
//       </div>

//       <div data-tina-field={tinaField(ex, 'description')}>
//         <TinaMarkdown
//           content={ex.description}
//           components={{
//             p: ({ children }) => (
//               <p className="text-[#C2C2BC] expertiseDes text-ellipsis text-[16px]">
//                 {children}
//               </p>
//             ),
//           }}
//         />
//       </div>

//       <div
//         onClick={openModal}
//         className="mt-3 primary-color flex items-center gap-x-1 text-[14px] cursor-pointer"
//       >
//         <div data-tina-field={tinaField(ex, 'allContentLink')}>
//           {ex.allContentLink}
//         </div>
//         <div data-tina-field={tinaField(ex, 'contentIcon')}>
//           <IconRenderer color={'#B55914'} size={'14px'} iconName={ex.contentIcon} />
//         </div>
//       </div>
//     </div>
//   );
// });

// export default ExpertiseCard;
