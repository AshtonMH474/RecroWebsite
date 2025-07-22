import { useEffect } from "react";

export default function useScrollToHash(blocks = [], idFields = [], delay = 1000) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.location.hash) return;

    const hash = window.location.hash.slice(1);
    
    const matchingBlock = blocks.find((block) =>
      idFields.some((key) => block?.[key] === hash)
    );
    if (matchingBlock) {
      
      requestAnimationFrame(() => {
        setTimeout(() => {
          const el = document.getElementById(hash);
          
          
          if (el) {
          
                el.scrollIntoView({ behavior: "smooth", block: matchingBlock.scroll });
                if (window.history.replaceState) {
                window.history.replaceState(null, "", window.location.pathname + window.location.search);
                }
          
            
          }
        }, delay);
      });
    }
  }, [blocks, idFields, delay]);
}
