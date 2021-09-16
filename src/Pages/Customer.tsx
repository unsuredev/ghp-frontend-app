import React from "react";
import {
  Button,
  Grid,
  makeStyles,
  CssBaseline,
  TextField, Typography
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { ToastContext } from "../Common/ToastProvider";
import jwt_decode from "jwt-decode";
import InputLabel from '@material-ui/core/InputLabel';
import ResponsiveDrawer from "./Drawer";
import { BASE_URL } from "../Common/constant";
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: "auto",
  },
  root: {
    flexGrow: 1,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));

const Customer = () => {
  const classes = useStyles();
  const { showToast } = React.useContext(ToastContext);
  const [lastUser, setLastUser] = React.useState({});
  const [agentList, setAgetList] = React.useState([]);
  const [disabled, setDisabled]=React.useState(false)
  const CHARACTER_LIMIT = 12;


  React.useEffect(() => {
    let token: any = localStorage.getItem("access_token");

    var decoded = jwt_decode(token);
    //@ts-ignore
    let { name } = decoded;
    if (name && name != undefined) {
      if (name) {
        customer.addedBy = name;
      }
    }

    getCharacters();
  }, []);


  const getToken = () => {
    //@ts-ignore
    return localStorage.getItem("access_token")
}

      
  async function getCharacters() {
    const result = await axios.get(BASE_URL + "agent/getall", {
      headers: {
        encryption: false,
        access_token: getToken()
      },
    });

    console.log("res==>", result.data)
    // setAgetList(result.data.result)
    //@ts-ignore
    // setAgetList(body.data.result.map(({ name  }) => ({ label: name, value: name })));
    console.log("res==>2", agentList)
}

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

  const handleChange = (event: any) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
    //@ts-ignore
  };

  const handleRegister = async (e: any) => {
    try {
      e.preventDefault();
      setDisabled(true)
      const result = await axios.post(BASE_URL + "customer/add", customer)
      if (result.data.data && result.data != null) {
        setLastUser(result.data.data.result);
        showToast("Consumer added susccesssfully", "success");
        setDisabled(false)
      }
    } catch (error) {
      if (error) {
        //@ts-ignore
        showToast(error.response.data.message, "error")
      }
    }
  };



  


  return (
    <React.Fragment>
      <CssBaseline />
      <ResponsiveDrawer />


      <div className={classes.root}>
      <Grid container spacing={1}>
      <Grid item xs={12} sm={12} md={3}     lg={3}>
        </Grid>
        <Grid item xs={12} sm={12} md={4}     lg={4} >
            <div>
              <h2>New Customer Registration</h2>
              <form className={classes.form} noValidate>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="name"
                      name="name"
                      variant="outlined"
                      required
                      fullWidth
                      id="name"
                      label="Full Name"
                      autoFocus
                      value={customer.name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="mainAadhaar"
                      type="text"
                      label="Main Aadhaar"
                      name="mainAadhaar"
                      autoComplete="mainAadhaar"
                      onChange={handleChange}
                      value={customer.mainAadhaar}
                      inputProps={{
                        maxlength: CHARACTER_LIMIT
                      }}

                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="faadhaar"
                      type="text" label="Family Adhaar"
                      name="familyAadhaar"
                      autoComplete="faadhaar"
                      onChange={handleChange}
                      value={customer.familyAadhaar}
                      inputProps={{
                        maxlength: CHARACTER_LIMIT
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="mobile"
                      label="Mobile"
                      type="number"
                      id="mobile"
                      autoComplete="current-mobile"
                      onChange={handleChange}
                      value={customer.mobile}
                      onInput={(e) => {
                        //@ts-ignore
                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="regNo"
                      label="Registration  No"
                      type="text"
                      id="Registration"
                      autoComplete="Registration"
                      onChange={handleChange}
                      value={customer.regNo}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="consumerNo"
                      label="Consumer No"
                      id="consumerNo"
                      type="number"
                      autoComplete="consumerNo"
                      onChange={handleChange}
                      value={customer.consumerNo}
                      onInput={(e) => {
                        //@ts-ignore
                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
                      }}
                    />
                  </Grid>

                  {/* <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="mainAgent"
                      label="Main Agent"
                      type="mainAgent"
                      id="mainAgent"
                      autoComplete="mainAgent"
                      onChange={handleChange}
                      value={customer.mainAgent}
                    />
                  </Grid> */}
                  <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>
                    <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-required-label">Main Agent *</InputLabel>
                      <Select
                        onChange={handleChange}
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
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="subAgent"
                      label="Sub Agent"
                      type="subAgent"
                      id="subAgent"
                      autoComplete="subAgent"
                      onChange={handleChange}
                      value={customer.subAgent}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="remarks"
                      label="Remarks"
                      type="remarks"
                      id="remarks"
                      autoComplete="remarks"
                      onChange={handleChange}
                      value={customer.remarks}
                    />
                  </Grid>
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleRegister}
                >
                  Register Customer
                </Button>
              </form>
            </div>
          </Grid>
          <Grid style={{paddingTop:"20px"}}>
            <h2>Last Registration Details</h2>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {/* @ts-ignore */}
                    <TableCell align="left">Customer Name : {lastUser.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    {/* @ts-ignore */}
                    <TableCell align="left"> Main Aadhaar :{lastUser.mainAadhaar}</TableCell>
                  </TableRow>
                  <TableRow>
                    {/* @ts-ignore */}
                    <TableCell align="left"> Family Aadhaar :{lastUser.familyAadhaar}</TableCell>
                  </TableRow>
                  <TableRow>
                    {/* @ts-ignore */}
                    <TableCell align="left">          Mobile No: {lastUser.mobile}</TableCell>
                  </TableRow>
                  <TableRow>
                    {/* @ts-ignore */}
                    <TableCell align="left">   Registration No :{lastUser.regNo}</TableCell>
                  </TableRow>
                  <TableRow>
                    {/* @ts-ignore */}
                    <TableCell align="left"> Consumer No :{lastUser.consumerNo}</TableCell>
                  </TableRow>
                  <TableRow>
                    {/* @ts-ignore */}
                    <TableCell align="left"> Main Agent :{lastUser.mainAgent}</TableCell>
                  </TableRow>
                  <TableRow>
                    {/* @ts-ignore */}
                    <TableCell align="left">Sub Agent :{lastUser.subAgent}</TableCell>
                  </TableRow>
                  <TableRow>
                    {/* @ts-ignore */}
                    <TableCell align="left">  Remarks  :{lastUser.remarks}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
    </div>
    </React.Fragment>
  );
};

export default Customer;
