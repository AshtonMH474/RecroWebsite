import { tinaField } from "tinacms/dist/react";

export default function PartnerCard({ partner }) {
    const Wrapper = partner.link ? "a" : "div";
  return (
    <Wrapper
      {...(partner.link ? { href: partner.link, target: "_blank" } : {})}
      className="flex-1 sm:basis-[45%] lg:basis-[30%] w-[300px] min-w-[300px] max-w-[300px]"
    >
      <div
        className="flex items-center justify-center gap-x-2 border border-white/15 
                   rounded-[8px] bg-[#1A1A1E] w-full h-[120px] px-4 py-6"
        data-tina-field={tinaField(partner, "logo")}
      >
        <img
          className="object-contain h-auto max-h-[100px] w-auto"
          src={partner.logo}
          alt={partner.title || "partner"}
        />
        {partner.needsTitle && partner.title && (
          <h1 className="font-bold text-[26px] text-center text-white">
            {partner.title}
          </h1>
        )}
      </div>
    </Wrapper>
  );
}
