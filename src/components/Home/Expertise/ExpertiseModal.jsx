import { IconRenderer } from "@/components/utils/IconRenderer";
import { useModal } from "@/context/Modal";
import { useEffect } from "react";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

function ExpertiseModal({ex}) {
    console.log(ex)

    const {closeModal} = useModal()

  const modalStyle = {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  };
 useEffect(() => {
    

    // Also prevent touchmove on mobile
    const preventScroll = e => e.preventDefault();

    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('wheel', preventScroll, { passive: false });

    return () => {

      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('wheel', preventScroll);
    };
  }, []);
 return (
  <div style={modalStyle}>
    {/* Overlay layer that fades the background */}
    <div 
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 999,
      }}
      onClick={closeModal}  // clicking outside modal closes it
    />
    
    {/* Modal content on top */}
    <div 
      className="border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[50%] h-[50%] rounded-lg p-4 "
      style={{ zIndex: 1000, position: 'relative' }}
    >
      <div className="flex items-center">
            <div data-tina-field={tinaField(ex, "icon")} className="bg-primary rounded-[10px] h-16 w-16 flex items-center justify-center">
                <IconRenderer size={'50px'} color={'#FAF3E0'} iconName={ex.icon}/>
            </div>
            <h3 data-tina-field={tinaField(ex, "title")} className="pl-3 text-[24px] font-bold">{ex.title}</h3>
      </div>
    <div data-tina-field={tinaField(ex, "description")}>
              <TinaMarkdown
                content={ex.description}
                components={{
                  p: ({ children }) => (
                    <p className="text-[#C2C2BC] expertiseDes text-ellipsis text-[16px]">{children}</p>
                  ),
                }}
              />
    </div>
    </div>
  </div>
);
}

export default ExpertiseModal;
