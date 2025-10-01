import { useRef, useState, useEffect } from "react";
import { tinaField } from "tinacms/dist/react";
import { parseJobDescription, stripHTML } from "../utils/HtmlRemover";
import { IoLocationOutline } from "react-icons/io5";

function JobCard({ props, job, onExpand }) {
  const buttonRef = useRef(null);
  const [shouldTruncate, setShouldTruncate] = useState(false);

  useEffect(() => {
    if (buttonRef.current) {
      const buttonBottom = buttonRef.current.getBoundingClientRect().bottom;
      const cardBottom = buttonRef.current.closest(".job-card")?.getBoundingClientRect().bottom;

      if (cardBottom && buttonBottom > cardBottom - 10) {
        setShouldTruncate(true);
      }
    }
  }, [job]); // Re-check if the job changes

  return (
    <div
      onClick={onExpand}
      className="job-card border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[300px] h-[260px] px-4 py-6"
    >
      <div>
        <h3 className="text-[24px] font-bold">{job.title}</h3>
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
      <div>
        <div className={` ${
                shouldTruncate ? "pb-3" : ""
            }`}>
            <p
            className={`text-[#C2C2BC] text-[12px] pb-3 ${
                shouldTruncate ? "truncate-multiline" : ""
            }`}
            >
            {parseJobDescription(stripHTML(job.description))[1]?.content}
            </p>
        </div>
        {props?.buttonType === "button" && (
          <button
            ref={buttonRef}
            data-tina-field={tinaField(props, "buttonLabel")}
            className="bg-primary capitalize cursor-pointer px-4 h-[35px] w-auto rounded-[8px] hover:opacity-80 text-white"
          >
            {props.buttonLabel}
          </button>
        )}
        {props?.buttonType === "border" && (
          <button
            ref={buttonRef}
            data-tina-field={tinaField(props, "buttonLabel")}
            className="px-4 capitalize h-[35px] w-auto border primary-border rounded-[8px] hover:text-white/80 transition-colors duration-300"
          >
            {props.buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
}

export default JobCard;
