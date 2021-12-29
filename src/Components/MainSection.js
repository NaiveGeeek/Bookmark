import React from "react";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {mainContentStyle} from "../Styles/Content"

const useStyles = makeStyles(mainContentStyle);

const MainSection = ({drawerOpen,data}) => {
  const theme = useTheme();
  const {palette} =theme
   const classes = useStyles(palette); 
  return (
    <main className={clsx(classes.content, {
        [classes.contentShift]: drawerOpen,
      })}  >
      
    </main>
  );
};

export default MainSection;
