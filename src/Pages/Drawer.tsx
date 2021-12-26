import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { mainListItems, secondaryListItems } from "./ListItems";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Link as RouterLink, useHistory } from "react-router-dom";
import SupervisorAccountOutlinedIcon from "@material-ui/icons/SupervisorAccountOutlined";
import Link from "@material-ui/core/Link";
import jwt_decode from "jwt-decode";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import SettingsIcon from '@material-ui/icons/Settings';
import BarChartIcon from '@material-ui/icons/BarChart';
import HistoryIcon from '@material-ui/icons/History';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: "auto",
    marginLeft: 0,
  },
}));

function ResponsiveDrawer() {
  let history = useHistory();

  const classes = useStyles();
  const theme = useTheme();

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  React.useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    let token: any = localStorage.getItem("access_token");
    var decoded = jwt_decode(token);
    //@ts-ignore
    let { user_id } = decoded;
    if (user_id === "HHP_91c528fa-31f8-46ff-8c0f-d786cc7487ef") {
      return true;
    } else {
      return false;
    }
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }
  const drawer = (
    <div>
      <List>
        <ListItem button>
          <ListItemText primary={mainListItems} />
        </ListItem>
        {getUser() ? (
          <div>


            <Link href="/member">
              <ListItem button style={{ marginTop: "5rem" }}>
                <ListItemIcon>
                  <SupervisorAccountOutlinedIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="User Management" />
              </ListItem>
            </Link>

            <Link href="/agentlist">
              <ListItem button>
                <ListItemIcon>
                  <SettingsIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Agent Management" />
              </ListItem>
            </Link>




          </div>

        ) : null}

        <div >
          <Link href="/changepassword">

            <ListItem button>
              <ListItemIcon>
                <HistoryIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Change Password" />
            </ListItem>
          </Link>

          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppOutlinedIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>


        </div>


      </List>
    </div>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} color="inherit">

        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>


          <img src={require("../logo_hpcl.jpg").default}
            alt="hpgas logo" />
          <div style={{ marginLeft: "20rem" }}>
            <Typography  noWrap style={{color:"red", fontSize:"20px", fontFamily:"cursive"}}>
              JAMAN HP GAS GRAMIN VITARAK(13816000)
            </Typography>
          </div>


          <div style={{ marginLeft: "32rem" }}>
            <img src={require("../JiHaan.png").default}
              alt="hpgas logo" />
          </div>
        </Toolbar>

      </AppBar>

      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <IconButton
              onClick={handleDrawerToggle}
              className={classes.closeMenuButton}
            >
              <CloseIcon />
            </IconButton>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <div className={classes.content}>
        <div className={classes.toolbar} />
      </div>
    </div>
  );
}
ResponsiveDrawer.propTypes = {
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
};
export default ResponsiveDrawer;
