export const tokens = {
  color: {
    primary: {
      900: "#121212", // Deep Black/Accent
      600: "#333333",
      default: "#121212"
    },
    neutral: {
      0: "#ffffff",   // Pure White (Wall)
      100: "#fafafa", // Off White
      200: "#f0f0f0", // Light Grey (Floor/Shadow)
      500: "#8e8e8e",
      900: "#121212"
    },
    gallery: {
      wall: "#ffffff",
      floor: "#fdfdfd",
      accent: "#003366" // Deep Blue subtle accent
    },
    semantic: {
      error: "#ff4d4d",
      success: "#22c55e"
    }
  },
  font: {
    serif: "Noto Serif KR",
    sans: "Pretendard"
  }
} as const;
