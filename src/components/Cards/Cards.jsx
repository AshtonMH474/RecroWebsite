
import { useState, useEffect, memo } from "react";
import Card from "./Card";
import { tinaField } from "tinacms/dist/react";
import CardModal from "./CardModal";
import { useScrollCardAnimation } from "@/hooks/useScrollCardAnimation";

function Cards(props) {
  const expertiseItems = props.cards || [];
  const [sectionHeight, setSectionHeight] = useState(0);
  const [rows, setRows] = useState(1);
  const [short, setShort] = useState(false);
  const [tall, setTall] = useState(false);

  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const openCard = (index) => setExpandedCardIndex(index);
  const closeCard = () => setExpandedCardIndex(null);

  const { sectionRef, stickyContainerRef, headingOpacity, getCardAnimation } =
    useScrollCardAnimation(expertiseItems.length, tall);


  // Calculate rows based on screen width
  useEffect(() => {
    if (!expertiseItems.length) return;
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
    if (!expertiseItems.length) return;
    const screenHeight = window.innerHeight;
    const isShort = screenHeight <= 600;
    const isTall = screenHeight >= 1000;

    setShort(isShort);
    setTall(isTall);

    const rowHeightPx = 0.5 * screenHeight;

    // Calculate total height: rows + heading + extra space, double for short screens
    const calculatedHeight = ((rows * rowHeightPx) * (isShort ? 2 : 1));
    setSectionHeight(calculatedHeight);
  }, [rows]);

  return (
    <>
      <section
        id={props.cards_id}
        ref={sectionRef}
        style={{ height: `${sectionHeight}px` }}
        className="scrollCenter relative pb-16 mb-50"
      >
        <div
          ref={stickyContainerRef}
          className=" overflow-hidden z-30 py-12 max-w-[1000px] mx-auto rounded-md"
          style={{
            position: "sticky",
            paddingTop: short ? "5rem" : "3rem",
            top: tall ? "200px" : "80px",
          }}
        >
            <h2
              data-tina-field={tinaField(props, "cards_heading")}
              className="font-bold text-[32px] px-4 md:text-[40px] text-white text-center transition-opacity duration-700 ease-out"
              style={{ opacity: headingOpacity }}
            >
              {props.cards_heading}
            </h2>

            <div
              className="rounded-[12px] h-1 bg-primary mx-auto mt-2 transition-opacity duration-700 ease-out"
              data-tina-field={tinaField(props,"underline_width")}
              style={{
                width: props.underline_width,
                opacity: headingOpacity
              }}
            />

            <div
              id="target"
              className="pt-12 flex flex-wrap justify-center gap-x-6 gap-y-12"
            >
                {expertiseItems.map((ex, i) => {
                  const cardAnimation = getCardAnimation(i);
                  return (
                    <div
                      key={ex._id || ex.title || i}
                      className="will-change-transform"
                      style={cardAnimation}
                    >
                      <Card
                        ex={ex}
                        isExpanded={expandedCardIndex === i}
                        onExpand={() => openCard(i)}
                        onClose={closeCard}
                      />
                    </div>
                  );
                })}
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

























