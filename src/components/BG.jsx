import { useRef, useEffect } from 'react';
import GearIcon from './GearIcon';

function BG() {
  const containerRef = useRef(null);
  const gearsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const gears = gearsRef.current;

    // lastScrollY tracks the last scroll position
    let lastScrollY = window.scrollY;

    // ticking prevents multiple requestAnimationFrame calls from stacking
    let ticking = false;

    // ✅ Throttle: minimum time between updates (16ms = ~60fps, 33ms = ~30fps)
    let lastUpdateTime = 0;
    const throttleDelay = 16; // ~60fps max

    // The function that actually applies rotation to each gear
    const update = (timestamp) => {
      // ✅ Throttle: skip update if not enough time has passed
      if (timestamp - lastUpdateTime < throttleDelay) {
        ticking = false;
        return;
      }

      lastUpdateTime = timestamp;
      const scrollY = lastScrollY;
      const rotate = scrollY * 0.12; // rotation factor, controls speed of gear rotation

      // ✅ Use transform with will-change hint for better performance
      // Rotate each gear based on scroll position
      gears.forEach((gear) => {
        if (gear) {
          // Use transform3d for GPU acceleration
          gear.style.transform = `rotate(${rotate}deg) translateZ(0)`;
        }
      });

      // Reset ticking so another frame can be scheduled
      ticking = false;
    };

    // Event listener for scroll events
    const onScroll = () => {
      lastScrollY = window.scrollY;

      // Only schedule one animation frame at a time
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    // ✅ Use passive listener and add will-change CSS hints
    gears.forEach((gear) => {
      if (gear) {
        gear.style.willChange = 'transform';
      }
    });

    window.addEventListener('scroll', onScroll, { passive: true });

    // Cleanup function removes the scroll listener and will-change hints
    return () => {
      window.removeEventListener('scroll', onScroll);
      // ✅ Clean up will-change to free resources
      gears.forEach((gear) => {
        if (gear) {
          gear.style.willChange = 'auto';
        }
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="background Home overflow-hidden flex flex-col items-end">
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
