export const Animation = {
  loading: "loading 1600ms ease-out infinite",
  circleRotate: "rotate 1200ms cubic-bezier(0.33, 0, 0.67, 1) infinite",
  shimmer: "shimmer 1100ms infinite",
};

export const Keyframes = {
  rotate: `
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `,
  shimmer: `
    @keyframes shimmer {
      from {
        left: -120%;
      }
      to {
        left: 100%;
      }
    }
  `,
};
