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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import TextField from '@material-ui/core/TextField';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Divider from '@material-ui/core/Divider';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { Theme, withStyles, createStyles } from '@material-ui/core/styles';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import moment from "moment";
import axios from "axios";
import { BASE_URL } from "../Common/constant";
import { ToastContext } from "../Common/ToastProvider";

import '../style/Header.css'
const drawerWidth = 260;
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

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
    largeSize: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }),
)(Badge);

function ResponsiveDrawer() {
  let history = useHistory();
  const [active, setActivce] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { showToast } = React.useContext(ToastContext);
  const [user, setUser] = React.useState({
    name: "",
    status: "",
    profile_url: "",
    active: false,
    is_online: false
  })

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();
  const theme = useTheme();

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  const handleChange = (event: any) => {
    setUser({ ...user, [event.target.name]: event.target.value });
    
  };




  const getUser = () => {
    let token: any = localStorage.getItem("access_token");
    var decoded = jwt_decode(token);
    //@ts-ignore
    let { user_id } = decoded;
    return user_id;

  };


  React.useEffect(() => {
    getUser();
    fetchUser()
  }, []);


  const getToken = () => {
    //@ts-ignore
    return localStorage.getItem("access_token")
  }

  const fetchUser = async () => {
    try {
      const result = await axios.post(BASE_URL + "user/find",
        {
          "user_id": getUser()
        },
        {
          headers: {
            encryption: false,
            access_token: getToken()
          }
        })
      if (result.data && result.data != null) {
        setUser(result.data.data)
      }
      else {
        showToast(result.data.message, "error");
      }
    } catch (error) {
      console.log(error)
      showToast("unable to find user!", "error");

    }
  };



  const HandleStatus = async () => {
    try {
        const result = await axios.post(BASE_URL + "user/update",
            {
                "status":user.status
            },
            {
                headers: {
                    encryption: false,
                    access_token: getToken()
                }
            })
            handleClose()

        if (result.data && result.data != null) {
            showToast("Status updated successfully!", "success");
       
          }
        else {
            showToast(result.data.message, "error");
        }
    } catch (error) {
        console.log(error)
        showToast("Status couldn't update", "error");
    }
};



const HandleOnline = async (status:boolean) => {
  try {
      const result = await axios.post(BASE_URL + "user/update",
          {
              "is_online":!status

          },
          {
              headers: {
                  encryption: false,
                  access_token: getToken()
              }
          })
      if (result.data && result.data != null) {
          showToast("Status updated successfully!", "success");
          fetchUser()
      }
      else {
          showToast(result.data.message, "error");
      }
  } catch (error) {
      console.log(error)
      showToast("Status couldn't update", "error");
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
        {getUser() === "HHP_91c528fa-31f8-46ff-8c0f-d786cc7487ef" ? (
          <div>


            <Link href="/member">
              <ListItem button style={{ marginTop: "7rem" }}>
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

      </List>
    </div>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <section className="early">

        </section>
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
            <Typography noWrap style={{ color: "red", fontSize: "20px", fontFamily: "cursive" }}>
              JAMAN HP GAS GRAMIN VITARAK(13816000)
            </Typography>
            {/* <article>
    <p className="example-left"> &nbsp; &nbsp;  &nbsp; Wishing you the happiest birthday <span style={{color:"#C51162", fontStyle:"cursive"}}>Jaman !</span></p> <br></br>
    <p className="example-left"> &nbsp; May the Allah be with you and bless you forever.</p> 

  </article> */}
          </div>
          <div style={{ marginLeft: "29rem" }}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="primary"
            >
              <div style={{ marginLeft: "2rem", padding: "1rem" }}>
                <StyledBadge
                  //@ts-ignore
                  overlap="circular"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  variant="dot"
                >
                  <Avatar alt="Remy Sharp" src={user.profile_url} />
                </StyledBadge>
              </div>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
              style={{ textAlign: "center" }}
            >
              <div style={{ marginLeft: "2rem", padding: "1rem" }}>

                <Card >
                  <CardActionArea>
                    <CardMedia
                  image="/static/blue.jpg"
                                title="Contemplative Reptile"
                    />
                  </CardActionArea>
                </Card>
                <StyledBadge
                  //@ts-ignore
                  overlap="circular"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  variant="dot"
                >

                  <Avatar alt={user.name}    src={user.profile_url} />
                </StyledBadge>
              </div>
              <Divider />
              <MenuItem onClick={() => history.push("/profile")}>Profile:&nbsp; <span style={{ color: "blue" }}>{user.name}</span></MenuItem>
              <Divider />
                                                              {/* @ts-ignore */}

              <MenuItem >Last login: &nbsp;+<span style={{ color: "blue" }}> {moment(user.last_login_timestamp).format('LLL')} </span>  </MenuItem>
              <Divider />
              <MenuItem onClick={() =>HandleOnline(user.is_online)} >{user.is_online ? <div style={{display:"contents"}}> <p>Set yourself away </p> &nbsp; &nbsp; <RadioButtonUncheckedIcon style={{color:"#40E227"}} /> </div>:<div style={{display:"contents"}}>  <p> Set yourself active </p> &nbsp; &nbsp; <RadioButtonCheckedIcon style={{color:"#40E227"}} /></div>}  </MenuItem>
              <Divider />
              <MenuItem >  <TextField
                label="Update your status"
                id="outlined-size-small"
                variant="outlined"
                size="small"
                name="status"
                value={user.status}
                onChange={handleChange}

              />
                  <IconButton color="primary"  component="span" onClick={HandleStatus}>
                  <DoneOutlineIcon color="primary" />
                        </IconButton>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>Log out &nbsp; &nbsp; <ExitToAppIcon color="primary" /></MenuItem>
            </Menu>
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
