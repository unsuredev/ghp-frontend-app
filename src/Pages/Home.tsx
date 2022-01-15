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
  },
  formControl: {
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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
  const [agentList, setAgetList] = React.useState([]);

  const [userObj, setUserObj] = React.useState({})
  const [openAlert, setOpenAlert] = React.useState(false);
  const CHARACTER_LIMIT = 12;
  const [value, setValue] = React.useState('Not Complete');

  const handleChangeValue = (event:any) => {
    console.log("value", event.target.value)
    setValue(event.target.value);
  };


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
    familyAadhaar:""
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
    registeredAgencyName:"",
    remarks: "",
    mobile: "",
    addedBy: "",
    installtatus:""
  });

  const handleChangeAgent = (event: any) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
    //@ts-ignore
  }

  const handleChangeUser = (event: any) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
    //@ts-ignore
  };

  const getToken = () => {
    //@ts-ignore
    return localStorage.getItem("access_token")
}


  const handleFind = async (event: any) => {
    try {
      event.preventDefault();
      if (state.mobile) {
        const result = await httpClient("customer/find", "POST", {
          findkey:"mobile",
          mobile: state.mobile,
        });

        if (!result.data && result.data === undefined)
          return showToast("No result found", "error");
        setUsers([result.data]);
        setCustomer(result.data);

      }
      if (state.aadhaar) {
        const result = await httpClient("customer/find", "POST", {
          findkey:"mainAadhaar",
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
          findkey:"consumerNo",
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
          findkey:"familyAadhaar",
          familyAadhaar: state.familyAadhaar,
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
      const result = await axios.post(BASE_URL + "customer/update", { data: customer },
     {
      headers: { 
        encryption: false ,
        access_token:getToken()
      },
  })


      if (result.data.data && result.data != undefined) {
        showToast("Customer updated successfullly", "success");
        
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

      const result = await axios.post(BASE_URL + "customer/delete", { customerId: customer._id },{
        headers: { 
          encryption: false ,
          access_token:getToken()
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
    let { user_id } = decoded;
      if (user_id === "HHP_91c528fa-31f8-46ff-8c0f-d786cc7487ef") {

      return true;
    } else {
      return false;
    }
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
        access_token: getToken()
      },
    });
 //@ts-ignore
    setAgetList(result.data.data.agents)
    //@ts-ignore
    setAgetList(result.data.data.agents.map(({ name  }) => ({ label: name, value: name })));
}



  return (
    <React.Fragment>
      <CssBaseline />
      <ResponsiveDrawer />
      <div >
        <div className={classes.heroContent}>
          <Container maxWidth="md" component="main" style={{ marginTop: "-20px", paddingTop: "-10px" }}>
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
                    label="Family Aadhaar No"
                    name="familyAadhaar"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={state.familyAadhaar}
                    onChange={handleChange}
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
                  <Card className={classes.card} key={i}  style={{marginTop:"40px"}}>
                  <div style={{display:"flex"}}>
                  </div>
                    <CardContent className={classes.cardContent} style={{ marginLeft: "2rem" }}>
                      <Typography color="textSecondary" gutterBottom>
                        Customer's Details                                
                      </Typography>
                      <CardHeader
                        action={
                          <div style={{ margin: "0px", padding: "0px" }}>
                            {user.installtatus==="Complete"?
                            <IconButton aria-label="settings">
                              <CheckCircleIcon style={{ color: "blue" }} />
                            </IconButton>:null}
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
                      <div>
                        {/* @ts-ignore */}
                        <Typography>Name : {user.name.toUpperCase()} </Typography>
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
                        <Typography>Registered Agency Name : <span style={{color:"red"}}> {user.registeredAgecnyName || "NA"}</span> </Typography>

                        <Typography>Remarks : {user.remarks|| "NA"}</Typography>
                        {/* @ts-ignore */}

                        <Typography>Created On : {moment(user.createdAt).format('LLL') || "NA"}</Typography>

                        {user.updatedAt != undefined &&
                          <Typography >Updated On: {moment(user.updatedAt).format('LLL') || "NA"}</Typography>
                        }
                        <Typography >Added By : {user.addedBy || "NA"}</Typography>
                        {user.InstalationLetter &&user.InstalationLetter!=undefined &&
                        <Typography color="primary" >Installation : {user.installtatus}</Typography> }

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
                            <Typography style={{color:"white", backgroundColor:"black"}} variant="h5"  gutterBottom> &nbsp;  &nbsp;Main Agent : {customer.mainAgent}</Typography>

                            {getUser() ? (
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
                            </Grid>):null}
        
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
                            <Grid item xs={12} sm={12} md={12} >
                        <FormControl variant="outlined" >
                          <InputLabel id="demo-simple-select-filled-label">Registered Agency Name</InputLabel>
                          <Select
                          style={{width:"35rem"}}
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={customer.registeredAgencyName}
                            onChange={handleChangeUser}
                            fullWidth
                            name="registeredAgencyName"
                          >

                            <MenuItem value="JAMAN HP GAS 2021">JAMAN HP GAS 2021</MenuItem>
                            <MenuItem value="GOURIPUR HP GAS PSV 2021">GOURIPUR HP GAS PSV 2021</MenuItem>
                            <MenuItem value="JAMAN HP GAS CLEAR KYC 2019">JAMAN HP GAS CLEAR KYC 2019</MenuItem>
                          </Select>
                        </FormControl>
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
                            {getUser() ?
                            <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>
                              <FormControl component="fieldset">
                                <FormLabel component="legend">Installation Status</FormLabel>

                                <RadioGroup aria-label="gender" name="installtatus"  value={customer.installtatus} onChange={handleChangeUser} style={{flexDirection:"row"}}>
                                  <FormControlLabel  value="Not Complete" control={<Radio />} label="Not Complete" />
                                  <FormControlLabel  value="Complete" control={<Radio />} label="Complete" />
                                </RadioGroup>
                              </FormControl>
                            </Grid>:null}
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
