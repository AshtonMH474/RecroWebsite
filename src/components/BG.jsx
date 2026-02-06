import { useRef, useEffect } from 'react';
import GearIcon from './GearIcon';

function BG() {
  const containerRef = useRef(null);
  const gearsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const gears = gearsRef.current;

    let lastScrollY = window.scrollY;
    let ticking = false;
    let lastUpdateTime = 0;
    const throttleDelay = 16;

    const update = (timestamp) => {
      if (timestamp - lastUpdateTime < throttleDelay) {
        ticking = false;
        return;
      }

      lastUpdateTime = timestamp;
      const scrollY = lastScrollY;
      const rotate = scrollY * 0.12;

      gears.forEach((gear) => {
        if (gear) {
          gear.style.transform = `rotate(${rotate}deg) translateZ(0)`;
        }
      });

      ticking = false;
    };

    const onScroll = () => {
      lastScrollY = window.scrollY;

      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    gears.forEach((gear) => {
      if (gear) {
        gear.style.willChange = 'transform';
      }
    });

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      gears.forEach((gear) => {
        if (gear) {
          gear.style.willChange = 'auto';
        }
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="background overflow-hidden Home flex flex-col items-end">
      {[1, 2, 3, 4, 5].map((n, i) => (
        <div
          key={n}
          ref={(el) => (gearsRef.current[i] = el)}
          className={`mr-10 gear${n} gears`}
          style={{ transformOrigin: 'center center' }}
        >
          <GearIcon
            className={
              n === 1
                ? 'h-80 w-80 text-black'
                : n === 2
                  ? 'h-50 w-50'
                  : n === 3
                    ? 'h-65 w-65 text-black'
                    : n === 4
                      ? 'h-80 w-80'
                      : 'h-105 w-105 text-black'
            }
          />
        </div>
      ))}
    </div>
  );
}

export default BG;
