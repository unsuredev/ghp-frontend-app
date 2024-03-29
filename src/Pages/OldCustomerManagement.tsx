import React from "react";
import {
  Button,
  Typography,
  CardHeader,
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

const OldDataManagement = () => {
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
  const CHARACTER_LIMIT = 13;
  const [value, setValue] = React.useState('Not Complete');

  const handleChangeValue = (event:any) => {
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
    remarks: "",
    mobile: "",
    addedBy: "",
    installtatus:"",
    year:"",
    oldAgentName:"",
    registeredAgencyName:""
  });

  const handleChangeAgent = (event: any) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  }

  const handleChangeUser = (event: any) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const getToken = () => {
    //@ts-ignore
    return localStorage.getItem("access_token")
}

  const handleFind = async (event: any) => {
    try {
      event.preventDefault();
      if (state.mobile) {
        const result = await httpClient("old/customer/find", "POST", {
          findkey:"mobile",
          mobile: state.mobile,
        });

        if (result.data && result.data.length==0){
          return showToast("No result found", "error");
        }
        setUsers(result.data);
        setCustomer(result.data[0]);

      }
      if (state.aadhaar) {
        const result = await httpClient("old/customer/find", "POST", {
          findkey:"mainAadhaar",
          mainAadhaar: state.aadhaar,
        });

        if (result.data && result.data.length==0) { showToast("No result found", "error");}
        setUsers(result.data);
        // //@ts-ignore
        setCustomer(result.data[0]);


      }
      if (state.consumerNo) {
        const result = await httpClient("old/customer/find", "POST", {
          findkey:"consumerNo",
          consumerNo: state.consumerNo,
        });

        if (result.data && result.data.length==0){
          return showToast("No result found", "error");
        }
        setUsers(result.data);
        {/* @ts-ignore */ }
        setCustomer(result.data[0]);
      }

    } catch (error) {
      showToast("Something went wrong", "error");
    }
  };

  const handleupdate = async () => {
    setOpen(false);
    try {
      const result = await axios.post(BASE_URL + "old/customer/update", { data: customer },
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

      const result = await axios.post(BASE_URL + "old/customer/delete", { customerId: customer._id },{
        headers: { 
          encryption: false ,
          access_token:getToken()
        }
      })
      if (result.data && result.data != undefined) {
        showToast("Customer deleted successfullly", "success");
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

  const getUserName = () => {
    let token: any = localStorage.getItem("access_token");
    var decoded = jwt_decode(token);
    //@ts-ignore
    let { name } = decoded;
    if (name && name != undefined) {
      return name
    }
  }

  const getRole = () => {
    let token: any = localStorage.getItem("access_token");
    var decoded = jwt_decode(token);
    //@ts-ignore
    let { role } = decoded;
    return role;
  }



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
          <Container maxWidth="md" component="main"  style={{ marginTop: "4rem"}}>
          <h2 style={{ margin: "auto",textAlign:"center"  }}>You are interacting with 2021 earlier customer!</h2>
          <br/>
            <Grid
              container
              className="maincontainer"
              style={{ justifyContent: "center", textAlign: "center", marginTop: "-10px"}}
            >
              <Grid item xs={12} sm={12} md={4}>
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
                      maxLength: CHARACTER_LIMIT
                    }}
                  />
                </form>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
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
              <Grid item xs={12} sm={12} md={4}>
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
                  color="secondary"
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
              <h2 style={{ margin: "auto",marginTop:"100px" }}>Your consumer data will display here!</h2>
            )}
          </Grid>
          <Grid container spacing={4} className="maincontainer">
            {users.map((user, i) => (
              <Grid item xs={12} sm={12} md={6} key={i} style={{justifyContent: "center",alignContent: "center", textAlign: "left",}}>
                    {(() => {
                if (getRole() === "user" && user.mainAgent === getUserName()) {
                  return (
                <Grid item xs={12} sm={12} md={12} style={{ marginTop: "-40PX" }}>
                  <Card className={classes.card}   style={{marginTop:"40px"}}>
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
                            {getRole() === "superadmin" ?

                            <IconButton aria-label="settings" onClick={handleClickOpen}>
                              <EditIcon onClick={handleClickOpen} />
                            </IconButton>:null}
                            {getRole() === "superadmin" ?
                              <IconButton
                                aria-label="settings"
                              >
                                <DeleteIcon onClick={() => (handleClickOpenAlert())} />
                              </IconButton> : null
                            }
                          </div>
                        }
                        //@ts-ignore
                        title={user.name.toUpperCase() || "NA"}
                      />
                      <div>
                            
                        {/* @ts-ignore */}
                        <Typography>Name : {user.name.toUpperCase() || "NA"} </Typography>
                        {/* @ts-ignore */}
                        <Typography>Main Aadhaar : {user.mainAadhaar}</Typography>
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
                        <Typography color="primary">Rgistered Agency Name : {user.registeredAgencyName || "NA"}</Typography>
                        <Typography color="primary">Main Agent Name : {user.mainAgent || "NA"}</Typography>
                        {/* @ts-ignore */}
                        <Typography>Old Agent Name : {user.oldAgentName || "NA"}</Typography>
                        {/* @ts-ignore */}
                        <Typography>Sub Agent Name : {user.subAgent || "NA"}</Typography>
                        <Typography>Remarks : {user.remarks || "NA"}</Typography>
                        {/* @ts-ignore */}
                        <Typography>Created On : {moment(user.createdAt).format('LLL') || "NA"}</Typography>

                        {user.updatedAt != undefined &&
                          <Typography >Updated On: {moment(user.updatedAt).format('LLL') || "NA"}</Typography>
                        }
                                                <Typography>Year : {user.year || "NA"}</Typography>

                        <Typography >Added By : {user.addedBy || "NA"}</Typography>
                        {user.InstalationLetter && user.InstalationLetter != undefined &&
                          <Typography color="primary" >Installation : {user.installtatus}</Typography>}
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
                                <TextField
                                  id="outlined-basic"
                                  label="Rgistered Agency Name"
                                  name="registeredAgencyName"
                                  variant="outlined"
                                  fullWidth
                                  type="text"
                                  value={customer.registeredAgencyName}
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
                                label="Old Agent  Name"
                                name="oldAgentName"
                                variant="outlined"
                                fullWidth
                                type="text"
                                value={customer.oldAgentName}
                                onChange={handleChangeUser}
                              />
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
                            <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>
                              <FormControl component="fieldset">
                                <FormLabel component="legend">Year</FormLabel>
                                <RadioGroup aria-label="gender" name="year" value={customer.year} onChange={handleChangeUser} style={{ flexDirection: "row" }}>
                                  <FormControlLabel value="2017" control={<Radio />} label="2017" />
                                  <FormControlLabel value="2018" control={<Radio />} label="2018" />
                                  <FormControlLabel value="2019" control={<Radio />} label="2019" />
                                  <FormControlLabel value="2020" control={<Radio />} label="2020" />
                                </RadioGroup>
                              </FormControl>
                            </Grid>
                          </Grid>
                                
                      </DialogContent>
                      <DialogActions>
                        <Button autoFocus onClick={handleupdate} color="primary"   >
                          Save & Update
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Card>
                </Grid>
                         )
                        }
                        if ((getRole() === "user" && user.mainAgent != getUserName())) {
                          return (
                            <Card style={{backgroundColor:"#009688"}}>
                              <CardContent>
                              <Typography color="secondary">CUSTOMER REGISTERED WITH OTHER AGENT </Typography>
                              </CardContent>
                              </Card>
                          )
                        }
                      })()}

{(() => {
                if (getRole() === "speradmin") {
                  return (
                <Grid item xs={12} sm={12} md={12} style={{ marginTop: "-40PX" }}>
                  <Card className={classes.card}   style={{marginTop:"40px"}}>
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
                        title={user.name.toUpperCase() || "NA"}
                      />
                      <div>
                            
                        {/* @ts-ignore */}
                        <Typography>Name : {user.name.toUpperCase() || "NA"} </Typography>
                        {/* @ts-ignore */}
                        <Typography>Main Aadhaar : {user.mainAadhaar}</Typography>
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
                        <Typography color="primary">Rgistered Agency Name : {user.registeredAgencyName || "NA"}</Typography>
                        <Typography color="primary">Main Agent Name : {user.mainAgent || "NA"}</Typography>
                        {/* @ts-ignore */}
                        <Typography>Old Agent Name : {user.oldAgentName || "NA"}</Typography>
                        {/* @ts-ignore */}
                        <Typography>Sub Agent Name : {user.subAgent || "NA"}</Typography>
                        <Typography>Remarks : {user.remarks || "NA"}</Typography>
                        {/* @ts-ignore */}
                        <Typography>Created On : {moment(user.createdAt).format('LLL') || "NA"}</Typography>

                        {user.updatedAt != undefined &&
                          <Typography >Updated On: {moment(user.updatedAt).format('LLL') || "NA"}</Typography>
                        }
                                                <Typography>Year : {user.year || "NA"}</Typography>

                        <Typography >Added By : {user.addedBy || "NA"}</Typography>
                        {user.InstalationLetter && user.InstalationLetter != undefined &&
                          <Typography color="primary" >Installation : {user.installtatus}</Typography>}
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
                                <TextField
                                  id="outlined-basic"
                                  label="Rgistered Agency Name"
                                  name="registeredAgencyName"
                                  variant="outlined"
                                  fullWidth
                                  type="text"
                                  value={customer.registeredAgencyName}
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
                                label="Old Agent  Name"
                                name="oldAgentName"
                                variant="outlined"
                                fullWidth
                                type="text"
                                value={customer.oldAgentName}
                                onChange={handleChangeUser}
                              />
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
                            <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>
                              <FormControl component="fieldset">
                                <FormLabel component="legend">Year</FormLabel>
                                <RadioGroup aria-label="gender" name="year" value={customer.year} onChange={handleChangeUser} style={{ flexDirection: "row" }}>
                                  <FormControlLabel value="2017" control={<Radio />} label="2017" />
                                  <FormControlLabel value="2018" control={<Radio />} label="2018" />
                                  <FormControlLabel value="2019" control={<Radio />} label="2019" />
                                  <FormControlLabel value="2020" control={<Radio />} label="2020" />
                                </RadioGroup>
                              </FormControl>
                            </Grid>
                          </Grid>
                                
                      </DialogContent>
                      <DialogActions>
                        <Button autoFocus onClick={handleupdate} color="primary"   >
                          Save & Update
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Card>
                </Grid>
                         )
                        }

                      })()}

                      
              </Grid>
              
            ))}
          </Grid>
        </Container>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid className="maincontainer" style={{ textAlign: "center" }}>
            {users.length === 0 && (
              <h2 style={{ margin: "auto",marginTop:"100px" }}>Your consumer data will display here!</h2>
            )}
          </Grid>
          <Grid container spacing={4} className="maincontainer">
            {users.map((user, i) => (
              <Grid item xs={12} sm={12} md={6} key={i} style={{justifyContent: "center",alignContent: "center", textAlign: "left",}}>
                    {(() => {
                if (getRole() != "user" ) {
                  return (
                <Grid item xs={12} sm={12} md={12} style={{ marginTop: "-40PX" }}>
                  <Card className={classes.card}   style={{marginTop:"40px"}}>
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
                            {getRole() === "superadmin" ?
                            <IconButton aria-label="settings" onClick={handleClickOpen}>
                              <EditIcon onClick={handleClickOpen} />
                            </IconButton>:null}
                            {getRole() === "superadmin" ?
                              <IconButton
                                aria-label="settings"
                              >
                                <DeleteIcon onClick={() => (handleClickOpenAlert())} />
                              </IconButton> : null
                            }
                          </div>
                        }
                        //@ts-ignore
                        title={user.name.toUpperCase() || "NA"}
                      />
                      <div>
                            
                        {/* @ts-ignore */}
                        <Typography>Name : {user.name.toUpperCase() || "NA"} </Typography>
                        {/* @ts-ignore */}
                        <Typography>Main Aadhaar : {user.mainAadhaar}</Typography>
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
                        <Typography color="primary">Rgistered Agency Name : {user.registeredAgencyName || "NA"}</Typography>
                        <Typography color="primary">Main Agent Name : {user.mainAgent || "NA"}</Typography>
                        {/* @ts-ignore */}
                        <Typography>Old Agent Name : {user.oldAgentName || "NA"}</Typography>
                        {/* @ts-ignore */}
                        <Typography>Sub Agent Name : {user.subAgent || "NA"}</Typography>
                        <Typography>Remarks : {user.remarks || "NA"}</Typography>
                        {/* @ts-ignore */}
                        <Typography>Created On : {moment(user.createdAt).format('LLL') || "NA"}</Typography>
                        {user.updatedAt != undefined &&
                          <Typography >Updated On: {moment(user.updatedAt).format('LLL') || "NA"}</Typography>
                        }
                                                <Typography>Year : {user.year || "NA"}</Typography>
                        <Typography >Added By : {user.addedBy || "NA"}</Typography>
                        {user.InstalationLetter && user.InstalationLetter != undefined &&
                          <Typography color="primary" >Installation : {user.installtatus}</Typography>}
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
                                <TextField
                                  id="outlined-basic"
                                  label="Rgistered Agency Name"
                                  name="registeredAgencyName"
                                  variant="outlined"
                                  fullWidth
                                  type="text"
                                  value={customer.registeredAgencyName}
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
                                label="Old Agent  Name"
                                name="oldAgentName"
                                variant="outlined"
                                fullWidth
                                type="text"
                                value={customer.oldAgentName}
                                onChange={handleChangeUser}
                              />
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
                            <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>
                              <FormControl component="fieldset">
                                <FormLabel component="legend">Year</FormLabel>
                                <RadioGroup aria-label="gender" name="year" value={customer.year} onChange={handleChangeUser} style={{ flexDirection: "row" }}>
                                  <FormControlLabel value="2017" control={<Radio />} label="2017" />
                                  <FormControlLabel value="2018" control={<Radio />} label="2018" />
                                  <FormControlLabel value="2019" control={<Radio />} label="2019" />
                                  <FormControlLabel value="2020" control={<Radio />} label="2020" />
                                </RadioGroup>
                              </FormControl>
                            </Grid>
                          </Grid>
                                
                      </DialogContent>
                      <DialogActions>
                        <Button autoFocus onClick={handleupdate} color="primary"   >
                          Save & Update
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Card>
                </Grid>
                        )
                        }
                        if ((getRole() === "user" && user.mainAgent != getUserName())) {
                          return (
                            <Card style={{backgroundColor:"#009688"}}>
                              <CardContent>
                              <Typography color="secondary">CUSTOMER REGISTERED WITH OTHER AGENT </Typography>
                              </CardContent>
                              </Card>
                          )
                        }
                      })()}
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

export default OldDataManagement;
