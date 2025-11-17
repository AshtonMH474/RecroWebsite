


import { tinaField } from "tinacms/dist/react"
import SolutionCard from "./SolutionCard"
import { useEffect, useRef, useState, memo } from "react";


function SolutionsGrid({solutionRes,...block}){
    const solutions = solutionRes.solutionConnection.edges.map(e => e.node);
    const sectionRef = useRef(null);
    const [sectionHeight, setSectionHeight] = useState(0);
    const [rows, setRows] = useState(1);
    const [short, setShort] = useState(false);
    const [tall, setTall] = useState(false);
    
    // Track scroll progress and heading state
    const [scrollProgress, setScrollProgress] = useState(0);
    const [shouldShowHeading, setShouldShowHeading] = useState(false);
    const headingRef = useRef(null);
    const stickyContainerRef = useRef(null);
    
    useEffect(() => {
      if (!solutions.length) return;
      
      const updateRows = () => {
        const screenWidth = window.innerWidth;
    
        const cardsPerRow = screenWidth < 640 ? 1 : screenWidth < 948 ? 2 : 3;
        const newRows = Math.ceil(solutions.length / cardsPerRow);
    
        setRows(newRows);
      };
    
      
      // Use requestAnimationFrame to ensure DOM is ready
      const rafId = requestAnimationFrame(() => {
        updateRows();
      });
      window.addEventListener("resize", updateRows);
    
      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("resize", updateRows);
      };
    }, [solutions.length]);
    
    // Calculate section height based on rows and screen height
    useEffect(() => {
      if (rows === 0) return;
      
      const updateHeight = () => {
        const screenHeight = window.innerHeight;
        const isShort = screenHeight <= 600;
        const isTall = screenHeight >= 1000;
    
        setShort(isShort);
        setTall(isTall);
    
        const rowHeightPx = 0.5 * screenHeight;

    
        // Calculate total height: rows + heading + extra space, double for short screens
        const calculatedHeight = ((rows * rowHeightPx) * (isShort ? 2 : 1));
        setSectionHeight(calculatedHeight);
      };

      // Use requestAnimationFrame to ensure layout is stable
      const rafId = requestAnimationFrame(() => {
        updateHeight();
      });
      
      // Also listen to resize for height recalculation
      window.addEventListener("resize", updateHeight);
      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("resize", updateHeight);
      };
    }, [rows]);

    // Scroll-based animation with heading tracking
    useEffect(() => {
      const handleScroll = () => {
        if (!sectionRef.current || !stickyContainerRef.current) return;
    
        const section = sectionRef.current;
        const stickyContainer = stickyContainerRef.current;
        const rect = section.getBoundingClientRect();
        const stickyRect = stickyContainer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const stickyTop = tall ? 200 : 150;
    
        // Check if heading has reached the top (sticky position)
        
       
    
        // Check if section has scrolled past previous content (with earlier trigger)
        // Trigger a bit before section top reaches viewport top
        const earlyTriggerOffset = windowHeight * 0.2; // Trigger 20% of viewport height earlier
        const sectionPastPreviousContent = rect.top <= earlyTriggerOffset;
    
        // Check if heading is approaching the top (earlier trigger)
        const headingApproachingTop = stickyRect.top <= stickyTop + earlyTriggerOffset;
    
        // Heading should be visible if:
        // 1. Section has scrolled past previous content (with early trigger), OR
        // 2. Heading is approaching/reached the top (with early trigger)
        const shouldShowHeading = sectionPastPreviousContent || headingApproachingTop;
    
        // Animation start: when section enters bottom of viewport
        const animationStart = windowHeight;
        // Animation end: when section is further up to allow extra scroll space after cards finish
        // Cards finish animating earlier, leaving room for extra scroll space
        const animationEnd = windowHeight * 0.5;
    
        // Calculate how far section top has traveled from start to end
        const scrolled = animationStart - rect.top;
        const scrollRange = animationStart - animationEnd;
    
        // Progress from 0 to 1
        let progress = scrolled / scrollRange;
        progress = Math.max(0, Math.min(1, progress));
    
        setScrollProgress(progress);
        
        // Store whether heading should be visible
        setShouldShowHeading(shouldShowHeading);
      };
    
      // Use requestAnimationFrame for initial call
      const rafId = requestAnimationFrame(handleScroll);
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener('scroll', handleScroll);
      };
    }, [tall]);

    // Convert scroll progress to visual properties
    // Heading is hidden initially and fades in when:
    // 1. Section has scrolled past all previous content, OR
    // 2. Heading reaches the top of the screen
    const headingOpacity = shouldShowHeading ? 1 : 0;
    
    // Calculate card animation progress tied to scroll position
    // Cards start appearing after heading becomes visible
    // Map scroll progress to card visibility (0 to 1 for each card)
    // Slower: each card takes more scroll distance to appear
    const getCardProgress = (index) => {
      const totalCards = solutions.length;
      
      // If heading isn't visible yet, all cards are hidden
      if (!shouldShowHeading) {
        return 0;
      }
      
      // Cards start appearing when heading becomes visible
      // Use current scroll progress as baseline, but ensure cards have room to animate
      // Calculate progress range for cards (from current progress to scroll end)
      const cardAnimationRange = 1 - scrollProgress;
      const cardProgressStart = scrollProgress;
      
      // If we're already past most of the scroll, cards should appear quickly
      if (scrollProgress >= 0.9) {
        // Near the end, show cards quickly
        return index < totalCards ? 1 : 0;
      }
      
      // Slower animation: each card takes more scroll range
      // Increase the range each card uses by multiplying by a factor
      const cardRangeMultiplier = 1.5; // Makes each card take 1.5x more scroll distance
      const adjustedCardRange = (cardAnimationRange / totalCards) * cardRangeMultiplier;
      
      // Each card gets a larger portion of the remaining scroll range
      // First card appears immediately when heading is visible
      const cardStartProgress = cardProgressStart + (index / totalCards) * cardAnimationRange;
      const cardEndProgress = cardStartProgress + adjustedCardRange;
      
      // Clamp cardEndProgress to not exceed 1
      const finalCardEndProgress = Math.min(cardEndProgress, 1);
      
      // Calculate this card's individual progress (0 to 1)
      if (scrollProgress < cardStartProgress) {
        return 0; // Card hasn't started appearing yet
      } else if (scrollProgress >= finalCardEndProgress) {
        return 1; // Card is fully visible
      } else {
        // Card is in the process of appearing (slower)
        const cardLocalProgress = (scrollProgress - cardStartProgress) / (finalCardEndProgress - cardStartProgress);
        return cardLocalProgress;
      }
    };
    
    // Helper function to calculate individual card animation based on scroll
    const getCardAnimation = (index) => {
      const cardProgress = getCardProgress(index);
      
      // Easing function for smooth animation
      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOutCubic(cardProgress);
      
      // Calculate opacity, transform based on card progress
      const opacity = easedProgress;
      const translateY = 40 * (1 - easedProgress);
      const scale = 0.85 + (0.15 * easedProgress);
      
      return {
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        // Slower, smoother transitions tied to scroll
        transition: cardProgress > 0 && cardProgress < 1 
          ? 'opacity 0.3s ease-out, transform 0.3s ease-out'
          : 'opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      };
    };
  
    return (
        <>
            <section id={block.solutions_id} ref={sectionRef}
            style={{ height: `${sectionHeight}px` }}
            className="scrollCenter pb-16 mb-50 relative" >
                <div 
                    ref={stickyContainerRef}
                    style={{
                        position: "sticky",
                        paddingTop: short ? "5rem" : "3rem",
                        top: tall ? "200px" : "80px",
                    }} 
                    className=" overflow-hidden z-30 py-12 max-w-[1000px] mx-auto rounded-md">
                        <h2 
                            ref={headingRef}
                            style={{ opacity: headingOpacity }} 
                            data-tina-field={tinaField(block,'solutions_heading')} 
                            className="font-bold px-4 text-[32px] md:text-[40px] text-white text-center transition-opacity duration-700 ease-out">
                            {block.solutions_heading}
                        </h2>
                        <div 
                            data-tina-field={tinaField(block,'underline_width')} 
                            style={{ 
                                opacity: headingOpacity,
                                width: block.underline_width 
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
    )
}

export default memo(SolutionsGrid)
