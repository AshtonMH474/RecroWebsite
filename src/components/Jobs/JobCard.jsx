import { tinaField } from 'tinacms/dist/react';
import { parseJobDescription, stripHTML } from '../utils/HtmlRemover';
import { IoLocationOutline } from 'react-icons/io5';

function JobCard({ props, job, onExpand }) {
  return (
    <div
      onClick={onExpand}
      className="job-card border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[300px] h-[260px] px-4 py-6 flex flex-col"
    >
      {/* Header section - takes only the space it needs */}
      <div className="shrink-0">
        <h3 className="text-[20px] font-bold">{job.title}</h3>
        <h4 className="text-[#C2C2BC] text-[16px] flex items-center gap-x-1">
          <IoLocationOutline className="text-[#14B5B5]" />
          {job.location}
        </h4>
        {job.salaryRangeMax > 0 && job.salaryRangeMin > 0 && (
          <h4 className="text-[#C2C2BC] text-[16px]">
            <span className="text-[#27AE60]">$</span>
            {Number(job.salaryRangeMin).toLocaleString()} -{' '}
            <span className="text-[#27AE60]">$</span>
            {Number(job.salaryRangeMax).toLocaleString()}
          </h4>
        )}
      </div>

      {/* Description - fills remaining space but truncates with ellipsis */}
      <p className="text-[#C2C2BC] text-[12px] mt-2 job-card-description flex-1 min-h-0">
        {parseJobDescription(stripHTML(job.description))[1]?.content}
      </p>

      {/* Button - always at bottom, fixed size */}
      <div className="shrink-0 mt-3">
        {props?.buttonType === 'button' && (
          <button
            data-tina-field={tinaField(props, 'buttonLabel')}
            className="bg-primary capitalize cursor-pointer px-4 h-[35px] w-auto rounded-[8px] hover:opacity-80 text-white"
          >
            {props.buttonLabel}
          </button>
        )}
        {props?.buttonType === 'border' && (
          <button
            data-tina-field={tinaField(props, 'buttonLabel')}
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
