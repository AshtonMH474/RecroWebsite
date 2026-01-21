import PartnerCard from "./PartnerCard";
import Heading from "./Heading";
import Buttons from "./Buttons";

export default function PriorityPartners({ partnersRes, ...block }) {
  const partners = partnersRes.partnerConnection.edges.map((e) => e.node);
  const priority = partners.filter((partner) => partner.priority === true);

  // Duplicate for seamless infinite loop
  const loopPartners = [...priority, ...priority];

  return (
    <div className="relative bg-black w-full overflow-hidden mt-16 mb-16 h-[400px]">
      
      {/* Section Heading */}
      <Heading block={block} />

      {/* Left Fade */}
      <div className="absolute inset-y-0 left-0 w-10 sm:w-24 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />

      {/* Right Fade */}
      <div className="absolute inset-y-0 right-0 w-10 sm:w-24 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />

      {/* Marquee Wrapper */}
      <div className="relative w-full flex items-center overflow-hidden">
        <div className="marquee flex gap-6">
          {loopPartners.map((partner, index) => (
            <PartnerCard key={index} partner={partner} />
          ))}
        </div>
      </div>

      {/* Buttons */}
      <Buttons buttons={block.buttons} />
    </div>
  );
}








