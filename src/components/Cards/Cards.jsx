

import {  useRef, useState, useEffect, memo } from "react";
import Card from "./Card";
import { tinaField } from "tinacms/dist/react";
import CardModal from "./CardModal";


function Cards(props) {

  const expertiseItems = props.cards || [];
  const sectionRef = useRef(null);
  const [sectionHeight, setSectionHeight] = useState(0);
  const [rows, setRows] = useState(1);
  const [short, setShort] = useState(false);
  const [tall, setTall] = useState(false);

  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const openCard = (index) => setExpandedCardIndex(index);
  const closeCard = () => setExpandedCardIndex(null);

  // Track scroll progress for smooth scale animation
  const [scrollProgress, setScrollProgress] = useState(0);
  const cardsRef = useRef(null);


  // Initial layout setup only (no resize listener)
useEffect(() => {
  const updateRows = () => {
    const screenWidth = window.innerWidth;

    const cardsPerRow = screenWidth < 640 ? 1 : screenWidth < 948 ? 2 : 3;
    const newRows = Math.ceil(expertiseItems.length / cardsPerRow);

    setRows(newRows);
  };

  updateRows(); // Initial
  window.addEventListener("resize", updateRows);

  return () => window.removeEventListener("resize", updateRows);
}, [expertiseItems.length]);

// 2️⃣ When rows change, recalculate section height and flags
useEffect(() => {
  const screenHeight = window.innerHeight;

  const isShort = screenHeight <= 600;
  const isTall = screenHeight >= 1000;

  setShort(isShort);
  setTall(isTall);


  const rowHeightPx = 0.8 * screenHeight;
  const headingHeightPx = 0.5 * screenHeight;

  const calculatedHeight =
    (rows * rowHeightPx + headingHeightPx) *
    (isShort ? 2 : 1) ;

  setSectionHeight(calculatedHeight);
}, [rows]);

// Track scroll position to animate cards growing as you scroll
useEffect(() => {
  const handleScroll = () => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionTop = rect.top;
    const screenWidth = window.innerWidth;

    // SMART CALCULATION: Determine cards per row based on breakpoints
    const cardsPerRow = screenWidth < 640 ? 1 : screenWidth < 948 ? 2 : 3;
    // 1 card/row (mobile) = slowest, 2 cards/row (tablet) = medium, 3 cards/row (desktop) = fastest

    // SMART CALCULATION: Shorter screens need longer animations to prevent jarring effect
    const isShortScreen = windowHeight < 700;
    const heightMultiplier = isShortScreen ? 1.4 : 1.0;
    // Short screens (like phones in landscape) get 40% longer animation

    // EXPLANATION: scrollStart = when animation begins
    // Single column (mobile) starts later to give user time to see the section
    const scrollStart = cardsPerRow === 1
      ? windowHeight * 0.7  // Mobile: starts when section is 70% down viewport
      : cardsPerRow === 2
      ? windowHeight * 0.6  // Tablet: starts when section is 60% down
      : windowHeight * 0.5; // Desktop: starts when section is 50% down

    // SMART CALCULATION: scrollRange based on cards per row + screen height
    // Base range proportional to section height, then adjusted by cards/row and screen height
    const baseRange = sectionHeight * 0.5; // Start with 50% of section height

    // More cards per row = faster animation (less range needed)
    // Fewer cards per row = slower animation (more range needed)
    const cardsMultiplier = cardsPerRow === 1 ? 1.5 : cardsPerRow === 2 ? 1.0 : 1.0;
    // Mobile (1 card): 80% longer | Tablet (2 cards): 40% longer | Desktop (3 cards): baseline

    const scrollRange = baseRange * cardsMultiplier * heightMultiplier;
    // RESULT: Mobile on short screen = 2.52x longer than desktop on tall screen!

    let progress = 0;
    if (sectionTop < scrollStart) {
      // Calculate progress from 0 (not started) to 1 (fully animated)
      progress = Math.min(1, (scrollStart - sectionTop) / scrollRange);
    }

    setScrollProgress(progress);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  return () => window.removeEventListener('scroll', handleScroll);
}, []); // Re-run when section height changes
  
  // Calculate styles based on scroll progress (0 to 1)
  // EXPLANATION: These convert scrollProgress into visual properties

  // Detect mobile for faster card animation
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
  const isMobileView = screenWidth < 640;

  // Heading fades in gradually - matches card timing now
  const headingOpacity = Math.min(1, scrollProgress * 1.3);

  // Cards scale with different speeds based on device
  // Mobile: Multiply by 1.4 so cards reach full size at 71% scroll progress (earlier!)
  // Desktop: Normal speed, reaches full size at 100% scroll progress
  const scaleMultiplier = isMobileView ? 1.4 : 1.0;
  const cardsScale = Math.max(0.2, Math.min(1, scrollProgress * scaleMultiplier));

  // Cards fade in slightly faster than they scale
  const cardsOpacity = Math.min(1, scrollProgress * 1.2);

  return (
    <>
      <section
        id={props.cards_id}
        ref={sectionRef}
        style={{ height: `${sectionHeight}px` }}
        className="scrollCenter relative pb-16"
      >
        <div
          className=" overflow-hidden z-30 py-12 max-w-[1000px] mx-auto rounded-md"
          style={{
            position: "sticky",
            paddingTop: short ? "5rem" : "3rem",
            top: tall ? "200px" : "80px",
          }}
        >
          <h2
            data-tina-field={tinaField(props, "cards_heading")}
            className="font-bold text-[32px] px-4 md:text-[40px] text-white text-center transition-opacity duration-300"
            style={{ opacity: headingOpacity }}
          >
            {props.cards_heading}
          </h2>

          <div
            className="rounded-[12px] h-1 bg-primary mx-auto mt-2 transition-opacity duration-300"
            data-tina-field={tinaField(props,"underline_width")}
            style={{
              width: props.underline_width,
              opacity: headingOpacity
            }}
          />

          <div
            ref={cardsRef}
            id="target"
            className="will-change-transform pt-12 flex flex-wrap justify-center gap-x-6 gap-y-12"
            style={{
              opacity: cardsOpacity,
              transform: `scale(${cardsScale})`,
              transition: 'opacity 0.1s linear, transform 0.1s linear'
            }}
          >
            {expertiseItems.map((ex, i) => (
              <Card
                key={ex._id || ex.title || i}
                ex={ex}
                isExpanded={expandedCardIndex === i}
                onExpand={() => openCard(i)}
                onClose={closeCard}
              />
            ))}
          </div>
        </div>
      </section>

      {expandedCardIndex !== null && expertiseItems[expandedCardIndex]?.content?.children?.length && expertiseItems[expandedCardIndex]?.allContentLink && expertiseItems[expandedCardIndex]?.contentIcon && (
        <CardModal
          ex={expertiseItems[expandedCardIndex]}
          onClose={closeCard}
        />
      )}
    </>
  );
};

// Memoize to prevent re-renders when parent updates but props don't change
export default memo(Cards);





























