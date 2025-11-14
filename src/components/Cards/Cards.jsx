

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


  // Calculate rows based on screen width
  useEffect(() => {
    const updateRows = () => {
      const screenWidth = window.innerWidth;
      const cardsPerRow = screenWidth < 640 ? 1 : screenWidth < 948 ? 2 : 3;
      const newRows = Math.ceil(expertiseItems.length / cardsPerRow);
      setRows(newRows);
    };

    updateRows();
    window.addEventListener("resize", updateRows);
    return () => window.removeEventListener("resize", updateRows);
  }, [expertiseItems.length]);

  // Calculate section height based on rows and screen height
  useEffect(() => {
    const screenHeight = window.innerHeight;
    const isShort = screenHeight <= 600;
    const isTall = screenHeight >= 1000;

    setShort(isShort);
    setTall(isTall);

    const rowHeightPx = 0.5 * screenHeight;
    const headingHeightPx = 0.5 * screenHeight;

    // Calculate total height: rows + heading, double for short screens
    const calculatedHeight = (rows * rowHeightPx + headingHeightPx) * (isShort ? 2 : 1);
    setSectionHeight(calculatedHeight);
  }, [rows]);

  // Simple scroll-based animation
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Animation start: when section enters bottom of viewport
      const animationStart = windowHeight;

      // Animation end: when section is 40% up the viewport (ensures cards reach full size before section ends)
      const animationEnd = windowHeight * 0.2;

      // Calculate how far section top has traveled from start to end
      const scrolled = animationStart - rect.top;
      const scrollRange = animationStart - animationEnd;

      // Progress from 0 to 1
      let progress = scrolled / scrollRange;
      progress = Math.max(0.2, Math.min(1, progress));

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Convert scroll progress to visual properties
  const headingOpacity = Math.min(1, scrollProgress * 0.8);
  const cardsScale = 0.3 + (scrollProgress * 0.7); // Scale from 0.3 to 1.0
  const cardsOpacity = Math.min(1, scrollProgress * 1.3);

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





























