import { useRef, useState, useEffect } from "react";

export function useScrollCardAnimation(itemsCount, tallScreen = false) {
  const sectionRef = useRef(null);
  const stickyContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [shouldShowHeading, setShouldShowHeading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !stickyContainerRef.current) return;

      const section = sectionRef.current;
      const stickyContainer = stickyContainerRef.current;
      const rect = section.getBoundingClientRect();
      const stickyRect = stickyContainer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const stickyTop = tallScreen ? 200 : 150;

      const earlyTriggerOffset = windowHeight * 0.2;
      const sectionPastPreviousContent = rect.top <= earlyTriggerOffset;
      const headingApproachingTop = stickyRect.top <= stickyTop + earlyTriggerOffset;
      const shouldShowHeading = sectionPastPreviousContent || headingApproachingTop;

      const animationStart = windowHeight;
      const animationEnd = windowHeight * 0.5;
      const scrolled = animationStart - rect.top;
      const scrollRange = animationStart - animationEnd;

      let progress = scrolled / scrollRange;
      progress = Math.max(0, Math.min(1, progress));

      setScrollProgress(progress);
      setShouldShowHeading(shouldShowHeading);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tallScreen]);

  const getCardProgress = (index) => {
    const totalCards = itemsCount;

    if (!shouldShowHeading) {
      return 0;
    }

    const cardAnimationRange = 1 - scrollProgress;
    const cardProgressStart = scrollProgress;

    if (scrollProgress >= 0.9) {
      return index < totalCards ? 1 : 0;
    }

    const cardRangeMultiplier = 1.5;
    const adjustedCardRange = (cardAnimationRange / totalCards) * cardRangeMultiplier;
    const cardStartProgress = cardProgressStart + (index / totalCards) * cardAnimationRange;
    const cardEndProgress = cardStartProgress + adjustedCardRange;
    const finalCardEndProgress = Math.min(cardEndProgress, 1);

    if (scrollProgress < cardStartProgress) {
      return 0;
    } else if (scrollProgress >= finalCardEndProgress) {
      return 1;
    } else {
      const cardLocalProgress =
        (scrollProgress - cardStartProgress) / (finalCardEndProgress - cardStartProgress);
      return cardLocalProgress;
    }
  };

  const getCardAnimation = (index) => {
    const cardProgress = getCardProgress(index);

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const easedProgress = easeOutCubic(cardProgress);

    const opacity = easedProgress;
    const translateY = 40 * (1 - easedProgress);
    const scale = 0.85 + 0.15 * easedProgress;

    return {
      opacity,
      transform: `translateY(${translateY}px) scale(${scale})`,
      transition:
        cardProgress > 0 && cardProgress < 1
          ? "opacity 0.3s ease-out, transform 0.3s ease-out"
          : "opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
    };
  };

  const headingOpacity = shouldShowHeading ? 1 : 0;

  return {
    sectionRef,
    stickyContainerRef,
    headingOpacity,
    getCardAnimation,
  };
}
