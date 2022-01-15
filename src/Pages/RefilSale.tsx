import React from "react";
import { BASE_URL } from "../Common/constant";
import {
  Button,
  Grid,
  makeStyles,
  CssBaseline,
  TextField, Typography
} from "@material-ui/core";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ResponsiveDrawer from "./Drawer";
import { Container } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from '@material-ui/core/InputLabel';

import { ToastContext } from "../Common/ToastProvider";
const TAX_RATE = 0.07;

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
function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty: number, unit: number) {
  return qty * unit;
}

function createRow(desc: string, qty: number, unit: number) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

interface Row {
  desc: string;
  qty: number;
  unit: number;
  price: number;
}

function subtotal(items: Row[]) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow("Paperclips (Box)", 100, 1.15),
  createRow("Paper (Case)", 10, 45.99),
  createRow("Waste Basket", 2, 17.99),
];



const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function RefilSale() {
  const classes = useStyles();
  const [agentList, setAgetList] = React.useState([]);
  const [customer, setCustomer] = React.useState({
    agent: "",
    filledCyclider: 0,
    emptyCyclider: 0,
    rateCyclider: 0,
    ncSale:0,
    ncRate:0,
    amountPaid:0,
    remarks:""
  })

  const [refil, setRefil]= React.useState([])



  const { showToast } = React.useContext(ToastContext);


  React.useEffect(() => {
    getCharacters();
    getResale()
  }, []);



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
    setAgetList(result.data.data.agents.map(({ name }) => ({ label: name, value: name })));
  }

  const handleChange = (event: any) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  
// REGISTER
  const RegisterRefalse = async () => {
    try {
      const result = await axios.post(BASE_URL + "refilsale/add",   customer ,
        {
          headers: {
            encryption: false,
            access_token: getToken()
          }, 
        })
      if (result.data.data && result.data != undefined) {
        showToast("Refil sale register successfullly", "success");
      }
    } catch (error) {
      if (error) {
        //@ts-ignore
        showToast(error.response.data.message, "error")
      }
    }
  };



  // GET A AGENT'S REFIL SALE
  const getRefalse = async () => {
    try {
      const result = await axios.post(BASE_URL + "refilsale/get",   {"agent":customer.agent} ,
        {
          headers: {
            encryption: false,
            access_token: getToken()
          }, 
        })
      if (result.data.data && result.data != undefined) {
        console.log("result" , result.data)
        setCustomer(result.data)
        showToast("Fetched refilsales successfullly", "success");
      }
    } catch (error) {
      if (error) {
        //@ts-ignore
        showToast(error.response.data.message, "error")
      }
    }
  };

    
  // GEY ALL
  const getResale = async () => {
    try {

      const result = await axios.get(BASE_URL + "refilsale/getAll",
        {
          headers: {
            encryption: false,
            access_token: getToken()
          },
        }
      );
      if (result.data && result.data.data) {
        setRefil(result.data.data.data)
      }
    } catch (error) {
      //@ts-ignore
      showToast(error.response.data.message, "error")
    }
  };








  return (
    <React.Fragment>
      <ResponsiveDrawer />

      <Container>
        <Grid container  >
          <Grid item xs={12} sm={12} md={12} style={{textAlign:"center"}}>
            <FormControl variant="outlined" >
              <Select
                onChange={handleChange}
                displayEmpty
                className={classes.selectEmpty}
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                inputProps={{ 'aria-label': 'Without label' }}
                name="agent"
                variant="outlined"
              >
                {agentList.map(item => (
                  <MenuItem
                    //@ts-ignore
                    key={item.label} value={item.value} >{item.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <div style={{ marginTop: "1rem", textAlign:"center" }}>
            <Button variant="contained" size="medium" color="primary" onClick={getRefalse}>
             FETCH REFILSALE
            </Button>
          </div>
          </Grid>
        </Grid>

        <form noValidate autoComplete="off" style={{marginTop:"2rem"}}>
          <Grid container spacing={1}>
            <Grid item xs={2} sm={12} md={2} >
              <TextField
                id="standard-basic"
                size="small"
                label="Load Cylinder"
                variant="outlined"
                name="filledCyclider"
                value={customer.filledCyclider}
                onChange={handleChange}
                type="number"

              />
            </Grid>
            <Grid item xs={2} sm={12} md={2} >
              <TextField
                id="filled-basic"
                size="small"
                label="Empty Cylinder"
                variant="outlined"
                name="emptyCyclider"
                value={customer.emptyCyclider}
                onChange={handleChange}
                type="number"

              />
            </Grid>
            <Grid item xs={2} sm={12} md={2} >
              <TextField
                id="outlined-basic"
                size="small"
                label="Rate"
                variant="outlined"
                name="rateCyclider"
                value={customer.rateCyclider}
                onChange={handleChange}
                type="number"

              />
            </Grid>
            <Grid item xs={2} sm={12} md={2} >
              <TextField
                id="filled-basic"
                size="small"
                label="NC Sale"
                variant="outlined"
                value={customer.ncSale}
                name="ncSale"
                onChange={handleChange}
                type="number"

              />
            </Grid>
            <Grid item xs={2} sm={12} md={2} >
              <TextField
                id="outlined-basic"
                size="small"
                label="NC Rate"
                variant="outlined"
                value={customer.ncRate}
                name="ncRate"
                onChange={handleChange}
                type="number"

              />
            </Grid>
            <Grid item xs={2} sm={12} md={2} >
              <TextField
                id="outlined-basic"
                size="small"
                label="Amount Paid"
                variant="outlined"
                value={customer.amountPaid}
                name="amountPaid"
                onChange={handleChange}
                type="number"

              />
            </Grid>
            <br />
            <br />

          </Grid>
          <Grid container>
          <Grid item xs={12} sm={12} md={12} >
              <TextField
                id="outlined-basic"
                size="small"
                label="Remarks"
                variant="outlined"
                value={customer.remarks}
                name="remarks"
                onChange={handleChange}
                type="text"

              />
            </Grid>

          </Grid>
          <div style={{ marginTop: "1rem", textAlign:"center" }}>
            <Button variant="contained" size="medium" color="secondary" onClick={RegisterRefalse}>
              SAVE & UPDATE
            </Button>
          </div>


        </form>
      </Container>

      <Container style={{ marginTop: "2rem" }}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={8}>
                  <h2> DAILY CASH & STOCK REPORT</h2>
                </TableCell>
                <TableCell align="right">
                  {" "}
                  <h2> {new Date().toLocaleString() + ""} </h2>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>PERSON </TableCell>
                <TableCell>FILLED</TableCell>
                <TableCell>EMPTY</TableCell>
                <TableCell>EMPTY DUE</TableCell>
                <TableCell>NC SALE TYPE</TableCell>

                <TableCell>NC SALE</TableCell>
                <TableCell>RATE</TableCell>
                <TableCell>TOTAL AMOUNT</TableCell>
                <TableCell>PAID AMOUNT</TableCell>
                <TableCell>AMOUNT DUE</TableCell>
                <TableCell align="right">REMARKS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {refil.map((sale, i) => (
                <TableRow key={i}>
                        {/* @ts-ignore */}
                        <TableCell>{sale.agent}</TableCell>
                        {/* @ts-ignore */}

                  <TableCell>{sale.cyclinderLoad}</TableCell>
                                          {/* @ts-ignore */}
                  <TableCell>{sale.cyclinderEmpty}</TableCell>
                                          {/* @ts-ignore */}

                  <TableCell>{sale.cyclinderEmpty}</TableCell>
                                          {/* @ts-ignore */}

                  <TableCell>{sale.cyclinderEmpty}</TableCell>
                                          {/* @ts-ignore */}

                  <TableCell>{sale.cyclinderEmpty}</TableCell>
                                          {/* @ts-ignore */}

                  <TableCell>{sale.refilRate}</TableCell>
                                          {/* @ts-ignore */}

                  <TableCell>{sale.refilRate}</TableCell>
                                          {/* @ts-ignore */}

                  <TableCell>{sale.amountPaid}</TableCell>
                                          {/* @ts-ignore */}

                  <TableCell>{sale.remakrs}</TableCell>
                                          {/* @ts-ignore */}

                  <TableCell>{sale.remakrs}</TableCell>
                                          {/* @ts-ignore */}

                  <TableCell align="right">{sale.remakrs}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* TOTAL CALCULATION */}
      <br />
      <br></br>
      <Container>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Day</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Yesterday
                </TableCell>
                <TableCell align="right">153696</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Today
                </TableCell>
                <TableCell align="right">196325</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </React.Fragment>
  );
}
