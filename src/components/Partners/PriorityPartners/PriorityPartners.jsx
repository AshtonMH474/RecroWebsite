
import PartnerCard from "./PartnerCard";
import Heading from "./Heading";
import Buttons from "./Buttons";

export default function PriorityPartners({ partnersRes, ...block }) {
  const partners = partnersRes.partnerConnection.edges.map((e) => e.node);
  const priority = partners.filter((partner) => partner.priority === true);

  // Duplicate array for seamless loop
  const loopPartners = [...priority, ...priority];

  return (
    <div className="relative bg-black overflow-hidden w-full mb-16 mt-16 h-[400px]">
  <Heading block={block} />

  {/* Fade overlay on left */}
  <div className="absolute left-0 top-0 h-full w-10 sm:w-24 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />

  {/* Fade overlay on right */}
  <div className="absolute right-0 top-0 h-full w-10 sm:w-24  bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />

  <div className="relative w-full flex items-center overflow-hidden">
    <div className="marquee flex gap-6">
      {loopPartners.map((partner, i) => (
        <PartnerCard key={i} partner={partner} />
      ))}
    </div>
  </div>

  <Buttons buttons={block.buttons} />
</div>
  );
}







