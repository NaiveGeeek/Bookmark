import React, { useState } from "react";
import Appbar from "./Appbar";
import MainSection from "./MainSection";
import Sidebar from "./Sidebar";

const initialState = {
  links: [],
  children: [],
};

const Main = ({ routes, toggleTheme }) => {
  const [data, setData] = useState(initialState);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [smDrawerOpen, setSmDrawerOpen] = useState(false);

  // console.log(theme);
  return (
    <>
      <Appbar
        drawerOpen={drawerOpen}
        smDrawerOpen={smDrawerOpen}
        setDrawerOpen={setDrawerOpen}
        setSmDrawerOpen={setSmDrawerOpen}
        toggleTheme={toggleTheme}
      />
      <Sidebar
        routes={routes}
        handleFolderClick={setData}
        isOpen={drawerOpen}
        isSmOpen={smDrawerOpen}
        handleDrawerState={() => setDrawerOpen(!drawerOpen)}
        handleSmDrawerState={() => setSmDrawerOpen(!smDrawerOpen)}
      />
      <MainSection drawerOpen={drawerOpen}/>
    </>
  );
};

export default Main;
