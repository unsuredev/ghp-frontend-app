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
import InputLabel from '@material-ui/core/InputLabel';
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import ResponsiveDrawer from "./Drawer";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import clsx from 'clsx';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { getUserName, getRole, getToken } from '../Common/helper';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  root: {
    margin: theme.spacing(1),
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

  imgSize: {
    height: 200,
    width: 400
  },
  formControl: {
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  cover: {
    width: 151,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
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
  const [agentList, setAgetList] = React.useState([]);
  const [userObj, setUserObj] = React.useState({})
  const [openAlert, setOpenAlert] = React.useState(false);
  const CHARACTER_LIMIT = 12;
  const [value, setValue] = React.useState('Not Complete');

  const handleChangeValue = (event: any) => {
    console.log("value", event.target.value)
    setValue(event.target.value);
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenByAgent = () => {
    setOpen(true);
  };

  const handleCloseByAgent = () => {
    setOpen(false);
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
    fileNumber: "",
    familyAadhaar: ""

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
  };
  const [checked, setChecked] = React.useState(false);
  const [free, setFree] = React.useState(false)
  const handleChangeFree = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFree(!free);
  };
  const handleChangeCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
  };


  const [customer, setCustomer] = React.useState({
    name: "",
    mainAadhaar: "",
    consumerNo: "",
    newConsumerNo: "",
    familyAadhaar: "",
    regNo: "",
    mainAgent: "",
    subAgent: "",
    registeredAgencyName: "",
    newRegisteredAgency: "",
    remarks: "",
    mobile: "",
    addedBy: "",
    installtatus: "",
    fileNo: 0,
    isSingleWomen: false,
    isFreeDelivery: false,
    registrationStatus: "",
    contactNumber: ""
  });

  const handleChangeAgent = (event: any) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
    //@ts-ignore
  }

  const handleChangeUser = (event: any) => {
    console.log("value", event.target.value)

    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };


  const handleFind = async (event: any) => {
    try {
      event.preventDefault();
      if (state.mobile) {
        const result = await httpClient("customer/find", "POST", {
          findkey: "mobile",
          mobile: state.mobile,
        });

        if (!result.data && result.data === undefined)
          return showToast("No result found", "error");
        setUsers([result.data]);
        setCustomer(result.data);

      }
      if (state.aadhaar) {
        const result = await httpClient("customer/find", "POST", {
          findkey: "mainAadhaar",
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
          findkey: "consumerNo",
          consumerNo: state.consumerNo,
        });

        if (!result.data && result.data === undefined)
          return showToast("No result found", "error");
        setUsers([result.data]);
        {/* @ts-ignore */ }
        setCustomer(result.data);
      }
      if (state.familyAadhaar) {
        const result = await httpClient("customer/find", "POST", {
          findkey: "familyAadhaar",
          familyAadhaar: state.familyAadhaar,
        });
        if (!result.data && result.data === undefined)
          return showToast("No result found", "error");
        setUsers([result.data]);
        setCustomer(result.data);
        //@ts-ignore

      }
      if (state.fileNumber) {
        const result = await httpClient("customer/find", "POST", {
          findkey: "regNo",
          regNo: state.fileNumber,
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
      console.log("updated value", customer)
      const result = await axios.post(BASE_URL + "customer/update", {
        name: customer.name,
        mainAadhaar: customer.mainAadhaar,
        consumerNo: customer.consumerNo,
        newConsumerNo: customer.newConsumerNo,
        familyAadhaar: customer.familyAadhaar,
        mainAgent: customer.mainAgent,
        subAgent: customer.subAgent,
        registeredAgencyName: customer.registeredAgencyName,
        newRegisteredAgency: customer.newRegisteredAgency,
        remarks: customer.remarks,
        mobile: customer.mobile,
        addedBy: customer.addedBy,
        installtatus: customer.installtatus,
        regNo: customer.regNo,
        isSingleWomen: checked,
        registrationStatus: customer.registrationStatus,
        contactNumber: customer.contactNumber,
        isFreeDelivery: free,
        updatedBy: getUserName()
      },
        {
          headers: {
            encryption: false,
            token: getToken()
          },
        })


      if (result.data.data && result.data != undefined) {
        showToast("Customer updated successfullly", "success");

      }
    } catch (error) {
      if (error) {
        //@ts-ignore
        showToast(error.response.data.errorMessage, "error")
      }
    }
  };
  const handleDelete = async (customer: any) => {
    try {

      const result = await axios.post(BASE_URL + "customer/delete", { customerId: customer._id }, {
        headers: {
          encryption: false,
          token: getToken()
        }
      })
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
    let { role } = decoded;
    if (role === "superadmin") {
      return true;
    } else {
      return false;
    }
  };

  const isSuperAdmin = () => {
    let token: any = localStorage.getItem("access_token");

    var decoded = jwt_decode(token);
    //@ts-ignore
    const { role } = decoded;
    return role === "superadmin" ? true : false
  };



  React.useEffect(() => {
    document.title = "Customer | Jaman HP Gas";
    findName()
    getUser()
    getCharacters()

    const timer = setInterval(() => {
      setDate(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);


  async function getCharacters() {
    const result = await axios.get(BASE_URL + "agent/getall/active", {
      headers: {
        encryption: false,
        token: getToken()
      },
    });
    //@ts-ignore
    setAgetList(result.data.data.agents)
    //@ts-ignore
    setAgetList(result.data.data.agents.map(({ name }) => ({ label: name, value: name })));
  }

  const OldConsumerUpdatePermission = (customer: any) => {
    return customer.registeredAgencyName === customer.newRegisteredAgencyName ? true : false
  }


  return (
    <React.Fragment>
      <CssBaseline />
      <ResponsiveDrawer />
      <div className={classes.heroContent}>

        <Container maxWidth="md" component="main" style={{ marginTop: "20px", paddingTop: "10px" }}>
          {userGreetings()}

          <Grid
            container
            className="maincontainer"
            style={{ justifyContent: "center", textAlign: "center", marginTop: "-10px" }}
          >
            <Grid item xs={12} sm={12} md={2}>
              <form className={classes.form} noValidate autoComplete="off">
                <TextField
                  id="outlined-basic"
                  label="Main Aadhaar"
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
            <Grid item xs={12} sm={12} md={2}>
              <form className={classes.form} noValidate autoComplete="off">
                <TextField
                  id="outlined-basic"
                  label="Family Aadhaar"
                  name="familyAadhaar"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={state.familyAadhaar}
                  onChange={handleChange}
                />
              </form>
            </Grid>
            <Grid item xs={12} sm={12} md={2}>
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
                    maxLength: 10
                  }}
                />
              </form>
            </Grid>
            <Grid item xs={12} sm={12} md={2}>
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

            <Grid item xs={12} sm={12} md={2} >
              <form className={classes.form} noValidate autoComplete="off">
                <TextField
                  id="outlined-basic"
                  label="File No "
                  name="fileNumber"
                  variant="outlined"
                  fullWidth
                  type="text"
                  value={state.fileNumber}
                  onChange={handleChange}
                />
              </form>
            </Grid>
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
                onClick={handleFind}
                style={{ backgroundColor: "#009688", color: "white" }}
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
            <h2 style={{ margin: "auto", marginTop: "100px" }}>Your consumer data will display here!</h2>
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

              {(() => {
                if (getRole() === "user" && user.mainAgent === getUserName()) {
                  return (
                    <Grid item xs={12} sm={12} md={12} style={{ marginTop: "-40PX" }}>
                      <Card className={classes.card} key={i} style={{ marginTop: "40px", backgroundColor: "#009688", color: "white" }} >
                        {user.isSingleWomen
                          ? <Typography color="secondary"><ErrorOutlineIcon /> This registration is single women.Please submit family aadhaar to distributor otherwise this connection will be block shortly! </Typography>
                          : ""}
                        <CardHeader
                          action={
                            <div style={{ margin: "0px", padding: "0px" }}>
                              {user.installtatus === "Complete" ?
                                <IconButton aria-label="settings">
                                  <CheckCircleIcon style={{ color: "#ffea00" }} />
                                </IconButton> : null}
                              <IconButton aria-label="settings" onClick={handleClickOpenByAgent}>
                                <EditIcon onClick={handleCloseByAgent} />
                              </IconButton>
                            </div>
                          }
                          //@ts-ignore agent card
                          title={user.name.toUpperCase()}

                        />

                        <CardContent className={classes.cardContent} style={{ marginLeft: "2rem" }}>
                          <Typography color="textSecondary" gutterBottom>
                            Consumer's Details
                          </Typography>

                          {/* @ts-ignore */}
                          <Typography>Name : {user.name.toUpperCase()}  </Typography>
                          {/* @ts-ignore */}
                          <Typography>Main Aadhaar : {user.mainAadhaar}</Typography>
                          {/* @ts-ignore */}
                          <Typography>
                            Family Aadhaar : {user.familyAadhaar}
                          </Typography>
                          {/* @ts-ignore */}
                          <Typography>Mobile No : {user.mobile}</Typography>
                          {/* @ts-ignore */}
                          <Typography>Contact No : {user.contactNumber}</Typography>
                          {/* @ts-ignore */}
                          <Typography>
                            Registration No : {user.regNo || "NA"}
                          </Typography>
                          <Typography>
                            Consumer No : <span style={{ color: "#c6ff00" }}>{user.consumerNo || "NA"}</span>

                          </Typography>
                          <Typography>
                            Active Consumer No : <span style={{ color: "#c6ff00" }}>{user.newConsumerNo || "NA"}</span>

                          </Typography>
                          {/* @ts-ignore */}
                          <Typography>Main Agent : {user.mainAgent.toUpperCase()}</Typography>
                          {/* @ts-ignore */}
                          <Typography>Sub Agent : {user.subAgent || "NA"}</Typography>
                          <Typography>Registered Agency: <span style={{ color: "#c6ff00" }}> {user.registeredAgencyName || "NA"}</span> </Typography>
                          <Typography>Active Agency: <span style={{ color: "#c6ff00" }}> {user.newRegisteredAgency || "NA"}</span> </Typography>

                          <Typography>Remarks : {user.remarks || "NA"}</Typography>
                          {/* @ts-ignore */}
                          <Typography>Registration status : {user.registrationStatus || "NA"}</Typography>
                          {/* @ts-ignore */}
                          <Typography >Single Women : {user.isSingleWomen ? "YES" : "NO"}</Typography>
                          {/* @ts-ignore */}
                          {user.InstalationLetter && user.InstalationLetter != undefined &&
                            <Typography color="primary" >Installation : {user.installtatus}</Typography>}
                        </CardContent>
                      </Card>


                      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                          Update Customer Data Agent:
                        </DialogTitle>
                        <DialogContent dividers>
                          {users.map((user, i) => (
                            <Grid container>
                              <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>
                                <TextField
                                  id="outlined-basic"
                                  label="Contact Number"
                                  name="contactNumber"
                                  variant="outlined"
                                  fullWidth
                                  type="number"
                                  value={customer.contactNumber}
                                  onChange={handleChangeUser}
                                  onInput={(e) => {
                                    //@ts-ignore
                                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                  }}
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

                      <Container className={classes.cardGrid} maxWidth="md">
                        {/* End hero unit */}
                        <Grid container spacing={4} style={{ marginRight: "1rem" }}>
                          {users.map((user, i) => (
                            <Grid item key={i} xs={12} sm={6} md={4}>
                              <div>
                                <Typography component="h2" variant="h5">
                                  Photo:    Installation Letter
                                </Typography>
                                <br></br>
                                {user.InstalationLetter ?
                                  <div>
                                    <img
                                      src={user.InstalationLetter}
                                      alt="new"
                                    />
                                    <a href={user.InstalationLetter} target="_blank">Download</a>
                                  </div> : "No Image found"}
                              </div>
                              <br></br>
                              <div>
                                <Typography component="h2" variant="h5">
                                  Photo:   Satisfaction Letter
                                </Typography>
                                <br></br>
                                {user.satisfactionLetter ?
                                  <div>
                                    <img
                                      src={user.satisfactionLetter}
                                      alt="new"
                                    />
                                    {/* <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        startIcon={<CloudDownloadIcon />}
                                    >
                                        Download
                                    </Button> */}
                                    <a href={user.satisfactionLetter} target="_blank">Download</a>
                                  </div> : "No Image found"}
                              </div>
                              <br></br>
                              <div>
                                <Typography component="h2" variant="h5">
                                  Photo:  Other Document
                                </Typography>
                                <br></br>
                                {user.otherLetter ?
                                  <div>
                                    <img
                                      src={user.otherLetter}
                                      alt="new"
                                    />
                                    {/* <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        startIcon={<CloudDownloadIcon />}
                                    >
                                        Download
                                    </Button> */}
                                    <a href={user.otherLetter} target="_blank">Download</a>
                                  </div> : "No Image found"}

                              </div>
                            </Grid>
                          ))}
                        </Grid>
                      </Container>
                    </Grid>
                  )
                }
                if ((getRole() === "user" && user.mainAgent != getUserName())) {
                  return (
                    <div><h1>CUSTOMER REGISTERED WITH OTHER AGENT</h1></div>
                  )
                }
              })()}

              {(() => {
                if (getRole() != "user") {
                  return (
                    <Grid container>
                      <Grid item xs={12} sm={12} md={12} >

                        <Card className={classes.card} key={i} style={{ backgroundColor: "#009688", color: "white" }}  >
                          {user.isSingleWomen
                            ? <Typography color="secondary"><ErrorOutlineIcon /> This registration is single women.Please submit family aadhaar to distributor otherwise this connection will be block shortly! </Typography>
                            : ""}
                          <CardHeader
                            action={
                              <div style={{ margin: "0px", padding: "0px" }}>
                                {user.installtatus === "Complete" ?
                                  <IconButton aria-label="settings">
                                    <CheckCircleIcon style={{ color: "#ffea00" }} />
                                  </IconButton> : null}
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

                          <CardContent className={classes.cardContent}>
                            {/* @ts-ignore */}
                            <Typography >Main Aadhaar : <span style={{ color: "#ffea00" }}>{user.mainAadhaar}</span> </Typography>
                            {/* @ts-ignore */}
                            <Typography >
                              Family Aadhaar : {user.familyAadhaar}
                            </Typography>
                            {/* @ts-ignore */}
                            <Typography >Mobile No : {user.mobile}</Typography>

                            {/* @ts-ignore */}
                            <Typography >Contact No : {user.contactNumber || "NA"}</Typography>
                            {/* @ts-ignore */}
                            <Typography>Main Agent : <span style={{ color: "#ffea00" }}>{user.mainAgent.toUpperCase()}</span></Typography>
                            {/* @ts-ignore */}

                            <Typography variant="subtitle1" gutterBottom>Sub Agent : {user.subAgent || "NA"}</Typography>
                            <Typography>Active Agency: <span style={{ color: "#c6ff00" }}> {user.newRegisteredAgency || "NA"}</span> </Typography>
                            {/* @ts-ignore */}
                            <Typography >
                              Active Consumer No : <span style={{ color: "#c6ff00" }}>{user.newConsumerNo || "NA"}</span>
                            </Typography>
                            <Typography> Registration Status : {user.registrationStatus || "NA"}</Typography>

                            {/* @ts-ignore */}
                            <Typography >Registered Agency Name : <span style={{ color: "#ffea00" }}> {user.registeredAgencyName || "NA"}</span> </Typography>
                            <Typography> Status : {user.registrationStatus || "NA"}</Typography>
                            {/* @ts-ignore */}
                            <Typography >Single Women : {user.isSingleWomen ? "YES" : "NO"}</Typography>
                            {/* @ts-ignore */}

                            <Typography>Free Delivery : {user.isFreeDelivery ? "YES" : "NO"}
                              {/* @ts-ignore */}
                              <Typography >Contact No : {user.contactNumber}</Typography>
                              {/* @ts-ignore */}

                              <Typography >
                                File No : {user.regNo || "NA"}
                              </Typography>                              {/* @ts-ignore */}

                            </Typography>
                            {
                              user.InstalationLetter && user.InstalationLetter != undefined &&
                              <Typography >Installation : <span style={{ color: "#ffea00" }}> {user.installtatus}</span> </Typography>
                            }

                            <Typography color="secondary">Remarks : {user.remarks || "NA"}</Typography>

                          </CardContent >
                          <CardActions disableSpacing>
                            <Typography >View more </Typography>

                            <IconButton
                              className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                              })}
                              onClick={handleExpandClick}
                              aria-expanded={expanded}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </IconButton>
                          </CardActions>
                          <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>

                              {/* @ts-ignore */}
                              <Typography>Registered Agency: <span style={{ color: "#c6ff00" }}> {user.registeredAgencyName || "NA"}</span> </Typography>
                              <Typography >
                                Consumer No : <span style={{ color: "#c6ff00" }}>{user.consumerNo || "NA"}</span>
                              </Typography>

                              {/* @ts-ignore */}
                              <Typography>Created On : {moment(user.createdAt).format('LLL') || "NA"}</Typography>
                              {
                                user.updatedAt != undefined &&
                                <Typography >Updated On: {moment(user.updatedAt).format('LLL') || "NA"}</Typography>
                              }
                              <Typography >Added By : {user.addedBy || "NA"}</Typography>
                              {/* @ts-ignore */}
                              <Typography>Updated By : {user.updatedBy || "NA"}</Typography>


                              <img src={user.InstalationLetter} alt={user.name} height="270px" width="410px" />

                            </CardContent >
                          </Collapse >
                        </Card >
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
                                    <Tooltip title="Main Aadhar not allowed to update !">
                                      <TextField
                                        id="outlined-basic"
                                        label="Main Aadhaar"
                                        name="mainAadhaar"
                                        fullWidth
                                        type="text"
                                        value={customer.mainAadhaar}
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        variant="filled"
                                      />
                                    </Tooltip>
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
                                      label="Mobile Number"
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
                                    <TextField
                                      id="outlined-basic"
                                      label="Contact Number"
                                      name="contactNumber"
                                      variant="outlined"
                                      fullWidth
                                      type="number"
                                      value={customer.contactNumber}
                                      onChange={handleChangeUser}
                                      onInput={(e) => {
                                        //@ts-ignore
                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                      }}
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>
                                    <TextField
                                      id="outlined-basic"
                                      label="File No"
                                      name="regNo"
                                      variant="outlined"
                                      fullWidth
                                      type="text"
                                      value={customer.regNo}
                                      onChange={handleChangeUser}
                                    />
                                  </Grid>

                                  <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>
                                    <Tooltip title="Old consumer is not allowed to update !">
                                      <TextField
                                        id="outlined-basic"
                                        label="Old consumer No"
                                        name="consumerNo"
                                        variant="filled"
                                        fullWidth
                                        type="text"
                                        value={customer.consumerNo}
                                        onChange={handleChangeUser}
                                        InputProps={{
                                          readOnly: isSuperAdmin(),
                                        }}
                                      />
                                    </Tooltip>

                                  </Grid>
                                  <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>
                                    <TextField
                                      id="outlined-basic"
                                      label="Active consumer No"
                                      name="newConsumerNo"
                                      variant="outlined"
                                      fullWidth
                                      type="text"
                                      value={customer.newConsumerNo}
                                      onChange={handleChangeUser}

                                    />

                                  </Grid>
                                  <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>

                                    <Tooltip title="Main Agent is not allowed to update !">
                                      <TextField
                                        id="outlined-basic"
                                        label="Main Agent"
                                        name="mainAgent"
                                        fullWidth
                                        type="text"
                                        value={customer.mainAgent}
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        variant="filled"
                                      />
                                    </Tooltip>
                                  </Grid>
                                  {
                                    getUser() ? (
                                      <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>
                                        <FormControl variant="outlined" className={classes.formControl}>
                                          <InputLabel id="demo-simple-select-required-label">Update new Agent *</InputLabel>
                                          <Select
                                            onChange={handleChangeAgent}
                                            displayEmpty
                                            className={classes.selectEmpty}
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            name="mainAgent"
                                          >
                                            {agentList.map(item => (
                                              <MenuItem
                                                //@ts-ignore
                                                key={item.label} value={item.value} >{item.label}</MenuItem>
                                            ))}
                                          </Select>
                                        </FormControl>
                                      </Grid>) : null
                                  }

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

                                    <Tooltip title="Main Agent is not allowed to update !">
                                      <TextField
                                        id="outlined-basic"
                                        label="Registered Agency"
                                        name="registeredAgencyName"
                                        value={customer.registeredAgencyName}
                                        fullWidth
                                        type="text"
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        variant="filled"
                                      />
                                    </Tooltip>
                                  </Grid>
                                  <Grid item xs={12} sm={12} md={12} >
                                    <TextField
                                      id="outlined-basic"
                                      label="Active Registered Agency"
                                      value={customer.newRegisteredAgency}
                                      fullWidth
                                      type="text"
                                      variant="outlined"
                                      onChange={handleChangeUser}
                                      name="newRegisteredAgency"
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={12} md={12} >
                                    <TextField style={{ color: "primary" }}
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

                                  {getUser() ?
                                    <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>
                                      <FormControl component="fieldset">
                                        <FormLabel component="legend">Installation Status</FormLabel>
                                        <RadioGroup aria-label="gender" name="installtatus" value={customer.installtatus} onChange={handleChangeUser} style={{ flexDirection: "row" }}>
                                          <FormControlLabel value="Not Complete" control={<Radio />} label="Not Complete" />
                                          <FormControlLabel value="Complete" control={<Radio />} label="Complete" />
                                        </RadioGroup>
                                      </FormControl>
                                    </Grid> : null
                                  }
                                  <Grid item xs={12} sm={12} md={12} >
                                    <FormControl variant="outlined" >
                                      <InputLabel id="demo-simple-select-label">Registration Status</InputLabel>
                                      <Select
                                        style={{ width: "35rem" }}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="registrationStatus"
                                        value={customer.registrationStatus} onChange={handleChangeUser}

                                      >
                                        <MenuItem value="">None</MenuItem>
                                        <MenuItem value="Fingerprint Pending">Fingerprint Pending </MenuItem>
                                        <MenuItem value="Fingerprint Completed">Fingerprint Completed</MenuItem>
                                        <MenuItem value="Pending Documents">Pending Documents</MenuItem>
                                        <MenuItem value="Reject/Cancel">Reject/Cancel</MenuItem>
                                        <MenuItem value="Reject Doc Physical Return">Reject Doc Physical Return</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                  <Typography >Single Women : &nbsp;
                                    <FormControlLabel
                                      control={<Checkbox checked={checked} onChange={handleChangeCheck} name="isSingleWomen" />}
                                      label=""
                                    />
                                  </Typography>
                                  <Typography>Free Delivery : &nbsp;
                                    <FormControlLabel
                                      control={<Checkbox checked={free} onChange={handleChangeFree} name="isFreeDelivery" />}
                                      label=""
                                    />
                                  </Typography>
                                </Grid>
                              ))
                              }
                            </DialogContent>
                            <DialogActions>
                              <Button autoFocus onClick={handleupdate} color="primary"   >
                                Save & Update
                              </Button>
                            </DialogActions>
                          </Dialog >
                        </div >
                      </Grid>
                    </Grid>
                  )
                }
              })()}
            </Grid>
          ))}
        </Grid>
      </Container>
      <FooterSection />
    </React.Fragment>
  );
}

export default Home;
