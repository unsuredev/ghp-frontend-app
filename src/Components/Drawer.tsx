import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import { List, AppBar, Avatar, CssBaseline, Drawer, Hidden, ListItem, ListItemIcon, ListItemText, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import { Divider, Badge, makeStyles, Typography, useTheme } from "@material-ui/core";
import { Link as RouterLink, useHistory } from "react-router-dom";
import SupervisorAccountOutlinedIcon from "@material-ui/icons/SupervisorAccountOutlined";
import Link from "@material-ui/core/Link";
import SettingsIcon from '@material-ui/icons/Settings';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import { Menu, CardMedia, CardActionArea, MenuItem, TextField } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { Theme, withStyles, createStyles } from '@material-ui/core/styles';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GetAppIcon from '@material-ui/icons/GetApp';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import SearchIcon from '@material-ui/icons/Search';
import moment from "moment";
import axios from "axios";
import { BASE_URL } from "../Common/constant";
import { ToastContext } from "../Common/ToastProvider";
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import BarChartIcon from '@material-ui/icons/BarChart';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FaceIcon from '@material-ui/icons/Face';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import StorefrontIcon from '@material-ui/icons/Storefront';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Card from "@material-ui/core/Card";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ErrorIcon from '@material-ui/icons/Error';
import { getToken, getRole, getUserId, isTokenExpired } from "../Common/helper";

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
    }
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

  const handleLogout = async () => {
    try {
      const result = await axios.post(BASE_URL + "user/logout",
        {},
        {
          headers: {
            encryption: false,
            token: getToken()
          }
        })
      if (result.data && result.data != null) {
        showToast(result.data.message, "success");
        localStorage.clear();
        history.push("/");
        window.location.reload();
      }
      else {
        showToast(result.data.message, "error");
      }
    } catch (error) {
      console.log(error)
      showToast("Something went wrong!", "error");
    }
  };

  const handleChange = (event: any) => {
    setUser({ ...user, [event.target.name]: event.target.value });

  };


  React.useEffect(() => {
    checkUserPhotoPresent()
  }, []);


  const checkUserPhotoPresent = () => {
    if (localStorage.getItem("jhpuser") != null) {
      setUser(JSON.parse(localStorage.getItem("jhpuser")!))
    }
    else {
      localStorage.clear()
      fetchUser()
    }
  }

  const handleLocalLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('jhpuser');
    localStorage.clear()
    history.push("/");
    window.location.reload();
  }

  const fetchUser = async () => {
    try {
      const result = await axios.post(BASE_URL + "user/find",
        {
          "user_id": getUserId()
        },
        {
          headers: {
            encryption: false,
            token: getToken()
          }
        })
      if (result.data && result.data != null) {
        localStorage.setItem("jhpuser", JSON.stringify(result.data.data))
        setUser(result.data.data)
      }
      else {
        showToast(result.data.message, "error");
      }
    } catch (error) {
      console.log(error)
      history.push("/");
      showToast("Token invald, Login again", "error");

    }
  };



  const HandleStatus = async () => {
    try {
      const result = await axios.post(BASE_URL + "user/update",
        {
          "status": user.status
        },
        {
          headers: {
            encryption: false,
            token: getToken()
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



  const HandleOnline = async (status: boolean) => {
    try {
      const result = await axios.post(BASE_URL + "user/update",
        {
          "is_online": !status
        },
        {
          headers: {
            encryption: false,
            token: getToken()
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


  const MenuList = (
    <div style={{ backgroundColor: "#009688", color: "white" }}>
      <List
      >
        {getRole() != "user" && (
          <div style={{ marginTop: "5rem" }}>
            <Link href="/customer">
              <ListItem button style={{ color: "white" }}>
                <ListItemIcon>
                  <PersonAddIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Consumer Registration" />
              </ListItem>
            </Link>
            <Link href="/home">
              <ListItem button style={{ color: "white" }}>
                <ListItemIcon>
                  <SearchIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Find Consumer" />
              </ListItem>
            </Link>
            <Link href="/olddatamanagement">
              <ListItem button style={{ color: "white" }}>
                <ListItemIcon>
                  <FolderSpecialIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Find Consumer Before 2021" />
              </ListItem>
            </Link>
            <Link href="/delivery">
              <ListItem button style={{ color: "white" }}>
                <ListItemIcon>
                  <BarChartIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="NC Delivery Dashboard" />
              </ListItem>
            </Link>
            <Link href="/customerdocs">
              <ListItem button style={{ color: "white" }}>
                <ListItemIcon>
                  <CloudUploadIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Image & Docs  Management" />
              </ListItem>
            </Link>
            <Link href="/connection">
              <ListItem button style={{ color: "white" }}>
                <ListItemIcon>
                  <TrendingUpIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Sales & Connection" />
              </ListItem>
            </Link>
            <Link href="/refillsales">
              <ListItem button style={{ color: "white" }}>
                <ListItemIcon style={{ color: "white" }}>
                  <StorefrontIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Refil Sales" />
              </ListItem>
            </Link>
            <Link href="/transaction">
              <ListItem button style={{ color: "white" }}>
                <ListItemIcon >
                  <AccountBalanceIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Transaction" />
              </ListItem>
            </Link>
            <Link href="/reports">
              <ListItem button style={{ color: "white" }}>
                <ListItemIcon>
                  <DashboardIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Connection Dashboard" />
              </ListItem>
            </Link>

            <Link href="/dailycustomer">
              <ListItem button style={{ color: "white" }}>
                <ListItemIcon>
                  <GetAppIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Date Wise Reports" />
              </ListItem>
            </Link>
            <Link href="/trash">
              <ListItem button style={{ color: "white" }}>
                <ListItemIcon>
                  <RestoreFromTrashIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Trash Consumers" />
              </ListItem>
            </Link>
            <Link href="/dash">
              <ListItem button style={{ color: "white" }}>
                <ListItemIcon>
                  <AccessibilityNewIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="User Activity" />
              </ListItem>
            </Link>
            <Link href="/profile">
              <ListItem button style={{ color: "white" }}>
                <ListItemIcon>
                  <FaceIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
            </Link>

          </div>
        )}
        {getRole() === "user" && (
          <div style={{ marginTop: "5rem", backgroundColor: "#009688", color: "white", height: "770px" }}>
            <Link href="/home">
              <ListItem button style={{ color: "white" }}>
                <ListItemIcon>
                  <SearchIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Find Consumer" />
              </ListItem>
            </Link>
            <Link href="/agentdashboard">
              <ListItem button style={{ color: "white" }}>
                <ListItemIcon>
                  <BarChartIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary=" Dashboard" />
              </ListItem>
            </Link>
            <Link href="/olddatamanagement">
              <ListItem button style={{ color: "white" }}>
                <ListItemIcon>
                  <FolderSpecialIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Consumer Before 2021" />
              </ListItem>
            </Link>
            <Link href="/connection">
              <ListItem button style={{ color: "white" }}>
                <ListItemIcon>
                  <TrendingUpIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Sales & Connection" />
              </ListItem>
            </Link>

            <Link href="/fingerprint">
              <ListItem button style={{ color: "white" }}>
                <ListItemIcon>
                  <NoteAddIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="FingerPrints Pending" />
              </ListItem>
            </Link>
            <Link href="/completefinger">
              <ListItem button style={{ color: "white" }}>
                <ListItemIcon>
                  <ErrorIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Reject & Return Doc " />
              </ListItem>
            </Link>

            <Link href="/profile">
              <ListItem button style={{ color: "white" }}>
                <ListItemIcon>
                  <FaceIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
            </Link>
            <Link href="/">
              <ListItem button style={{ color: "white" }}>
                <ListItemIcon onClick={handleLocalLogout}>
                  <ExitToAppIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Log out" />
              </ListItem>
            </Link>
          </div>
        )}


        {getRole() === "superadmin" ? (
          <div style={{ backgroundColor: "#009688", color: "white" }}>
            <Link href="/member">
              <ListItem button style={{ marginTop: "2rem", color: "white" }}>
                <ListItemIcon>
                  <SupervisorAccountOutlinedIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="User Management" />
              </ListItem>
            </Link>
            <Link href="/agentlist">
              <ListItem button style={{ color: "white" }}>
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
    <>
      {!isTokenExpired() ? (
        <>
          <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar} style={{ backgroundColor: "#009688" }}>
              <Toolbar style={{ justifyContent: "space-between" }}>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
                <Typography noWrap style={{ color: "white", paddingLeft: "20px", fontSize: "15px", fontFamily: "sans-serif" }}>
                  JAMAN HP GAS
                </Typography>
                <div >
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="primary"
                  >
                    <div style={{ marginLeft: "3rem", paddingTop: "1rem" }}>
                      <StyledBadge
                        //@ts-ignore
                        overlap="circular"
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        variant="dot"
                      >
                        <Avatar alt={user.name} src={user.profile_url} />
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
                    <div >

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

                        <Avatar alt={user.name} src={user.profile_url} />
                      </StyledBadge>
                    </div>
                    <Divider />
                    <MenuItem onClick={() => history.push("/profile")}>Profile:&nbsp; <span style={{ color: "blue" }}>{user.name}</span></MenuItem>
                    <Divider />
                    {/* @ts-ignore */}

                    <MenuItem >Last login: &nbsp;<span style={{ color: "blue" }}> {moment(user.last_login_timestamp).format('LLL')} </span>  </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => HandleOnline(user.is_online)} >{user.is_online ? <div style={{ display: "contents" }}> <p>Set yourself away </p> &nbsp; &nbsp; <RadioButtonUncheckedIcon style={{ color: "#40E227" }} /> </div> : <div style={{ display: "contents" }}>  <p> Set yourself active </p> &nbsp; &nbsp; <RadioButtonCheckedIcon style={{ color: "#40E227" }} /></div>}  </MenuItem>
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
                      <IconButton color="primary" component="span" onClick={HandleStatus}>
                        <DoneOutlineIcon color="primary" />
                      </IconButton>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLocalLogout}>Log out</MenuItem>


                  </Menu>
                </div>
              </Toolbar>
            </AppBar>



            <nav className={classes.drawer}   >
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
                  {MenuList}
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
                  <div className={classes.toolbar} style={{ backgroundColor: "#009688", color: "white" }} />
                  {MenuList}
                </Drawer>
              </Hidden>
            </nav>
            <div className={classes.content} >
              <div className={classes.toolbar} />
            </div>
          </div>
        </>
      ) : (
        <React.Fragment></React.Fragment>
      )
      }
    </>
  );
}
ResponsiveDrawer.propTypes = {
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
};
export default ResponsiveDrawer;
