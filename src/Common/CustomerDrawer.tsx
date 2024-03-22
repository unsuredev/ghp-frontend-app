import React from "react";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles, Theme, createStyles } from "@material-ui/core";
import { ClassProps } from "../vm";

export interface CustomDrawerProps extends ClassProps {
  title?: any;
  handleOpen?: boolean;
  class?: string;
  onClose: Function;
  variant?: "fullDrawer" | "medium" | "large" | "small";
}

export interface CustomDrawerState { }

class CustomDrawer extends React.Component<
  CustomDrawerProps,
  CustomDrawerState
> {
  constructor(props: CustomDrawerProps) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    return (
      <div>

        <Drawer
          anchor="right"
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
          className={`drawer-${this.props.variant ? this.props.variant : "small"
            } ${this.props.class}`}
          open={this.props.handleOpen === false ? false : true}
          onClose={() => this.props.onClose()}
        >
          {this.props.title && (
            <AppBar
              color="default"
              position="absolute"
              className={classes.appBar}
            >
              <Toolbar className={classes.toolbar} variant="dense">
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  className={`${classes.title} fw-semi-bold drawer-title`}
                >
                  {this.props.title}
                </Typography>

                <Grid>
                  <Button
                    size="small"
                    color="secondary"
                    variant="outlined"
                    onClick={() => {
                      this.props.onClose();
                    }}
                  >
                    Close
                  </Button>
                </Grid>
              </Toolbar>
            </AppBar>
          )}
          <section style={{ marginTop: "1rem", width: "55rem", padding: "1rem" }}>
            {this.props.title && <div className={classes.appBarSpacer} />}
            {this.props.children}
            <br />
          </section>
        </Drawer>

      </div>
    );
  }
}

const styles = (theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      boxShadow: "none",
      background: "#fff",
      borderBottom: "1px solid #ddd",
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarSpacer: {
      height: 48,
    },
  });

export default withStyles(styles)(CustomDrawer);
