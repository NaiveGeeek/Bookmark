import React from "react";
import { makeStyles } from "@material-ui/core";
import sun from "../assets/images/sun.png";
import moon from "../assets/images/moon.png";
import { useTheme } from '@material-ui/core/styles';


// const styles = (theme)=>({height="34px",width="60px",backgroundColor="#333",checkedBackgroundColor="#333"})=>({
const styles = (theme) => ({
  switch: {
    height: "28px",
    width: "50px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(1),
  },
  switchInput: {
    opacity: 0,
    width: "0px",
    height: "0px",
    "&:checked + $slider": {
      backgroundColor: "#555",
    },
    "&:checked + $slider:before": {
      transform: "translateX(22px)",
    },
  },
  slider: {
    cursor: "pointer",
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    width:"100%",
    // backgroundColor:backgroundColor,
    backgroundColor: "#555",
    borderRadius: "34px",
    transition: `0.4s`,
    "&::before": {
      content: '" "',
      position: "absolute",
      height: `20px`,
      width: `20px`,
      left: "4px",
      bottom: "4px",
      backgroundColor: "#333",
      transition: `0.4s`,
      borderRadius: "50%",
      zIndex: 2,
    },
  },
  leftIcon: {
    position: "absolute",
    left: "4px",
    height: "16px",
    width: "16px",
    cursor:"pointer"
  },
  rightIcon: {
    position: "absolute",
    right: "2px",
    height: "16px",
    width: "16px",
    cursor:"pointer"

  },
});

const useStyles = makeStyles(styles);
export const Switch = ({ toggleTheme }) => {
  const classes = useStyles();
  const theme = useTheme();
  const{palette:{type}} = theme;
  const handleChange = () => {
   toggleTheme();
  };
  return (
    <>
      <label className={classes.switch}>
        <input
          type="checkbox"
          className={classes.switchInput}
          onChange={handleChange}
          checked={type==="dark"}
        />
        <span className={classes.slider}></span>
        <div className={classes.leftIcon}>
          <img src={moon} alt="moon-icon" height="14" width="14" />
        </div>
        <div className={classes.rightIcon}>
          <img src={sun} alt="sun-icon" height="14" width="14" />
        </div>
      </label>
    </>
  );
};
