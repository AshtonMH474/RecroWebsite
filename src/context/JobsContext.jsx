import { createContext, useContext, useRef } from 'react';

const JobsContext = createContext(null);

export function JobsProvider({ children }) {
  const jobsRef = useRef(null);

  return (
    <JobsContext.Provider value={{ jobsRef }}>
      {children}
    </JobsContext.Provider>
  );
}

export const useJobs = () => useContext(JobsContext);