export const motionTokens = {
  micro: 0.12,
  fast: 0.15,
  standard: 0.35,
  reveal: 0.45,
  emphasis: 0.6,
  slow: 0.6,
  easeOut: [0.16, 1, 0.3, 1] as const,
  spring: { type: "spring" as const, stiffness: 260, damping: 24 },
};
