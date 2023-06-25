import React from "react";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Button,
  Grid,
  makeStyles,
  CssBaseline,
  TextField,
  Typography, Card
} from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import ResponsiveDrawer from "./Drawer";
import { BASE_URL } from "../Common/constant";
import axios from "axios";
import moment from "moment";
import MaterialTable from 'material-table';
import { ToastContext } from "../Common/ToastProvider";
import jwt_decode from "jwt-decode";
import { getToken, getRole } from "../Common/helper";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },

  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 2),
  },
}));

export default function Transactions() {
  const classes = useStyles();
  const { showToast } = React.useContext(ToastContext);

  const [state, setState] = React.useState({})
  const [open, setOpen] = React.useState(false);
  const [transaction, setTransaction] = React.useState({
    loanaccount: 0,
    svaccount: 0,
    l9payment: 0,
    staffsalary: 0,
    drivertips: 0,
    driverfooding: 0,
    extraexpenses: 0,
    remarks: ""
  });
  const [firstDate, setFirstDate] = React.useState(new Date(moment().startOf('day').format('YYYY-MM-DD')));
  const [lastDate, setLastDate] = React.useState(new Date(moment().format('YYYY-MM-DD')))
  const [active, setActive] = React.useState(true);
  const [show, setShow] = React.useState(false);
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const handleChange = (event: any) => {
    setTransaction({ ...transaction, [event.target.name]: event.target.value });
  };

  const totalExpense = () => {
    //@ts-ignore
    const result = parseInt(transaction.loanaccount) + parseInt(transaction.svaccount) + parseInt(transaction.l9payment) + parseInt(transaction.staffsalary) + parseInt(transaction.drivertips) + parseInt(transaction.driverfooding) + parseInt(transaction.extraexpenses)
    return result
  }

  const finalClosing = () => {
    //@ts-ignore
    const result = state.todaySellAmount + state.yesterdaybalance - state.todayAmountPaid - totalExpense()
    return result;
  };

  const todayCash = () => {
    //@ts-ignore
    const result = parseInt(state.todayAmountPaid)
    return result
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOk = () => {
    setOpen(false);
    setActive(false)
  };

  const fethcTransactionHistory = async () => {
    try {
      setLoading(true)
      const result = await axios.get(BASE_URL + "transaction/history", {
        headers: {
          encryption: false,
          access_token: getToken()
        },
      });
      if (result.data) {
        setData(result.data.data.transaction)
        setLoading(false)

      }
    }
    catch (error) {
      console.log("error", error)
    }
  }

  const getTodayTransaction = async () => {
    try {
      const result = await axios.post(BASE_URL + "transaction/get", {
        "start_date": firstDate, "end_date": lastDate,

      }, {
        headers: {
          encryption: false,
          access_token: getToken()
        }
      })
      if (result.data) {
        showToast(result.data.message, "success")
        setState(result.data.data.transaction)
      }
    }
    catch (error) {
      console.log("error", error)
    }
  }


  const updateTodayTransaction = async () => {
    try {
      const result = await axios.post(BASE_URL + "transaction/update", {
        loanaccount: transaction.loanaccount,
        svaccount: transaction.svaccount,
        l9payment: transaction.l9payment,
        staffsalary: transaction.staffsalary,
        drivertips: transaction.drivertips,
        driverfooding: transaction.driverfooding,
        extraexpenses: transaction.extraexpenses,
        remarks: transaction.remarks,
        todayexpense: totalExpense(),
        todayClosing: finalClosing(),
        todayCashPaid: todayCash()

      }, {
        headers: {
          encryption: false,
          access_token: getToken()
        }
      })
      //@ts-ignore
      if (result.data) {
        showToast(result.data.message, "success")

      }
    } catch (error) {
      if (error) {
        //@ts-ignore
        console.log("error", error)
        //@ts-ignore
        showToast(error.response.data.errorMessage, "error")
      }
    }
  }

  const columns = [
    { title: "Load Account SlNo", field: "loanaccount" },
    { title: "SV Account", field: "svaccount" },
    { title: "L9 Payment", field: "l9payment" },
    { title: "Staff Salary", field: "staffsalary" },
    { title: "Driver Tips", field: "drivertips" },
    { title: "Driver Fooding", field: "driverfooding" },
    { title: "Extra Expenses", field: 'extraexpenses' },
    { title: "Today Total Expense", field: 'todayexpense' },
    { title: "Today Closing", field: 'todayClosing' },
    { title: "Today Cash Paid", field: 'todayCashPaid' },
    { title: "Remarks", field: 'remarks' },
    {
      title: "DATE ", field: "updatedAt", type: "date",
      dateSetting: { locale: "ko-KR" }
    }


  ]


  React.useEffect(() => {
    getTodayTransaction()
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <ResponsiveDrawer />

      {/* Hero unit */}
      <Container
        maxWidth="sm"
        component="main"
        className={classes.heroContent}
      >
        <Typography
          component="h5"
          variant="h5"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Transaction Summary
        </Typography>
      </Container>
      <Container maxWidth="lg">
        <Grid container>

          <Grid item xs={12} sm={12} md={2}>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Typography>Todays All Expenses </Typography>

            <TextField
              id="outlined-basic"
              label="Load Account Transfer"
              name="loanaccount"
              type="number"
              value={transaction.loanaccount}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="SV Account Transfer"
              name="svaccount"
              type="number"
              value={transaction.svaccount}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="L9 Paymesnts"
              name="l9payment"
              type="number"
              value={transaction.l9payment}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Staff Salary"
              name="staffsalary"
              type="number"
              value={transaction.staffsalary}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Driver Tips"
              name="drivertips"
              type="number"
              value={transaction.drivertips}
              onChange={handleChange}
            />

            <TextField
              id="outlined-basic"
              label="Driver Fooding:"
              name="driverfooding"
              type="number"
              value={transaction.driverfooding}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Extra Expenses "
              name="extraexpenses"
              type="number"
              value={transaction.extraexpenses}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Remarks  "
              name="remarks"
              type="text"
              value={transaction.remarks}
              onChange={handleChange}
            />
            <br></br>
            <br></br>
            <br></br>
            <Typography>
              {" "}
              Today's Total Expenses:&#x20B9; <b>{totalExpense()}</b>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow style={{ backgroundColor: "#bdbdbd" }}>
                    <TableCell component="th" scope="row">
                      Yesterday Closing Balance:
                    </TableCell>
                    <TableCell align="right">
                      {/* @ts-ignore */}
                      &#x20B9;{state.yesterdaybalance}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Today's Sell Balance:
                    </TableCell>
                    <TableCell align="right">
                      {/* @ts-ignore */}
                      &#x20B9; <b>{state.todaySellAmount}</b>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Today Cash Paid:
                    </TableCell>
                    <TableCell align="right">
                      {/* @ts-ignore */}

                      &#x20B9; {state.todayAmountPaid}
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ backgroundColor: "#bdbdbd" }}>
                    <TableCell component="th" scope="row">
                      Today's Due :
                    </TableCell>
                    <TableCell align="right" >
                      {/* @ts-ignore */}

                      &#x20B9;{state.todayDue}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Today's Expense :
                    </TableCell>
                    <TableCell align="right">
                      {" "}
                      &#x20B9;{totalExpense()}
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ fontSize: "10px" }}>
                    <TableCell component="th" scope="row">
                      <b> Final Closing Balance:</b>
                    </TableCell>
                    <TableCell align="right">
                      {/* @ts-ignore */}
                      <span style={{ color: "red" }}>&#x20B9;{finalClosing()}</span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <div>

              {getRole() === "admin" || getRole() === "superadmin" ?
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                  Refil-sale updated?
                </Button> : null}



              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Please confirm you have updated refil sale!"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Did you update today's refil sale ?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    No
                  </Button>
                  <Button onClick={handleOk} color="primary" autoFocus>
                    Yes!
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <Grid item xs={12} sm={12} md={12} style={{ marginTop: "2rem" }}>
              <Button variant="contained" size="medium" color="secondary" onClick={updateTodayTransaction} disabled={active}>
                save & update
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={3} style={{ marginRight: "2rem" }}>
            <Card style={{ height: "20rem", width: "16rem", justifyContent: "center", textAlign: "center", backgroundColor: "#009688", color: "white" }}>
              <br></br>
              {/* @ts-ignore */}
              <Typography >Grand Total  Due: <b>{state.grandTotalDue}</b> </Typography>
              <br></br>
              {/* @ts-ignore */}
              <Typography variant="button" display="block" gutterBottom >L9 Payment: {state.l9payment} </Typography>
              {/* @ts-ignore */}
              <Typography variant="button" display="block" gutterBottom >Load Account: {state.loanaccount} </Typography>
              {/* @ts-ignore */}
              <Typography variant="button" display="block" gutterBottom >SV  Account: {state.loanaccount} </Typography>
              {/* @ts-ignore */}
              <Typography variant="button" display="block" gutterBottom >Staff salary: {state.staffsalary} </Typography>
              {/* @ts-ignore */}
              <Typography variant="button" display="block" gutterBottom >Driver Tips: {state.drivertips} </Typography>
              {/* @ts-ignore */}
              <Typography variant="button" display="block" gutterBottom >Driver Fooding: {state.driverfooding} </Typography>
              {/* @ts-ignore */}
              <Typography variant="button" display="block" gutterBottom >Extra : {state.extraexpenses} </Typography>
              {/* @ts-ignore */}

              <Typography variant="button" display="block" gutterBottom >Total Expense: {parseInt(state.loanaccount) + parseInt(state.svaccount) + parseInt(state.l9payment) + parseInt(state.staffsalary) + parseInt(state.drivertips) + parseInt(state.driverfooding) + parseInt(state.extraexpenses)} </Typography>


            </Card>
            <Button variant="outlined" size="medium" color="primary" onClick={fethcTransactionHistory} >
              Fetch HISTORY
            </Button>
          </Grid>
        </Grid>
      </Container>


      <Container>
        {loading ? <div style={{ paddingTop: "30px", justifyContent: "center", alignItems: "center", textAlign: "center", width: "100%" }}><p>This may take couple of mins...</p> <CircularProgress /> </div> :

          <MaterialTable
            title="Jaman Hp Transaction History"
            data={data}
            //@ts-ignore

            columns={columns}
            options={{
              exportButton: true,
              exportAllData: true,
              filtering: true,
              sorting: true,
              pageSizeOptions: [5, 20, 50, 100, 200, 500],
              headerStyle: {
                backgroundColor: '#009688',
                color: '#FFF'
              }
            }}
          />

        }
      </Container>

    </React.Fragment>
  );
}
