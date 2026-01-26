import { tinaField } from 'tinacms/dist/react';
import SolutionCard from './SolutionCard';
import { memo, useEffect, useRef } from 'react';

function SolutionsGrid({ solutionRes, ...block }) {
  const solutions = solutionRes.solutionConnection.edges.map((e) => e.node);
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
  }, [solutions]);

  return (
    <section id={block.solutions_id} className="pb-16 mb-50 relative">
      <div
        ref={containerRef}
        className="overflow-hidden z-30 py-12 pt-12 max-w-[1000px] mx-auto rounded-md"
      >
        <h2
          data-tina-field={tinaField(block, 'solutions_heading')}
          className="heading-animate font-bold px-4 text-[32px] md:text-[40px] text-white text-center"
        >
          {block.solutions_heading}
        </h2>
        <div
          data-tina-field={tinaField(block, 'underline_width')}
          style={{ width: block.underline_width }}
          className="underline-animate rounded-[12px] h-1 bg-primary mx-auto mt-2 origin-left"
        />
        <div className="pt-12 flex flex-wrap justify-center gap-x-6 gap-y-12">
          {solutions.map((card, i) => (
            <div
              key={`${card._id || card.title}-${i}`}
              className="card"
              style={{ '--card-index': i }}
            >
              <SolutionCard card={card} props={block} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(SolutionsGrid);
