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
import jwt_decode from "jwt-decode";
import InputLabel from '@material-ui/core/InputLabel';
const TAX_RATE = 0.07;

// import { ToastContext } from "../Common/ToastProvider";

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
  formControlSelect: {
    minWidth: 170,
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
    filled: "",
    empty: "",
    rate: "",
    paidAmount: "",
    remarks: "",
  })






  React.useEffect(() => {
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
 //@ts-ignore
    setAgetList(result.data.data.agents)
    //@ts-ignore
    setAgetList(result.data.data.agents.map(({ name  }) => ({ label: name, value: name })));
}

const handleChange = (event: any) => {
  setCustomer({ ...customer, [event.target.name]: event.target.value });
};


  return (
    <React.Fragment>
      <ResponsiveDrawer />
      <Container>
        <form noValidate autoComplete="off">
          <Grid container spacing={1}>

        <Grid item xs={2} sm={12} md={2} >
                    <FormControl variant="outlined" className={classes.formControlSelect} style={{height:"37px", marginTop:"-14px"}}>
                      <Select
                        onChange={handleChange}
                        displayEmpty
                        className={classes.selectEmpty}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        inputProps={{ 'aria-label': 'Without label' }}
                        name="mainAgent"
                        variant="outlined"


                      >
                        {agentList.map(item => (
                          <MenuItem
                            //@ts-ignore
                            key={item.label} value={item.value} >{item.label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={2} sm={12} md={2} >

          <TextField
            id="standard-basic"
            size="small"
            label="Filled"
            variant="outlined"
          />
          </Grid>
                  <Grid item xs={2} sm={12} md={2} >

          <TextField
            id="filled-basic"
            size="small"
            label="Empty"
            variant="outlined"
          />
          </Grid>
          <Grid item xs={2} sm={12} md={2} >

<TextField
  id="filled-basic"
  size="small"
  label="NC Sale"
  variant="outlined"
/>
</Grid>
          <Grid item xs={2} sm={12} md={2} >

          <TextField
            id="outlined-basic"
            size="small"
            label="Rate"
            variant="outlined"
          />
          </Grid>
          <Grid item xs={2} sm={12} md={2} >

          <TextField
            id="outlined-basic"
            size="small"
            label="Paid"
            variant="outlined"
          />
          </Grid>
          <br />
          {/* <Grid item xs={2} sm={12} md={2} >

          <TextField
            id="outlined-basic"
            size="small"
            label="Remarks"
            variant="outlined"
          />
          </Grid> */}
          <Button variant="contained" color="primary">
            SAVE
          </Button>
          </Grid>

        </form>
      </Container>

      <Container>
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
              {rows.map((row) => (
                <TableRow key={row.desc}>
                  <TableCell>{row.desc}</TableCell>
                  <TableCell>{row.qty}</TableCell>
                  <TableCell>{row.unit}</TableCell>
                  <TableCell>{ccyFormat(row.price)}</TableCell>
                  <TableCell>{row.qty}</TableCell>
                  <TableCell>{row.qty}</TableCell>

                  <TableCell>{row.unit}</TableCell>
                  <TableCell>{ccyFormat(row.price)}</TableCell>
                  <TableCell>{ccyFormat(row.price)}</TableCell>

                  <TableCell>{row.qty}</TableCell>
                  <TableCell align="right">{row.unit}</TableCell>
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
          <Table className={classes.table} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell> DAY </TableCell>
                <TableCell align="left"> YESTERDAY BALANCE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                <TableRow >
                  <TableCell align="left">TODAY AMOUNT</TableCell>
                </TableRow>
            </TableBody>
            <TableRow>
                <TableCell>Total BALANCE </TableCell>
              </TableRow>
          </Table>
        </TableContainer>
      </Container>
    </React.Fragment>
  );
}
