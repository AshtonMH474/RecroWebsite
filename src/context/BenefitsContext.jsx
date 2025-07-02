import { createContext,useContext,useRef } from "react";


const BenefitsContext = createContext(null);

export function BenefitsProvider({ children }) {
  const benefitsRef = useRef(null);

  return (
    <BenefitsContext.Provider value={{ benefitsRef }}>
      {children}
    </BenefitsContext.Provider>
  );
}

export const useBenefits = () => useContext(BenefitsContext);
