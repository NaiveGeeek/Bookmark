import { blackColorTheme, drawerWidth, whiteColorTheme } from "./commonStyles";

export const appBarStyle = (theme) => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down("sm")]: {
      width: `100%`,
      marginLeft: "0px",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  sidebarMiniIcon: {
    width: "24px",
    height: "24px",
    // color:'inherit !important'
  },
  title:{
    flexGrow: 1,
  },
  whiteTitle:{
    color:"#fff",
  },
  blackTitle:{
    color:"#000",
  },
  ...blackColorTheme,
  ...whiteColorTheme,
});
