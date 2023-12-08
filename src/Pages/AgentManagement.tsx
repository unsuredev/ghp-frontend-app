import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Copyright from "../Components/Copyright";
import Container from "@material-ui/core/Container";
import { ToastContext } from "../Common/ToastProvider";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ResponsiveDrawer from "../Components/Drawer";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import axios from "axios";
import { BASE_URL } from "../Common/constant";
import { getToken } from '../Common/helper';

function createData(name: string, address: string, mobile: number) {
  return { name, address, mobile };
}



const AgentList = () => {

  const useStyles = makeStyles((theme: any) => ({
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
      minWidth: 700,
    }
  }))


  const classes = useStyles();
  const { showToast } = React.useContext(ToastContext);
  const [show, setShow] = React.useState(false)

  const [list, setList] = React.useState([])


  const handleChange = (event: any) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const [user, setUser] = React.useState({
    name: "",
    address: "",
    mobile: "",
  });


  const [useragent, setUseragent] = React.useState({
    name: "",
    address: "",
    mobile: "",
  });


  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();

      const result = await axios.post(BASE_URL + "agent/add", {
        "name": user.name,
        "mobile": user.mobile,
        "address": user.address
      }, {
        headers: { encryption: false },
      });
      if (result.data && result.data.status === "success") {
        showToast("Registered susccesssfully", "success");
      }
    } catch (error) {
      //@ts-ignore
      showToast(error.response.data.message, "error")
    }
  }



  React.useEffect(() => {
    handleAgentlist()
  }, [])



  const handleAgentlist = async () => {
    try {

      const result = await axios.get(BASE_URL + "agent/getall",
        {
          headers: {
            encryption: false,
            token: getToken()
          },
        }
      );
      if (result.data && result.data.status === "success") {
        setList(result.data.data.agents)
      }
    } catch (error) {
      //@ts-ignore
      showToast(error.response.data.message, "error")
    }
  };

  const toggleChecked = async (mobile: any) => {
    try {
      const result = await axios.post(BASE_URL + "agent/block", { "mobile": mobile }, {
        headers: {
          encryption: false,
          token: getToken()
        }
      })
      if (result.data && result.data != null) {
        showToast(result.data.message, "success");
        window.location.reload();

      }
    } catch (error) {
      //@ts-ignore
      showToast(error.response.data.message, "error")
    }
  };


  return (
    <React.Fragment>
      <ResponsiveDrawer />
      <Container component="main" maxWidth="md">
        <Grid container  >
          <Grid item xs={12} sm={12} md={12} >
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>View All Agents list</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>


                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Sl No</TableCell>
                        <TableCell>Agent Name</TableCell>
                        <TableCell align="right">Mobile Number</TableCell>
                        <TableCell align="right">Address</TableCell>
                        <TableCell align="right">Active</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {list.map((agent, i) => (
                        //@ts-ignore
                        <TableRow key={agent.name}>
                          <TableCell align="left">{i + 1}</TableCell>
                          <TableCell component="th" scope="row">
                            {/* @ts-ignore */}
                            {agent.name}
                          </TableCell>
                          {/* @ts-ignore */}
                          <TableCell align="right">{agent.mobile}</TableCell>
                          {/* @ts-ignore */}
                          <TableCell align="right">{agent.address}</TableCell>
                          <TableCell >
                            <FormControlLabel
                              //@ts-ignore
                              control={<Switch checked={agent.active} onChange={() => toggleChecked(agent.mobile)} />}
                              label=""
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
      </Container>
      <Container component="main" maxWidth="md">
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <div className={classes.paper}>
              <h2>Register New Agent</h2>
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
                  name="mobile"
                  label="Mobile No"
                  type="number"
                  id="mobile"
                  autoComplete="mobile"
                  value={user.mobile}
                  onChange={handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="address"
                  label="Full Address "
                  name="address"
                  autoComplete="address"
                  autoFocus
                  value={user.address}
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
                  Register Agent
                </Button>
                <Grid container></Grid>
                <Box mt={20}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>

  );
}

export default AgentList