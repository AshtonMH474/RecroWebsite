// components/Leadership/animationVariants.js
export const animationVariants = {
  enter: (dir) => ({
    x: dir > 0 ? 300 : -300,
    opacity: 0,
    position: "absolute",
    width: "100%",
  }),
  center: {
    x: 0,
    opacity: 1,
    position: "relative",
    width: "100%",
  },
  exit: (dir) => ({
    x: dir > 0 ? -300 : 300,
    opacity: 0,
    position: "absolute",
    width: "100%",
  }),
};
