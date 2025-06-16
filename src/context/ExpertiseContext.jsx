// context/ExpertiseContext.js
import { createContext, useContext, useRef } from 'react';

const ExpertiseContext = createContext(null);

export function ExpertiseProvider({ children }) {
  const expertiseRef = useRef(null);

  return (
    <ExpertiseContext.Provider value={{ expertiseRef }}>
      {children}
    </ExpertiseContext.Provider>
  );
}

export const useExpertise = () => useContext(ExpertiseContext);
