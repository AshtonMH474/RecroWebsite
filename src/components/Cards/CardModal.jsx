import IconRenderer from "@/components/utils/IconRenderer";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Modal from "@/components/common/Modal";

function CardModal({ ex, onClose }) {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="modal-mobile-landscape p-4">
        {/* Header */}
        <div className="flex items-start mb-4">
          <div className="flex items-center flex-1">
            <div
              data-tina-field={tinaField(ex, "icon")}
              className="bg-primary rounded-[10px] h-16 w-16 min-w-16 flex items-center justify-center"
            >
              <IconRenderer size={"50px"} color={"#FAF3E0"} iconName={ex.icon} />
            </div>
            <h3
              data-tina-field={tinaField(ex, "title")}
              className="pl-3 text-[24px] font-bold text-white"
            >
              {ex.title}
            </h3>
          </div>
        </div>

        {/* Description */}
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

        {/* Content Scrollable */}
        <div
          data-tina-field={tinaField(ex, "content")}
          className="overflow-y-auto mt-4 pr-2"
          style={{ maxHeight: "calc(80vh - 180px)" }}
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
    </Modal>
  );
}

export default CardModal;
