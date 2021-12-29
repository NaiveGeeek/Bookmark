import { useState } from "react";

const initialTheme = {
  palette: {
    type: "light",
  },
};

export const useTheme = () => {
  const [theme, setTheme] = useState(initialTheme);
  const {
    palette: { type },
  } = theme;
  const updateTheme = () => {
    const updatedTheme = {
      ...theme,
      palette: {
        ...theme.palette,
        type: type === "light" ? "dark" : "light",
      },
    };
    setTheme(updatedTheme);
  };
  return [theme, updateTheme];
};
