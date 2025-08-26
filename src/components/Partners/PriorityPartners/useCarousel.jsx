import { useEffect, useState } from "react";

export function useCarousel(priority) {
  const [width, setWidth] = useState(0);
  const [itemsPerPage, setPerPage] = useState(3);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);

  const totalPages = Math.ceil(priority.length / itemsPerPage);

  // Resize handler
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute itemsPerPage from width
  useEffect(() => {
    if (width <= 670) setPerPage(1);
    else if (width <= 990) setPerPage(2);
    else setPerPage(3);
  }, [width]);

  // Auto play
  useEffect(() => {
    if (paused || totalPages <= 1) return;
    const interval = setInterval(() => {
      setDirection(1);
      setPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [paused, totalPages]);

  // Clamp page if resize shrinks available pages
  useEffect(() => {
    if (page >= totalPages) setPage(0);
  }, [itemsPerPage, priority.length, page, totalPages]);

  return {
    page,
    setPage,
    direction,
    setDirection,
    paused,
    setPaused,
    itemsPerPage,
    totalPages,
  };
}
