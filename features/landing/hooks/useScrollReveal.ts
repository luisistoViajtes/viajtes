import { Variants } from "framer-motion";

// Claude-like easing: smooth deceleration
const EASE = [0.2, 0, 0, 1] as const;

export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: EASE,
    },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0,
    },
  },
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

// Used inline — not spread to avoid TS prop conflicts
export const CARD_HOVER = {
  whileHover: { y: -2, transition: { duration: 0.18 } },
} as const;
