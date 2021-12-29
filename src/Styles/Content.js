import { drawerWidth} from "./commonStyles"

export const mainContentStyle = (theme)=>({
    content: {
        flexGrow: 1,
        // boxSizing:"border-box",
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width:"auto",
        height:"calc(100vh - 64px)",
        marginTop:"64px",
        overflow:"auto",
        backgroundColor:(props)=> props.background.default,
        [theme.breakpoints.down("sm")]: {
            height:"calc(100vh - 56px)",
            marginTop:"56px",
          },
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        // width: `calc(100% - ${drawerWidth}px)`,
        width:"auto",
        marginLeft: drawerWidth,
        [theme.breakpoints.down("sm")]: {
            width: `auto`,
            marginLeft: "0px",
            height:"calc(100vh - 56px)",
            marginTop:"56px",
          },
      },
})