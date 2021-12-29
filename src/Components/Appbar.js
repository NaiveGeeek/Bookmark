import React from "react";
import { AppBar, Hidden, Toolbar, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { MoreVert } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import { Switch } from "./Switch";
import { useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { appBarStyle } from "../Styles/appBar";

const Appbar = ({
  setDrawerOpen,
  setSmDrawerOpen,
  drawerOpen,
  smDrawerOpen,
  toggleTheme,
}) => {
  const useStyles = makeStyles(appBarStyle);
  const classes = useStyles();
  const theme = useTheme();
  const {
    palette: { type },
  } = theme;
  return (
    <AppBar
      position="fixed"
      color="inherit"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: drawerOpen,
      })}
    >
      <Toolbar>
        <Hidden smDown implementation="css">
          <IconButton
            component="button"
            onClick={() => {
              setDrawerOpen(!drawerOpen);
            }}
            className={classes.menuButton}
          >
            {drawerOpen ? (
              <MoreVert className={classes.sidebarMiniIcon} />
            ) : (
              <MenuIcon className={classes.sidebarMiniIcon} />
            )}
          </IconButton>
        </Hidden>
        <Typography
          variant="h6"
          className={
            classes.title +
            " " +
            (type === "dark" ? classes.whiteTitle : classes.blackTitle)
          }
          color="inherit"
        >
          {" "}
          Bookmarks
        </Typography>
        <Switch toggleTheme={toggleTheme} />
        <Hidden mdUp implementation="css">
          <IconButton
            component="button"
            onClick={() => {
              setSmDrawerOpen(!smDrawerOpen);
            }}
            className={classes.menuButton}
          >
            {smDrawerOpen ? (
              <MoreVert className={classes.sidebarMiniIcon} />
            ) : (
              <MenuIcon className={classes.sidebarMiniIcon} />
            )}
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};
export default Appbar;
