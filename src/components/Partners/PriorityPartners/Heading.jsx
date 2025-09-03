import { tinaField } from "tinacms/dist/react";

export default function Heading({ block }) {
  return (
    <div className="flex flex-col items-center mt-12 pb-8">
      {block.partners_heading && (
        <h2
          data-tina-field={tinaField(block, "partners_heading")}
          className="font-bold text-[32px] md:text-[40px] text-white text-center px-4"
        >
          {block.partners_heading}
        </h2>
      )}
      <div
        data-tina-field={tinaField(block, "underline_width")}
        style={{ width: block.underline_width }}
        className="rounded-[12px] h-1 bg-primary mt-2"
      />
    </div>
  );
}
