
import { tinaField } from "tinacms/dist/react";
import SolutionCard from "./SolutionCard";
import { useEffect, useState, memo } from "react";
import { useScrollCardAnimation } from "@/hooks/useScrollCardAnimation";

function SolutionsGrid({ solutionRes, ...block }) {
  const solutions = solutionRes.solutionConnection.edges.map((e) => e.node);
  const [sectionHeight, setSectionHeight] = useState(0);
  const [rows, setRows] = useState(1);
  const [short, setShort] = useState(false);
  const [tall, setTall] = useState(false);

  const { sectionRef, stickyContainerRef, headingOpacity, getCardAnimation } =
    useScrollCardAnimation(solutions.length, tall);
    
  useEffect(() => {
    const updateRows = () => {
      const screenWidth = window.innerWidth;
      const cardsPerRow = screenWidth < 640 ? 1 : screenWidth < 948 ? 2 : 3;
      const newRows = Math.ceil(solutions.length / cardsPerRow);
      setRows(newRows);
    };

    updateRows();
    window.addEventListener("resize", updateRows);
    return () => window.removeEventListener("resize", updateRows);
  }, [solutions.length]);

  // Calculate section height based on rows and screen height
  useEffect(() => {
    const screenHeight = window.innerHeight;
    const isShort = screenHeight <= 600;
    const isTall = screenHeight >= 1000;

    setShort(isShort);
    setTall(isTall);

    const rowHeightPx = 0.5 * screenHeight;
    const calculatedHeight = rows * rowHeightPx * (isShort ? 2 : 1);
    setSectionHeight(calculatedHeight);
  }, [rows]);

  return (
    <>
      <section
        id={block.solutions_id}
        ref={sectionRef}
        style={{ height: `${sectionHeight}px` }}
        className="scrollCenter pb-16 mb-50 relative"
      >
        <div
          ref={stickyContainerRef}
          style={{
            position: "sticky",
            paddingTop: short ? "5rem" : "3rem",
            top: tall ? "200px" : "80px",
          }}
          className=" overflow-hidden z-30 py-12 max-w-[1000px] mx-auto rounded-md"
        >
          <h2
            style={{ opacity: headingOpacity }}
            data-tina-field={tinaField(block, "solutions_heading")}
            className="font-bold px-4 text-[32px] md:text-[40px] text-white text-center transition-opacity duration-700 ease-out"
          >
            {block.solutions_heading}
          </h2>
          <div
            data-tina-field={tinaField(block, "underline_width")}
            style={{
              opacity: headingOpacity,
              width: block.underline_width,
            }}
            className="rounded-[12px] h-1 bg-primary mx-auto mt-2 transition-opacity duration-700 ease-out"
          />
          <div className="pt-12 flex flex-wrap justify-center gap-x-6 gap-y-12">
            {solutions.map((card, i) => {
              const cardAnimation = getCardAnimation(i);
              return (
                <div
                  key={card._id || card.title || i}
                  className="will-change-transform"
                  style={cardAnimation}
                >
                  <SolutionCard card={card} props={block} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(SolutionsGrid);
