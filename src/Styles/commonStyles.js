export const drawerWidth = 260;
export const miniDrawerWidth = 80;

export const convertHexToRgb = (inputValue = "") => {
  if (inputValue.length > 0) {
    let hexValue = inputValue.replace("#", "");
    const hexRegex = /[0-9A-Fa-f]/g;
    if (
      !hexRegex.test(hexValue) ||
      (hexValue.length !== 3 && hexValue.length !== 6)
    ) {
      throw new Error("Invalid Hex String for Color !!!");
    } else {
      if (hexValue.length === 3) {
        hexValue =
          hexValue[0] +
          hexValue[0] +
          hexValue[1] +
          hexValue[1] +
          hexValue[2] +
          hexValue[2];
      }
      return `${parseInt(hexValue[0] + hexValue[1], 16)}+", "+${parseInt(
        hexValue[2] + hexValue[3],
        16
      )}+", "+${parseInt(hexValue[4] + hexValue[5], 16)}`;
    }
  }
  return inputValue;
};

export const defaultFont = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: "300",
  lineHeight: "1.5em",
};

export const transition = {
    transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
  };

export const primaryColor = ["#9c27b0", "#ab47bc", "#8e24aa", "#af2cc5", "#7b1fa2"];
export const warningColor = [
  "#ff9800",
  "#ffa726",
  "#fb8c00",
  "#ffa21a",
  "#f57c00",
  "#faf2cc",
  "#fcf8e3",
];
export const dangerColor = [
  "#f44336",
  "#ef5350",
  "#e53935",
  "#f55a4e",
  "#d32f2f",
  "#ebcccc",
  "#f2dede",
];
export const successColor = [
  "#4caf50",
  "#66bb6a",
  "#43a047",
  "#5cb860",
  "#388e3c",
  "#d0e9c6",
  "#dff0d8",
];
export const infoColor = [
  "#00acc1",
  "#26c6da",
  "#00acc1",
  "#00d3ee",
  "#0097a7",
  "#c4e3f3",
  "#d9edf7",
];
export const roseColor = ["#e91e63", "#ec407a", "#d81b60", "#eb3573", "#c2185b"];
export const grayColor = [
  "#999",
  "#777",
  "#3C4858",
  "#AAAAAA",
  "#D2D2D2",
  "#DDD",
  "#555555",
  "#333",
  "#eee",
  "#ccc",
  "#e4e4e4",
  "#E5E5E5",
  "#f9f9f9",
  "#f5f5f5",
  "#495057",
  "#e7e7e7",
  "#212121",
  "#c8c8c8",
  "#505050",
];
export const blackColor = "#000";
export const whiteColor = "#FFF";
export const twitterColor = "#55acee";
export const facebookColor = "#3b5998";
export const googleColor = "#dd4b39";
export const linkedinColor = "#0976b4";
export const pinterestColor = "#cc2127";
export const youtubeColor = "#e52d27";
export const tumblrColor = "#35465c";
export const behanceColor = "#1769ff";
export const dribbbleColor = "#ea4c89";
export const redditColor = "#ff4500";

export const blackColorTheme ={
  blackBackground: {
    color: whiteColor,
    background:grayColor[7],
    "&:after": {
      background: grayColor[7],
      opacity: ".8",
    },
  },
  
}
export const whiteColorTheme ={
  whiteBackground: {
    color: grayColor[7],
    background:whiteColor,
    "&:after": {
      background: grayColor[7],
      opacity: ".8",
    },
  },
}
