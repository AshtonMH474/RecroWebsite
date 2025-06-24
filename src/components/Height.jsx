// components/DynamicHeightContainer.js
import { useState, useEffect } from 'react';

export default function DynamicHeightContainer({ children }) {
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      setViewportHeight(window.innerHeight);
    };

    updateHeight(); // Initial call
    window.addEventListener('resize', updateHeight);

    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div
      style={{
        height: `${viewportHeight}px`,
        // overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
}
