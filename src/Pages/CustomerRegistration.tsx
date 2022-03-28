import React from "react";
import {
  Button,
  Grid,
  makeStyles,
  CssBaseline,
  TextField
} from "@material-ui/core";
import * as Yup from 'yup';
import { Formik } from 'formik';
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

}));

const CustomerRegistration = () => {
  const classes = useStyles();
  const { showToast } = React.useContext(ToastContext);
  const [lastUser, setLastUser] = React.useState({});
  const [agentList, setAgetList] = React.useState([]);
  const [disabled, setDisabled]=React.useState(false)
  const CHARACTER_LIMIT = 12;


  React.useEffect(() => {
    getCharacters();
  }, []);



  const getUserName = () => {
    let token: any = localStorage.getItem("access_token");
    var decoded = jwt_decode(token);
    //@ts-ignore
    let { name } = decoded;
    if (name && name != undefined) {
      return name
    }
    
  }


  const getToken = () => {
    //@ts-ignore
    return localStorage.getItem("access_token")
}

      
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
  });



  return (
    <React.Fragment>
      <CssBaseline />
      <ResponsiveDrawer />
      <div className={classes.root}>
      <Grid container spacing={1}>
      <Grid item xs={12} sm={12} md={3}     >
        </Grid>
        <Grid item xs={12} sm={12} md={4}      >
            <div>
              <h2>New Customer Registration</h2>
              <Formik
            initialValues={{
              name: '',
              mainAadhaar: '',
              mobile:'',
              familyAadhaar:'',
              regNo:'',
              consumerNo:'',
              subAgent:'',
              registeredAgencyName:'JAMAN HP GAS 2021',
              remarks:''
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().max(25).required('Name is required'),
              mobile:Yup.string()
              .required('Mobile  is required')
              .matches(/^[0-9]+$/, "Must be only digits")
              .min(10, 'Must be exactly 10 digits')
              .max(10, 'Must be exactly 10 digits'),   
              mainAadhaar:Yup.string()
              .required('Main Aadhaar is required')
              .matches(/^[0-9]+$/, "Must be only digits")
              .min(12, 'Must be exactly 12 digits')
              .max(12, 'Must be exactly 12 digits'),             
              familyAadhaar:Yup.string()
              .required('Family Aadhaar is required')
              .matches(/^[0-9]+$/, "Must be only digits")
              .min(12, 'Must be exactly 12 digits')
              .max(12, 'Must be exactly 12 digits'),   
            })}
            onSubmit={async ( values: any) => {
              try {
                  setDisabled(true)
                  const result = await axios.post(BASE_URL + "customer/add", 
                  {
                    "name":values.name,
                    "mainAadhaar":values.mainAadhaar,
                    "familyAadhaar":values.familyAadhaar,
                    "mainAgent":values.mainAgent,
                    "mobile":values.mobile,
                    "consumerNo":values.consumerNo,
                    "subAgent":values.subAgent,
                    "registeredAgencyName":values.registeredAgencyName,
                    "remarks":values.remarks,
                    "addedBy":getUserName()
                
                }
                  )
                  if (result.data.data && result.data != null) {
                    setLastUser(result.data.data.result);
                    showToast("Consumer added susccesssfully", "success");
                    setDisabled(false)
                  }
                } catch (error) {
                  if (error) {
                    console.log("error", error)
                    //@ts-ignore
                    showToast(error.response.data.message, "error")
                  }
                }
          }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit} >
                <Grid container spacing={1} >
                  <Grid item xs={12} >
                    <TextField
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          autoComplete="name"
                          name="name"
                          variant="outlined"
                          required
                          fullWidth
                          id="name"
                          label="Full Name"
                          autoFocus
                          value={values.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                          error={Boolean(touched.mainAadhaar && errors.mainAadhaar)}
                          helperText={touched.mainAadhaar && errors.mainAadhaar}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          variant="outlined"
                          required
                          fullWidth
                          id="mainAadhaar"
                          type="number"
                          label="Main Aadhaar"
                          name="mainAadhaar"
                          autoComplete="mainAadhaar"
                          value={values.mainAadhaar}
                    />
                  </Grid>
                  <Grid item xs={12}>
                        <TextField
                          error={Boolean(touched.familyAadhaar && errors.familyAadhaar)}
                          helperText={touched.familyAadhaar && errors.familyAadhaar}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          variant="outlined"
                          required
                          fullWidth
                          id="faadhaar"
                          type="number"
                          label="Family Adhaar"
                          name="familyAadhaar"
                          autoComplete="faadhaar"
                          value={values.familyAadhaar}
                        />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                          error={Boolean(touched.mobile && errors.mobile)}
                          helperText={touched.mobile && errors.mobile}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          variant="outlined"
                          required
                          fullWidth
                          name="mobile"
                          label="Mobile"
                          type="number"
                          id="mobile"
                          autoComplete="current-mobile"
                          value={values.mobile}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                          error={Boolean(touched.consumerNo && errors.consumerNo)}
                          helperText={touched.consumerNo && errors.consumerNo}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                          name="consumerNo"
                          label="Consumer No"
                          id="consumerNo"
                          type="number"
                          autoComplete="consumerNo"
                          value={values.consumerNo}
                          onInput={(e) => {
                            //@ts-ignore
                            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
                          }}
                    />
                  </Grid>
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
                          error={Boolean(touched.subAgent && errors.subAgent)}
                          helperText={touched.subAgent && errors.mobile}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                          name="subAgent"
                          label="Sub Agent"
                          type="subAgent"
                          id="subAgent"
                          autoComplete="subAgent"
                          value={values.subAgent}
                    />
                  </Grid>
                      <Grid item xs={12} sm={12} md={12} >
                        <FormControl variant="outlined">
                          <InputLabel id="demo-simple-select-filled-label">Registered Agency Name</InputLabel>
                          <Select
                          style={{width:"38rem"}}
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={values.registeredAgencyName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                            name="registeredAgencyName"

                          >
                            <MenuItem value="JAMAN HP GAS 2021">JAMAN HP GAS 2021</MenuItem>
                            <MenuItem value="GOURIPUR HP GAS PSV 2021">GOURIPUR HP GAS PSV 2021</MenuItem>
                            <MenuItem value="JAMAN HP GAS CLEAR KYC 2019">JAMAN HP GAS CLEAR KYC 2019</MenuItem>

                          </Select>
                        </FormControl>
                      </Grid>
                  <Grid item xs={12}>
                    <TextField
                          error={Boolean(touched.remarks && errors.remarks)}
                          helperText={touched.remarks && errors.remarks}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                          name="remarks"
                          label="Remarks"
                          type="remarks"
                          id="remarks"
                          autoComplete="remarks"
                          value={values.remarks}
                    />
                  </Grid>
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  type="submit"
                  disabled={
                    isSubmitting 
                }
                >
                  Register Customer
                </Button>
              </form>
              )}
              </Formik>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={4}  >
            <h2 style={{textAlign:"center"}}>Last Registration Details</h2>
            <TableContainer component={Paper}>
              <Table  aria-label="simple table">
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
                    <TableCell align="left">Mobile No: {lastUser.mobile}</TableCell>
                  </TableRow>
                  <TableRow>
                    {/* @ts-ignore */}
                    <TableCell align="left">Registration No :{lastUser.regNo}</TableCell>
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
                    <TableCell align="left">  Registered Agency Name  :{lastUser.registeredAgencyName}</TableCell>
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

export default CustomerRegistration;
