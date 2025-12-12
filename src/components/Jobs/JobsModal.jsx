import { IoLocationOutline } from "react-icons/io5";
import { stripInlineStylesBrowser } from "../utils/HtmlRemover";
import { RiShareBoxLine } from "react-icons/ri";
import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";

function JobsModal({ onClose, job }) {
  const jobApplyUrlId = job.listingUrl.split("/")[4];
  const jobDesHtml = stripInlineStylesBrowser(job.description);

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="modal-mobile-landscape p-4 pt-12  flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 pb-3">
          <h3 className="text-[24px] font-bold text-white">{job.title}</h3>

          {/* Job Info Row */}
          <div className="flex flex-col lg:flex-row gap-x-4 pb-2 mt-2">
            <h4 className="text-[#C2C2BC] text-[18px]">
              Clearance: {job.clearanceRequired}
            </h4>

            <h4 className="text-[#C2C2BC] text-[18px] flex items-center gap-x-1">
              <IoLocationOutline className="text-[#14B5B5]" />
              {job.location}
            </h4>

            {job.salaryRangeMax > 0 && job.salaryRangeMin > 0 && (
              <h4 className="text-[#C2C2BC] text-[18px]">
                <span className="text-[#27AE60]">$</span>
                {job.salaryRangeMin} - <span className="text-[#27AE60]">$</span>
                {job.salaryRangeMax}
              </h4>
            )}
          </div>

          {/* Apply Button */}
          <div className="flex items-center gap-x-2 mt-2">
            <a
              href={`https://ats.recro.com/jobapplication/${jobApplyUrlId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" className="flex justify-center gap-x-1 items-center h-[35px]">
                Apply <RiShareBoxLine className="text-[18px]" />
              </Button>
            </a>
          </div>
        </div>

        {/* Scrollable Job Description */}
        <div className="flex-1 overflow-y-auto mt-4 pr-2 text-[#C2C2BC] text-[14px]">
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: jobDesHtml }}
          />
        </div>
      </div>
    </Modal>
  );
}

export default JobsModal;
