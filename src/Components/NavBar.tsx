import React from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Menu, ChevronLeft } from "mdi-material-ui";
import { ClassProps, } from "../vm";
import SideMenu from "../Common/sidemenu/SideMenu";
import { Popover, Paper, Avatar } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import { getShortName, isTokenExpired, parseJwt, removeToken } from "../Common/helper";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

const drawerWidth = 240;

export interface NavBarProps extends RouteComponentProps, ClassProps {
  width?: string;
}

export interface NavBarState {
  open: boolean;
  openPopOver: boolean;
  anchorE1: HTMLButtonElement | null;
  userData: any;
}

class NavBar extends React.Component<NavBarProps, NavBarState> {
  constructor(props: NavBarProps) {
    super(props);
    this.state = {
      open:
        this.props.width === "sm" || this.props.width === "xs" ? false : true,
      openPopOver: false,
      anchorE1: null,
      userData: parseJwt(),
    };
  }
  componentDidMount = () => {
    this.setState({ userData: parseJwt() });
  };
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  handlePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({
      anchorE1: event.currentTarget,
      openPopOver: true,
      userData: parseJwt(),
    });
  };
  handleClosePopover = () => {
    this.setState({ anchorE1: null, openPopOver: false });
  };







  render() {
    const { classes, width } = this.props;
    return (
      <>
        {!isTokenExpired() ? (
          <>
            <AppBar
              style={{ backgroundColor: "white" }}
              position="absolute"
              className={`${classes.appBar} ${this.state.open && classes.appBarShift
                }`}
            >

              <Toolbar
                disableGutters={!this.state.open}
                className={classes.toolbar}
                variant="dense"
              >

                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                  className={`${classes.menuButton} ${this.state.open && classes.menuButtonHidden
                    }`}
                >

                  <Menu color="secondary" />

                </IconButton>
                <Typography
                  component="h1"
                  variant="h6"
                  noWrap
                  className={classes.title}
                >
                  {/* @ts-ignore */}
                  {isWidthUp("md", width ?? xs) && (
                    <img
                      alt="hp logo"
                      width="400"
                      height="60"
                      style={{ backgroundColor: 'white', padding: '8px' }}
                      className={classes.hideBg}
                      src="/static/hp_nav.png"
                    />
                  )}


                </Typography>

                <Grid>
                  <Button
                    aria-describedby="simple-popover"
                    color="inherit"
                    onClick={this.handlePopover}
                  >
                    <Avatar alt="Jamal" src="static/mock-images/avatars/avatar_default.jpg" />
                  </Button>
                  <Popover
                    id="simple-popover"
                    open={this.state.openPopOver}
                    anchorEl={this.state.anchorE1}
                    onClose={this.handleClosePopover}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <Paper className="p-16">
                      <Grid container spacing={1} style={{ backgroundColor: "#004e8d", color: "white", textAlign: "center" }}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                          <Grid container >
                            <Grid item style={{ textAlign: "center" }}>
                              <h3 >
                                {/* ts-ignore */}
                                {getShortName()}
                              </h3>
                            </Grid>

                          </Grid>
                        </Grid>

                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Button
                          fullWidth
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            removeToken();
                            this.handleClosePopover();
                            this.props.history.push("/");
                          }}
                        >
                          Logout
                        </Button>
                      </Grid>

                    </Paper>
                  </Popover>
                </Grid>
              </Toolbar>
            </AppBar>
            <Drawer
              variant={
                this.props.width
                  ? this.props.width === "sm" || this.props.width === "xs"
                    ? "temporary"
                    : "permanent"
                  : "permanent"
              }
              classes={{
                paper: `${classes.drawerPaper} ${!this.state.open && classes.drawerPaperClose
                  }`,
              }}
              open={this.state.open}
            >

              <div className={classes.toolbarIcon}>
                <h3 style={{ color: "white" }}>Jaman HP Gas</h3>
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeft />
                </IconButton>
              </div>
              <Divider />
              <SideMenu />
            </Drawer>
          </>
        ) : (
          <React.Fragment></React.Fragment>
        )
        }
      </>
    );
  }
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    logoImage: {
      height: 48,
      marginRight: 16,
      marginTop: 8,
      marginBottom: 8,
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed

    },
    toolbarIcon: {
      ...theme.mixins.toolbar,
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      minHeight: "48px !important",
    } as any,
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      boxShadow: "none",
      border: "1px solid #ddd",
      height: "48px !important",
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36,
    },
    menuButtonHidden: {
      display: "none",
    },
    title: {
      flexGrow: 1,
      color: "primary"
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      backgroundColor: "#004e8e",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      height: "100vh",
      overflow: "auto",
    },
    chartContainer: {
      marginLeft: -22,
    },
    tableContainer: {
      height: 320,
    },
    h5: {
      marginBottom: theme.spacing(2),
    },
    hideBg: {
      mixBlendMode: "multiply",
      filter: "contrast"
    }
  });
export default withStyles(styles)(withWidth()(withRouter(NavBar)));
