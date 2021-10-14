import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Copyright from "../Components/Copyright";
import { httpClient } from "../Common/Service";
import { ToastContext } from "../Common/ToastProvider";
import { Link as RouterLink, useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ResponsiveDrawer from "./Drawer";
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from "axios";

import { BASE_URL } from "../Common/constant";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  table: {
    minWidth: 650,
  },
}));




const MemberSignUp = () => {
  const classes = useStyles();
  const { showToast } = React.useContext(ToastContext);
  const [list, setList] = React.useState([])
  const [show, setShow] = React.useState(false)

  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
  });


  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleSwitch = (event: any) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleChange = (event: any) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };


  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
    const result = await axios.post(BASE_URL + "user/add",{
      "email":user.email,
      "login_type":"email",
      "name":user.name,
      "password":user.password}, {
      headers: {
        encryption: false,
      }
    })
    if (result.data && result.data != null) {
      showToast("Registered susccesssfully", "success");
    
    }
    
  } catch (error) {
    console.log("error" , error)
    //@ts-ignore
    showToast(error.response.data.message, "error")
  }
}


  React.useEffect(() => {
    handleUsersList()
  }, [])


  const toggleChecked = async ( email:any) => {
    try {
      const result = await axios.post(BASE_URL + "user/block",{"email":email},  { headers: {
        encryption: false,
        access_token: getToken()
      }})
      if (result.data && result.data != null) {
        showToast(result.data.message, "success");
        window.location.reload();
      
      }
    } catch (error) {
      //@ts-ignore
      showToast(error.response.data.message, "error")    }
  };


  const getToken = () => {
    //@ts-ignore
    return localStorage.getItem("access_token")
}

  const handleUsersList = async () => {
    try {
      const result = await axios.get(BASE_URL + "user/getall", {
        headers: {
          encryption: false,
          access_token: getToken()
        }
      })
       setList(result.data.data.users)
    } catch (error) {
      //@ts-ignore
      showToast(error.response.data.message, "error")    }
  };


  return (
    <React.Fragment>
      <ResponsiveDrawer />
      <Container component="main" maxWidth="md">
        <Grid container>
          <Grid item xs={12} sm={12} md={12} style={{ margin: "auto", justifyContent: "center", textAlign: "center" }}>
            <Typography component="h1" variant="h5">
            JAMAN HP GAS
              </Typography>
            <h4>Code: 13784600</h4>
          </Grid>
        </Grid>
      </Container>
      <Container component="main" maxWidth="md">
        <Grid container  >
          <Grid item xs={12} sm={12} md={12} >
          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>View All User list</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Sl No</TableCell>
                    <TableCell>User Name</TableCell>
                    <TableCell >Email Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list.map((user, i) => (
                    //@ts-ignore
                    <TableRow key={user.name}>
                      <TableCell align="left">{i + 1}</TableCell>
                      <TableCell component="th" scope="row">
                        {/* @ts-ignore */}
                        {user.name}
                      </TableCell>
                      {/* @ts-ignore */}
                      <TableCell align="left">{user.email}</TableCell>
                      <TableCell >  
                        <FormControlLabel
                         //@ts-ignore
                          control={<Switch checked={user.active} onChange={()=>toggleChecked(user.email)} />}
                          label="Normal"
                        />
                      
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </AccordionDetails>
      </Accordion>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => setShow(true)}
          >
            Add New member
                </Button>
        </Grid>

      </Container>

      {show &&

        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <div className={classes.paper}>
                {/* <PersonOutlinedIcon/> */}


                <form className={classes.form} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Name "
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={user.name}
                    onChange={handleChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email "
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={user.email}
                    onChange={handleChange}
                  />

                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={user.password}
                    onChange={handleChange}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                  >
                    Add Team member
                </Button>

                  <Box mt={20}>
                    <Copyright />
                  </Box>
                </form>
              </div>
            </Grid>
          </Grid>
        </Container>
      }



    </React.Fragment>
  );
};

export default MemberSignUp;
