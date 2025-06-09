import { IconRenderer } from "@/components/utils/IconRenderer";
// import { useModal } from "@/context/Modal";
import { useEffect } from "react";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

function ExpertiseModal({ ex, onClose }) {
  

  useEffect(() => {
    const preventScroll = (e) => e.preventDefault();
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('wheel', preventScroll, { passive: false });

    return () => {
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('wheel', preventScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-black/50 z-[1000]">
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 z-[999]"
        onClick={onClose}
      />
      <div
        className="relative border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[50%] h-[50%] p-4 z-[1000] overflow-hidden"
      >
        <div className="flex items-center">
          <div data-tina-field={tinaField(ex, "icon")} className="bg-primary rounded-[10px] h-16 w-16 flex items-center justify-center">
            <IconRenderer size={'50px'} color={'#FAF3E0'} iconName={ex.icon} />
          </div>
          <h3 data-tina-field={tinaField(ex, "title")} className="pl-3 text-[24px] font-bold">{ex.title}</h3>
        </div>

        <div data-tina-field={tinaField(ex, "description")}>
          <TinaMarkdown
            content={ex.description}
            components={{
              p: ({ children }) => (
                <p className="text-[#C2C2BC] text-[16px]">{children}</p>
              ),
            }}
          />
        </div>

        <div
          data-tina-field={tinaField(ex, 'content')}
          className="overflow-y-auto mt-4 pr-2"
          style={{ maxHeight: 'calc(100% - 120px)' }}
        >
          <TinaMarkdown
            content={ex.content}
            components={{
              p: ({ children }) => (
                <p className="text-[#C2C2BC] text-[16px] mb-2">{children}</p>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ExpertiseModal;

// function ExpertiseModal({ ex, onClose }) {
//   useEffect(() => {
//     const preventScroll = (e) => e.preventDefault();
//     window.addEventListener('touchmove', preventScroll, { passive: false });
//     window.addEventListener('wheel', preventScroll, { passive: false });

//     return () => {
//       window.removeEventListener('touchmove', preventScroll);
//       window.removeEventListener('wheel', preventScroll);
//     };
//   }, []);


//   return (
//     <div className="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-black/50" style={{zIndex:'1000'}}>
//       {/* Overlay: click outside closes */}
//       <div
//         className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 z-[999]"
//         onClick={onClose}
//       />
//       <div
//         className="relative border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[50%] h-[50%] p-4 z-[1000] overflow-hidden"
//       >
//         <div className="flex items-center">
//           <div data-tina-field={tinaField(ex, "icon")} className="bg-primary rounded-[10px] h-16 w-16 flex items-center justify-center">
//             <IconRenderer size={'50px'} color={'#FAF3E0'} iconName={ex.icon} />
//           </div>
//           <h3 data-tina-field={tinaField(ex, "title")} className="pl-3 text-[24px] font-bold">{ex.title}</h3>
//         </div>

//         <div data-tina-field={tinaField(ex, "description")}>
//           <TinaMarkdown
//             content={ex.description}
//             components={{
//               p: ({ children }) => (
//                 <p className="text-[#C2C2BC] text-[16px]">{children}</p>
//               ),
//             }}
//           />
//         </div>

//         <div
//           data-tina-field={tinaField(ex, 'content')}
//           className="overflow-y-auto mt-4 pr-2"
//           style={{ maxHeight: 'calc(100% - 120px)' }}
//         >
//           <TinaMarkdown
//             content={ex.content}
//             components={{
//               p: ({ children }) => (
//                 <p className="text-[#C2C2BC] text-[16px] mb-2">{children}</p>
//               ),
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ExpertiseModal