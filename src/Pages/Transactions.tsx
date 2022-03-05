import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import StarIcon from '@material-ui/icons/StarBorder';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
    Button,
    Grid,
    makeStyles,
    CssBaseline,
    TextField, Typography
} from "@material-ui/core";
import ResponsiveDrawer from "./Drawer";


const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
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

    return (
        <React.Fragment>
            <CssBaseline />
            <ResponsiveDrawer />

            {/* Hero unit */}
            <Container maxWidth="sm" component="main" className={classes.heroContent}>
                <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
                    Transaction Summary
                </Typography>

            </Container>
            <Container maxWidth="lg" >
                <Grid container>
                                      <Grid item xs={12} sm={12} md={3}>
                                          </Grid>

                    <Grid item xs={12} sm={12} md={3}>
                        <Typography >Todays All Expenses </Typography>

                        <TextField
                            id="outlined-basic"
                            size="small"
                            label="Loan Account Transfer"
                            name="emptyCycliderRecived19"
                            type="number"
                        />
                        <TextField
                            id="outlined-basic"
                            size="small"
                            label="SV Account Transfer"
                            name="emptyCycliderRecived19"
                            type="number"
                        />
                        <TextField
                            id="outlined-basic"
                            size="small"
                            label="L9 Paymesnts"
                            name="emptyCycliderRecived19"
                            type="number"
                        />
                        <TextField
                            id="outlined-basic"
                            size="small"
                            label="Driver Tips"
                            name="emptyCycliderRecived19"
                            type="number"
                        />

                        <TextField
                            id="outlined-basic"
                            size="small"
                            label="Driver Fooding:"
                            name="emptyCycliderRecived19"
                            type="number"
                        />
                        <TextField
                            id="outlined-basic"
                            size="small"
                            label="Extra Expenses "
                            name="emptyCycliderRecived19"
                            type="number"
                        />
                            <TextField
                            id="outlined-basic"
                            size="small"
                            label="Remarks  "
                            name="emptyCycliderRecived19"
                            type="number"
                        />
                        <br></br>
                        <br></br>
                        <br></br>
                        <Typography > Today's Total Expenses:&#x20B9;  <b>25893</b>  </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                    <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableBody>
                            <TableRow >
                                <TableCell component="th" scope="row">
                                    Yesterday Closing Balance:
                                </TableCell>
                                <TableCell align="right"> &#x20B9; 2569</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell component="th" scope="row">
                                Today's Balance:
                                </TableCell>
                                <TableCell align="right"> &#x20B9; 25893</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell component="th" scope="row">
                                All Total Balance:
                                </TableCell>
                                <TableCell align="right"> &#x20B9; <b> 852502</b> </TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell component="th" scope="row">
                                Today's Expense :
                                </TableCell>
                                <TableCell align="right"> &#x20B9; 25893</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell component="th" scope="row">
                                    Total Due :
                                </TableCell>
                                <TableCell align="right"> &#x20B9; 256950</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell component="th" scope="row">
                                    Today's Closing Balance in cash :
                                </TableCell>
                                <TableCell align="right"> &#x20B9; 256950</TableCell>
                                </TableRow>
                                <TableRow >
                                <TableCell component="th" scope="row">
                                    <b> Final Closing Balance:</b> 
                                </TableCell>
                                <TableCell align="right">  <span style={{color:"red"}}> &#x20B9;256950</span> </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment >
    );
}