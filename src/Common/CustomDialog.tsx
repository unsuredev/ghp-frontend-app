import * as React from "react";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles, Theme, createStyles, Dialog } from "@material-ui/core";
import { ClassProps } from "../vm";
import { Close } from "mdi-material-ui";

export interface CustomDialogProps extends ClassProps {
  title?: any;
  handleOpen?: boolean;
  class?: string;
  onClose: Function;
  variant?: "fullDrawer" | "medium" | "large" | "small";
  fullWidth?: boolean;
  fullScreen?: boolean;
}

export interface CustomDialogState { }

class CustomDialog extends React.Component<
  CustomDialogProps,
  CustomDialogState
> {
  constructor(props: CustomDialogProps) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    return (
      <Dialog
        // anchor="right"
        // maxWidth={"900px"}
        maxWidth={this.props.fullWidth ? "md" : "sm"}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        className={`custom-dialog-${this.props.variant ? this.props.variant : "small"
          }`}
        open={this.props.handleOpen === false ? false : true}
        onClose={() => this.props.onClose()}
        fullScreen={this.props.fullWidth !== undefined ? true : false}
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
                variant="h5"
                color="inherit"
                noWrap
                className={`${classes.title} drawer-title py-16`}
              >
                {this.props.title}
              </Typography>

              <Grid>
                <div
                  className="pointer"
                  onClick={() => {
                    this.props.onClose();
                  }}
                >
                  <Close className={classes.closeIcon} />
                </div>
                {/* <Button
                  size="small"
                  color="secondary"
                  variant="outlined"
                  onClick={() => {
                    this.props.onClose();
                  }}
                >
                  <img src="/images/icons/close.svg" alt="close" />
                </Button> */}
              </Grid>
            </Toolbar>
          </AppBar>
        )}
        <section className={classes.body}>
          {this.props.title && <div className={classes.appBarSpacer} />}
          {this.props.children}
        </section>
      </Dialog>
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

export default withStyles(styles)(CustomDialog);
