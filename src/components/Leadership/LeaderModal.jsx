import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField } from "tinacms/dist/react";
import Modal from "@/components/common/Modal";

function LeaderModal({ leader, onClose }) {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="p-6 md:p-8 flex flex-col">
        {/* Leader Header */}
        <div className="mb-4 text-center">
          <h2
            data-tina-field={tinaField(leader, "name")}
            className="text-2xl md:text-3xl font-bold text-white"
          >
            {leader.name}
          </h2>
          <p
            data-tina-field={tinaField(leader, "title")}
            className="text-sm md:text-base text-white/70"
          >
            {leader.title}
          </p>
        </div>

        {/* Leader Bio */}
        <div
          data-tina-field={tinaField(leader, "bio")}
          className="text-white/90 text-sm md:text-base leading-relaxed space-y-4 text-center"
        >
          <TinaMarkdown
            content={leader.bio || leader.quote}
            components={{
              p: ({ children }) => <p className="mb-2">{children}</p>,
            }}
          />
        </div>
      </div>
    </Modal>
  );
}

export default LeaderModal; 