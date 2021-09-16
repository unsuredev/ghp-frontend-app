import React from "react";
import {
  Button,
  Typography,
  CardHeader,
  Paper,
  Tabs,
  Tab,
  CardContent,
  Card,
  Grid,
  makeStyles,
  Container,
  CssBaseline,
  TextField,
} from "@material-ui/core";
import { red } from '@material-ui/core/colors';
import DialogContentText from '@material-ui/core/DialogContentText';
import FooterSection from "../Components/Footer";
import { useHistory } from "react-router-dom";
import { httpClient } from "../Common/Service";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { ToastContext } from "../Common/ToastProvider";
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import moment from "moment";
import jwt_decode from "jwt-decode";
import { BASE_URL } from "../Common/constant";
import axios from "axios";

import ResponsiveDrawer from "./Drawer";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  root: {
    margin: theme.spacing(1),
    width: "25ch",
    flexGrow: 1,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  media: {
    height: 340,
  },
  imgSize:{
    height:200,
    width:400
  }
}));


const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    }

  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}
const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Home = () => {
  const classes = useStyles();
  let history = useHistory();
  const { showToast } = React.useContext(ToastContext);

  const [users, setUsers] = React.useState<any[]>([]);
  const [today, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [nameuser, setNameuser] = React.useState("")

  const [userObj, setUserObj] = React.useState({})
  const [openAlert, setOpenAlert] = React.useState(false);
  const CHARACTER_LIMIT = 12;


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };






  const handleClickOpenAlert = () => {
    setOpenAlert(true);

  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const hour = today.getHours();
  const wish = `Good ${(hour < 12 && "Morning") || (hour < 17 && "Afternoon") || "Evening"
    }, `;
  const userGreetings = () => {
    return (

      <h2 style={{ textAlign: "center" }}>{wish}{nameuser}</h2>

    );
  };

  const [state, setState] = React.useState({
    regNo: "",
    mobile: "",
    aadhaar: "",
    consumerNo: "",
    mainAgent: "",
  });


  const findName = () => {
    let token: any = localStorage.getItem("access_token");

    var decoded = jwt_decode(token);
    //@ts-ignore
    let { name } = decoded;
    if (name) {
      setNameuser(name)
    }
  }


  const handleChange = (event: any) => {
    setState({ ...state, [event.target.name]: event.target.value });
    //@ts-ignore
  };


  const [customer, setCustomer] = React.useState({
    name: "",
    mainAadhaar: "",
    consumerNo: "",
    familyAadhaar: "",
    regNo: "",
    mainAgent: "",
    subAgent: "",
    remarks: "",
    mobile: "",
    addedBy: "",
  });

  const handleChangeUser = (event: any) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
    //@ts-ignore
  };



  const handleFind = async (event: any) => {
    try {
      event.preventDefault();
      if (state.mobile) {
        const result = await httpClient("customer/find", "POST", {
          mobile: state.mobile,
        });

        if (!result.data && result.data === undefined)
          return showToast("No result found", "error");
        setUsers([result.data]);
        setCustomer(result.data);

      }
      if (state.aadhaar) {
        const result = await httpClient("customer/find", "POST", {
          mainAadhaar: state.aadhaar,
        });
        if (!result.data && result.data === undefined)
          return showToast("No result found", "error");
        setUsers([result.data]);
        //@ts-ignore
        setCustomer(result.data);

      }
      if (state.consumerNo) {
        const result = await httpClient("customer/find", "POST", {
          consumerNo: state.consumerNo,
        });

        if (!result.data && result.data === undefined)
          return showToast("No result found", "error");
        setUsers([result.data]);
        {/* @ts-ignore */ }
        setCustomer(result.data);
        console.log("custome==>", customer)
      }
      if (state.regNo) {
        const result = await httpClient("customer/find", "POST", {
          regNo: state.regNo,
        });

        if (!result.data && result.data === undefined)
          return showToast("No result found", "error");
        setUsers([result.data]);
        setCustomer(result.data);
        //@ts-ignore

      }
    } catch (error) {
      showToast("Something went wrong", "error");
    }
  };


  const handleupdate = async () => {
    setOpen(false);
    try {
      const result = await axios.post(BASE_URL + "customer/update", { data: customer })
      if (result.data.data && result.data != undefined) {
        showToast("Customer updated successfullly", "success");
        console.log("updated", result)
      }
    } catch (error) {
      if (error) {
        //@ts-ignore
        showToast(error.response.data.message, "error")
      }
    }
  };
  const handleDelete = async (customer: any) => {
    try {

      const result = await axios.post(BASE_URL + "customer/delete", { customerId: customer._id })
      if (result.data && result.data != undefined) {
        showToast("Customer deleted successfullly", "success");
        window.location.reload();
        setOpenAlert(false);

      }
    } catch (error) {
      if (error) {
        //@ts-ignore
        showToast(error.response.data.message, "error")
      }
    }
  };

  const getUser = () => {
    let token: any = localStorage.getItem("access_token");

    var decoded = jwt_decode(token);
    //@ts-ignore
    let { email } = decoded;
    if (email === "jaman2021@gmail.com") {
      return true;
    } else {
      return false;
    }
  };



  React.useEffect(() => {
    document.title = "Customer | JAMAN HP";
    findName()
    getUser()

    const timer = setInterval(() => {
      setDate(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <ResponsiveDrawer />
      <div >
        <div className={classes.heroContent}>
          <Container maxWidth="md" component="main" style={{ marginTop: "-40px", paddingTop: "-10px" }}>
            {userGreetings()}
            <Grid
              container
              className="maincontainer"
              style={{ justifyContent: "center", textAlign: "center", marginTop: "-10px"}}
            >
              <Grid item xs={12} sm={12} md={3}>
                <form className={classes.form} noValidate autoComplete="off">
                  <TextField
                    id="outlined-basic"
                    label="Main Aadhaar No"
                    variant="outlined"
                    fullWidth
                    name="aadhaar"
                    autoComplete="aadhaar"
                    autoFocus
                    value={state.aadhaar}
                    onChange={handleChange}
                    type="tel"
                    inputProps={{
                      maxlength: CHARACTER_LIMIT
                    }}
                  />
                </form>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <form className={classes.form} noValidate autoComplete="off">
                  <TextField
                    id="outlined-basic"
                    label="Mobile No"
                    name="mobile"
                    fullWidth
                    variant="outlined"
                    type="tel"
                    value={state.mobile}
                    onChange={handleChange}
                    inputProps={{
                      maxlength: 10
                    }}
                  />
                </form>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <form className={classes.form} noValidate autoComplete="off">
                  <TextField
                    id="outlined-basic"
                    label="Consumer No"
                    name="consumerNo"
                    variant="outlined"
                    fullWidth
                    type="text"
                    value={state.consumerNo}
                    onChange={handleChange}
                  />
                </form>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <form className={classes.form} noValidate autoComplete="off">
                  <TextField
                    id="outlined-basic"
                    label="Registration No"
                    name="regNo"
                    variant="outlined"
                    fullWidth
                    type="text"
                    value={state.regNo}
                    onChange={handleChange}
                  />
                </form>
              </Grid>
              {/* <Grid item xs={12} sm={12} md={2} >
                                <form className={classes.form} noValidate autoComplete="off">
                                    <TextField
                                        id="outlined-basic"
                                        label="Main Agent"
                                        name="reg"
                                        variant="outlined"
                                        fullWidth
                                        type="text"
                                        value={state.mainAgent}
                                        onChange={handleChange}
                                    />
                                </form>
                            </Grid> */}
              <div
                style={{
                  textAlign: "center",
                  justifyContent: "center",
                  margin: "20px",
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={handleFind}
                >
                  FIND CUSTOMER
                </Button>
              </div>

              <Grid />
            </Grid>
          </Container>
        </div>

        <Container className={classes.cardGrid} maxWidth="md">
          <Grid className="maincontainer" style={{ textAlign: "center" }}>
            {users.length === 0 && (
              <h2 style={{ margin: "auto",marginTop:"100px" }}>Your customer data will display here!</h2>
            )}
          </Grid>
          <Grid container spacing={4} className="maincontainer">
            {users.map((user, i) => (
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  textAlign: "left",
                }}
              >
                <Grid item xs={12} sm={12} md={12} style={{ marginTop: "-40PX" }}>
                  <Card className={classes.card} key={i} >
                    <CardContent className={classes.cardContent} style={{ marginLeft: "2rem" }}>
                      <Typography color="textSecondary" gutterBottom>
                        Customer's Details
                      </Typography>
                      <CardHeader
                        action={
                          <div style={{ margin: "0px", padding: "0px" }}>
                            <IconButton aria-label="settings" onClick={handleClickOpen}>
                              <EditIcon onClick={handleClickOpen} />
                            </IconButton>
                            {getUser() ?
                              <IconButton
                                aria-label="settings"
                              >
                                <DeleteIcon onClick={() => (handleClickOpenAlert())} />
                              </IconButton> : null
                            }
                          </div>
                        }
                        //@ts-ignore
                        title={user.name.toUpperCase()}
                      />
                      <CardHeader style={{ textAlign: "center" }} />
                      <div style={{ marginTop: "-40px" }}>
                        {/* @ts-ignore */}
                        <Typography>Sl No : {user.slNo || "NA"}</Typography>
                        {/* @ts-ignore */}
                        <Typography>Name : {user.name.toUpperCase()}</Typography>
                        {/* @ts-ignore */}
                        <Typography>Main Aadhaar : {user.mainAadhaar}</Typography>
                        {/* @ts-ignore */}
                        <Typography>
                          Family Aadhaar : {user.familyAadhaar}
                        </Typography>
                        {/* @ts-ignore */}
                        <Typography>Mobile No : {user.mobile}</Typography>
                        {/* @ts-ignore */}
                        <Typography>
                          Registration No : {user.regNo || "NA"}
                        </Typography>
                        <Typography>
                          Consumer No :{user.consumerNo || "NA"}{" "}
                        </Typography>
                        {/* @ts-ignore */}
                        {/* @ts-ignore */}

                        <Typography>Main Agent : {user.mainAgent.toUpperCase()}</Typography>
                        {/* @ts-ignore */}

                        <Typography>Sub Agent : {user.subAgent || "NA"}</Typography>
                        <Typography>Remarks : {user.remarks|| "NA"}</Typography>
                        {/* @ts-ignore */}

                        <Typography>Created On : {user.date || "NA"}</Typography>

                        <Typography variant="subtitle2" gutterBottom color="primary">Added By : {user.addedBy || "NA"}</Typography>
                        {user.updatedAt != undefined &&
                          <Typography variant="subtitle2" gutterBottom color="primary">Updated On: {moment(user.updatedAt).format('LLL') || "NA"}</Typography>
                        }


                      </div>
                    </CardContent>
                    <div>

                      <Dialog
                        open={openAlert}
                        onClose={handleCloseAlert}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Make sure you want to remove this consumer?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCloseAlert} color="primary">
                            No
                          </Button>
                          <Button onClick={() => handleDelete(user)} color="primary" autoFocus>
                            Yes
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Update Customer Data :
                      </DialogTitle>
                      <DialogContent dividers>
                        {users.map((user, i) => (
                          <Grid container>
                            <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>
                              <TextField
                                id="outlined-basic"
                                label="Name"
                                name="name"
                                variant="outlined"
                                fullWidth
                                type="text"
                                value={customer.name}
                                onChange={handleChangeUser}
                              />
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>
                              <TextField
                                id="outlined-basic"
                                label="Main Aadhaar"
                                name="mainAadhaar"
                                variant="outlined"
                                fullWidth
                                type="text"
                                value={customer.mainAadhaar}
                                onChange={handleChangeUser}
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>
                              <TextField
                                id="outlined-basic"
                                label="Family Aadhaar"
                                name="familyAadhaar"
                                variant="outlined"
                                fullWidth
                                type="text"
                                value={customer.familyAadhaar}
                                onChange={handleChangeUser}
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>
                              <TextField
                                id="outlined-basic"
                                label="Mobile"
                                name="mobile"
                                variant="outlined"
                                fullWidth
                                type="number"
                                value={customer.mobile}
                                onChange={handleChangeUser}
                                onInput={(e) => {
                                  //@ts-ignore
                                  e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>
                              {customer.regNo &&
                                <TextField
                                  id="outlined-basic"
                                  label="Reg No"
                                  name="regNo"
                                  variant="outlined"
                                  fullWidth
                                  type="text"
                                  value={customer.regNo}
                                  onChange={handleChangeUser}
                                />
                              }
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>

                                <TextField
                                  id="outlined-basic"
                                  label="Consumer No"
                                  name="consumerNo"
                                  variant="outlined"
                                  fullWidth
                                  type="text"
                                  value={customer.consumerNo}
                                  onChange={handleChangeUser}
                                />
                              
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>

                 
                              <Typography style={{color:"white", backgroundColor:"black"}} variant="h5"  gutterBottom> &nbsp;  &nbsp;Main Agent : {customer.mainAgent}</Typography>
                            </Grid>

                    
        
                            <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>

                              <TextField
                                id="outlined-basic"
                                label="Sub Agent"
                                name="subAgent"
                                variant="outlined"
                                fullWidth
                                type="text"
                                value={customer.subAgent}
                                onChange={handleChangeUser}
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>

                              <TextField
                                id="outlined-basic"
                                label="Remarks"
                                name="remarks"
                                variant="outlined"
                                fullWidth
                                type="text"
                                value={customer.remarks}
                                onChange={handleChangeUser}
                              />
                            </Grid>
                          </Grid>
                        ))
                        }
                      </DialogContent>
                      <DialogActions>
                        <Button autoFocus onClick={handleupdate} color="primary"   >
                          Save & Update
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Card>
                </Grid>
              </Grid>
              
            ))}
          </Grid>
        </Container>
  
      </div>
      {/* Footer */}

      <FooterSection />

      {/* End footer */}
    </React.Fragment>
  );
};

export default Home;
