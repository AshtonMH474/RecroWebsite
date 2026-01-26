import { tinaField } from 'tinacms/dist/react';
import SolutionCard from './SolutionCard';
import { useMemo, useSyncExternalStore, memo } from 'react';
import { useScrollCardAnimation } from '@/hooks/useScrollCardAnimation';

// Hook to get window dimensions without causing set-state-in-effect
function useWindowDimensions() {
  const subscribe = (callback) => {
    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  };
  const getSnapshot = () => `${window.innerWidth}x${window.innerHeight}`;
  const getServerSnapshot = () => '1024x768';

  const dimensions = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [width, height] = dimensions.split('x').map(Number);
  return { width, height };
}

function SolutionsGrid({ solutionRes, ...block }) {
  const solutions = solutionRes.solutionConnection.edges.map((e) => e.node);

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  // Derive values from dimensions
  const { short, tall, sectionHeight } = useMemo(() => {
    const cardsPerRow = screenWidth < 640 ? 1 : screenWidth < 948 ? 2 : 3;
    const newRows = Math.ceil(solutions.length / cardsPerRow);
    const isShort = screenHeight <= 600;
    const isTall = screenHeight >= 1000;
    const rowHeightPx = 0.5 * screenHeight;
    const calculatedHeight = newRows * rowHeightPx * (isShort ? 2 : 1);

    return { short: isShort, tall: isTall, sectionHeight: calculatedHeight };
  }, [screenWidth, screenHeight, solutions.length]);

  const { sectionRef, stickyContainerRef, headingOpacity, getCardAnimation } =
    useScrollCardAnimation(solutions.length, tall);

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
            position: 'sticky',
            paddingTop: short ? '5rem' : '3rem',
            top: tall ? '200px' : '80px',
          }}
          className=" overflow-hidden z-30 py-12 max-w-[1000px] mx-auto rounded-md"
        >
          <h2
            style={{ opacity: headingOpacity }}
            data-tina-field={tinaField(block, 'solutions_heading')}
            className="font-bold px-4 text-[32px] md:text-[40px] text-white text-center transition-opacity duration-700 ease-out"
          >
            {block.solutions_heading}
          </h2>
          <div
            data-tina-field={tinaField(block, 'underline_width')}
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
                  key={`${card._id || card.title}-${i}`}
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
