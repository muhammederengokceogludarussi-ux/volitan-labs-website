/**
 * Shared animation constants used across multiple components.
 */

export const easeOutQuad = [0.25, 0.46, 0.45, 0.94] as [
  number,
  number,
  number,
  number,
];

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOutQuad,
    },
  },
};
