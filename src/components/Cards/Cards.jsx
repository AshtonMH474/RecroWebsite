import { useState, useEffect, useRef, memo } from 'react';
import Card from './Card';
import { tinaField } from 'tinacms/dist/react';
import CardModal from './CardModal';

function Cards(props) {
  const expertiseItems = props.cards || [];
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const openCard = (index) => setExpandedCardIndex(index);
  const closeCard = () => setExpandedCardIndex(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = containerRef.current?.querySelectorAll(
      '.card, .heading-animate, .underline-animate'
    );
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [props.cards]);

  return (
    <>
      <section id={props.cards_id} className="relative pb-16 mb-50">
        <div
          ref={containerRef}
          className="overflow-hidden z-30 py-12 pt-12 max-w-[1000px] mx-auto rounded-md"
        >
          <h2
            data-tina-field={tinaField(props, 'cards_heading')}
            className="heading-animate font-bold text-[32px] px-4 md:text-[40px] text-white text-center"
          >
            {props.cards_heading}
          </h2>

          <div
            className="underline-animate rounded-[12px] h-1 bg-primary mx-auto mt-2 origin-left"
            data-tina-field={tinaField(props, 'underline_width')}
            style={{ width: props.underline_width }}
          />

          <div className="pt-12 flex flex-wrap justify-center gap-x-6 gap-y-12">
            {expertiseItems.map((ex, i) => (
              <div
                key={`${ex._id || ex.title}-${i}`}
                className="card"
                style={{ '--card-index': i }}
              >
                <Card
                  ex={ex}
                  isExpanded={expandedCardIndex === i}
                  onExpand={() => openCard(i)}
                  onClose={closeCard}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {expandedCardIndex !== null &&
        expertiseItems[expandedCardIndex]?.content?.children?.length &&
        expertiseItems[expandedCardIndex]?.allContentLink &&
        expertiseItems[expandedCardIndex]?.contentIcon && (
          <CardModal ex={expertiseItems[expandedCardIndex]} onClose={closeCard} />
        )}
    </>
  );
}

// Memoize to prevent re-renders when parent updates but props don't change
export default memo(Cards);
