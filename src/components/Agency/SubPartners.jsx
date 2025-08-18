import { useEffect, useRef } from "react";
import { tinaField } from "tinacms/dist/react";

export default function SubPartners({ subs }) {
  const cardWidth = 332;
  const visibleCards = 3;
  const speed = 1;
  const containerRef = useRef(null);
  const offsetRef = useRef(0);

  const loopedSubs = Array.from({ length: 4 }, () => subs).flat();
  const totalStripWidth = subs.length * cardWidth;

  useEffect(() => {
    let frame;

    const step = () => {
      if (!containerRef.current) return;

      offsetRef.current += speed;

      // Reset smoothly
      if (offsetRef.current >= totalStripWidth) {
        offsetRef.current -= totalStripWidth;
      }

      containerRef.current.style.transform = `translateX(-${offsetRef.current}px)`;

      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [subs.length]);

  return (
    <div className="relative mt-16 flex justify-center">
      <div
        className="relative overflow-hidden"
        style={{ width: visibleCards * cardWidth }}
      >
        <div
          ref={containerRef}
          className="flex gap-8 will-change-transform"
        >
          {loopedSubs.map((sub, idx) => (
            <div
              key={`${idx}-${sub.agency}`}
              className="border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[300px] h-[260px] flex items-center justify-center flex-shrink-0"
              data-tina-field={tinaField(sub, "agency")}
            >
              <img
                src={sub.agency}
                alt={`partner-${idx}`}
                className="h-[150px] w-auto object-contain"
              />
            </div>
          ))}
        </div>

        {/* Fades */}
        <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
}
