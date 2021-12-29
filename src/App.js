import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { generateRoutes } from "./utils/data";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { useTheme } from "./Components/Theme";
import { data } from "./utils/parser";
import Main from "./Components/Main";
import "./App.css";

const routes = generateRoutes(data);

function App() {
  const [theme, updateTheme] = useTheme();
  const updatedTheme = createTheme(theme);

  return (
    <ThemeProvider theme={updatedTheme}>
      <CssBaseline/>
      <Main routes={routes} toggleTheme={updateTheme} />
    </ThemeProvider>
  );
}

export default App;
