import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import { Button, Link, TextField, Container, TableRow, TableContainer, TableHead, TableBody, TableCell, Grid, makeStyles, } from '@material-ui/core';

import { httpClient } from "../Common/Service";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DateFnsUtils from '@date-io/date-fns';
import moment from "moment";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from "react-router-dom";
import ResponsiveDrawer from './Drawer';
import FooterSection from '../Components/Footer'

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        }
    },
    roottab: {
        paddingTop: 100,
        width: "100%",
    },
    seeMore: {
        marginTop: theme.spacing(3),
    },
    table: {
        minWidth: 650,
    }

}));

const CustomerStats = () => {
    const classes = useStyles();
    const [users, setUsers] = useState<any[]>([]);
    let [userlist, setUserlist] = useState<any>([])
    let [mydevices, setMydevices] = useState<any[]>([]);

    const [firstDate, setFirstDate] = React.useState(new Date('2021-03-12'));
    const [lastDate, setLastDate] = React.useState(new Date(moment().endOf('day').format('YYYY-MM-DD')))

    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = React.useState(1);

    const [agentName, setAgentName] = React.useState({
        name: "",
    });
    let history = useHistory();




    const handleChange = (event: any) => {
        setAgentName({ ...agentName, [event.target.name]: event.target.value });
        //@ts-ignore
    };

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = (index: any) => {
        setOpen(true);
        for (let i = 0; i < userlist.length; i++) {
            if (i == index) {
                mydevices = userlist[i].devices;
                break;
            }

        }
        setMydevices(mydevices)
        return mydevices
    };

    const handleClose = () => {
        setOpen(false);
    };


    React.useEffect(() => {
        fetchUsers()
    }, []);

    const startDateChange = (date: any) => {
        const format = "YYYY-MM-DD"
        let startday: any = moment(date).format(format)
        console.log("startdate", startday)
        setFirstDate(startday);
    };
    const endDateChange = (date2: any) => {
        const format = "YYYY-MM-DD"
        let endday: any = moment(date2).format(format);
        setLastDate(endday);
        console.log("end", endday)

    };
    const fetchUsers = async () => {

        try {
            setLoading(true)
            //@ts-ignore
            const result = await httpClient("customer/getCustomerStats", "POST", {
                "start_date": firstDate, "end_date": lastDate,
            });
            if (result!=null){
            setUsers(result.data);
            setLoading(false)
            }
        }
        catch (error) {
            console.error(error);
        }
    }


    // const fetchUsersByAgent = async () => {

    //     try {
    //         setLoading(true)
    //         //@ts-ignore
    //         const result = await httpClient("customer/customerbyagent", "POST", {
    //             "mainAgent": agentName.name
    //         });
    //         setUsers(result.data);
    //         setLoading(false)


    //     }
    //     catch (error) {
    //         console.error(error);
    //     }
    // }



    const usersByDate = (index: any) => {
        setLoading(true);

        for (let i = 0; i < users.length; i++) {
            if (i == index) {
                userlist = users[i].customers;
                break;
            }
        }
        setUserlist(userlist)
        console.log("users data", userlist)
        setLoading(false);
        return userlist

    }




    return (
        <React.Fragment>
            <ResponsiveDrawer />
            {/* <Container maxWidth="xs" style={{ display: "flex" }}>

                <Grid item xs={12} sm={12} md={8}>
                    <TextField
                        variant="outlined"

                        name="name"
                        label="Consumers list by Agent"
                        type="text"
                        id="name"
                        autoComplete="name"
                        onChange={handleChange}
                        value={agentName.name}
                    />
                </Grid>
                <Button variant="contained" color="primary" onClick={fetchUsersByAgent} >
                    FIND  BY AGENT
                </Button>


            </Container>

            <br></br> */}

            <Container maxWidth="md" style={{ paddingLeft: "4rem" }} >


                <Grid container >


                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                disableToolbar
                                minDate={new Date('2021-03-12')}
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Start date"
                                value={firstDate}
                                onChange={startDateChange}
                                maxDate={new Date()}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />

                            <KeyboardDatePicker
                                minDate={firstDate}
                                margin="normal"
                                id="date-picker-dialog"
                                label="End date"
                                format="dd/MM/yyyy"
                                value={lastDate}
                                onChange={endDateChange}
                                maxDate={new Date()}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <Button variant="contained" color="primary" onClick={fetchUsers} >
                                FIND by DATE
                            </Button>
                        </Grid>
                    </MuiPickersUtilsProvider>
                </Grid>
            </Container>
            < Container maxWidth="md" style={{ marginTop: "50px", marginRight: "5rem" }}>
                <Grid container >
                    <br></br>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Sl No.</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>No of Customer</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell>{row.join_date}</TableCell>
                                    <TableCell>{row.customers.length}</TableCell>
                                    <TableCell>
                                        <Link color="primary" onClick={() => usersByDate(i)}>
                                            < ExpandMoreIcon />
                                        </Link></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>

            </Container>
            {loading ? <div style={{ paddingTop: "30px", justifyContent: "center", alignItems: "center", textAlign: "center", width: "100%" }}><p>This may take few mins...</p> <CircularProgress /> </div> :
                <Container style={{ margin: "auto", justifyContent: "center", textAlign: "center" }}>
                    <div style={{ marginTop: "50px", justifyContent: "center", alignItems: "center", textAlign: "center", width: "100%" }}>

                        {userlist.length > 0 && (

                            <Grid container >
                                <Grid item xs={12} sm={12} md={12} style={{ marginLeft: "11rem" }}>
                                    <MaterialTable
                                        title="Jaman Hp Gas Customers"
                                        isLoading={loading}
                                        columns={[
                                            { title: "Sl No", field: 'tableData.id' },
                                            { title: 'Name', field: 'name' },
                                            { title: 'Main Aadhaar', field: 'mainAadhaar' },
                                            { title: 'Family Aadhaar', field: 'familyAadhaar' },
                                            { title: 'Mobile', field: 'mobile' || "null" },
                                            { title: 'Reg No', field: 'regNo' || "NA" },
                                            { title: 'Consumer No', field: 'ConsumerNO' },
                                            { title: 'Main Agent', field: 'mainAgent' },
                                            { title: 'Sub Agent', field: 'subAgent' || "NA" },
                                            { title: "Remarks", field: "remarks" }


                                        ]}

                                        data={userlist}
                                        options={{
                                            exportButton: true,
                                            exportAllData: true,
                                            filtering: true,
                                            sorting: true,
                                            pageSizeOptions: [5, 20, 50, 100, 200, 500],
                                            headerStyle: {
                                                backgroundColor: '#01579b',
                                                color: '#FFF'
                                            }


                                        }}
                                    />
                                </Grid>
                            </Grid>


                        )}
                    </div>

                </Container>}
            <FooterSection />



        </React.Fragment >
    );
}
export default CustomerStats