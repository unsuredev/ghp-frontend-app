import React from "react";
import { Typography, Grid, Button, makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { httpClient } from "../Common/Service";
import ResponsiveDrawer from './Drawer'
import FullConsumerTable from './FullConsumerTable'
import OldFullConsumerTable from './OldFullConsumerTable '
import ConnectionFullTable from './ConnectionFullTable'
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import MaterialTable from "material-table";

import { BASE_URL } from "../Common/constant";
import { getToken } from "../Common/helper";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        color: 'white',
        width: 185,
        margin: 10

    },
    margin: {
        margin: theme.spacing(1),

    },
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(4, 0, 3),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    title: {
        fontSize: 14,
    },
    tab: {
        width: "100%",
    },
}));


const AgentDashBoard = () => {
    const classes = useStyles();
    const [customerTotal, setCustomerTotal] = React.useState({
        "newCustomer": 0,
        "oldCustomer": 0,
        "totalConnection": 0,
        "installationComplete": 0,
        "totalLoad": 0
    })
    const [loading, setLoading] = React.useState(false)
    const [data, setData] = React.useState([]);
    const[viewConsumer , setViewConcumer] = React.useState(false)
    const[viewPending , setViewPending] = React.useState(false)
    const[viewAllCustomer , setViewAllCustomer] = React.useState(false)
    const [customer, setCustomer] = React.useState([]);
    const [allcustomer, setAllCustomer] = React.useState([]);


    const columns = [
        { title: 'Sl No', field: 'tableData.id' },
        { title: "Name", field: "name" },
        { title: "Main Aadhaar", field: "mainAadhaar" },
        {title:"Family Aadhaar", field:"familyAadhaar"},
        { title: "Mobile", field: "mobile" },
        { title: "Consumer No", field: 'consumerNo' },
        {title:"Registered Agency Name", field:'registeredAgencyName'},
        { title: "Sub Agent", field: 'subAgent' },
        {title:"Installation status", field:'installtatus'},
        { title: "Remarks", field: 'remarks' },
        {
            title: "Register Date ", field: "registerDate"
        }
        
    ]




    React.useEffect(() => {
        document.title = "Live Stats | JAMAN HP GAS  "
        fetchDashBoard()
    }, []);


    const fetchPendingConsmer = async () => {
        try {
            setLoading(true)
            const result = await axios.post(BASE_URL + "agent/pendingcustomer", {},
                {
                    headers: {
                        encryption: false,
                        access_token: getToken()
                    },
                });
            if (result.data) {
                setData(result.data.data.data)
                setLoading(false)
                setViewConcumer(false)
                setViewAllCustomer(false)
                setViewPending(true)
                
            }
        }
        catch (error) {
            console.log("error", error)
        }
    }


    const fetchNewConsmer = async () => {
        try {
            setLoading(true)
            const result = await axios.post(BASE_URL + "agent/onlyconsumer", {},
                {
                    headers: {
                        encryption: false,
                        access_token: getToken()
                    },
                });
            if (result.data) {
                setCustomer(result.data.data.data)
                setLoading(false)
                setViewConcumer(true)
                setViewPending(false)
                setViewAllCustomer(false)
            }
        }
        catch (error) {
            console.log("error", error)
        }
    }



    




    const fetchDashBoard = async () => {
        try {
            setLoading(true)
            const result = await httpClient("customer/customerbyagent", "POST", {})
            if (result.data) {
                setCustomerTotal(result.data)
                setLoading(false)
            }
        }
        catch (error) {
            console.error(error);
        }
    }


   const  fetchAllCustomer =async () => {
        try {
            const result = await httpClient("agent/allconsumer", "POST", {})
            if (result.data) {
                setAllCustomer(result.data.data)
                setViewAllCustomer(true)
                setViewPending(false)
                setViewConcumer(false)


            }
        }
        catch (error) {
            console.error(error);
        }
    }







    return (
        <React.Fragment>

            <CssBaseline />
            <ResponsiveDrawer />
            {/* Hero unit */}
            <div className={classes.heroContent}>
                <Container maxWidth="md">
                    {loading ? <div style={{ paddingTop: "30px", justifyContent: "center", alignItems: "center", textAlign: "center", width: "100%" }}><p>Loading...</p> <CircularProgress /> </div> :
                        <div>
                            <Grid container spacing={4} style={{ marginTop: "50px" }}>
                                <Grid item xs={12} sm={12} md={4}>
                                    <Card className={classes.card} style={{backgroundColor:"#fff9c4"}}>
                                        <CardContent className={classes.cardContent} >
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Total New Registration
                                            </Typography>
                                            <Typography color="primary" variant="h2" component="h2" style={{ fontWeight: "bold", textAlign: "center" }}>
                                                {customerTotal.newCustomer}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                  
                                        </CardActions>
                                        <Button variant="contained" size="small" color="secondary" className={classes.margin} onClick={fetchAllCustomer}>
                                                View
                                            </Button>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4}>
                                    <Card className={classes.card} style={{backgroundColor:"#bbdefb"}}>
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Total New Consumer
                                            </Typography>
                                            <Typography color="primary" variant="h2" component="h2" style={{ fontWeight: "bold", textAlign: "center" }}>
                                                {customerTotal.totalConnection}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                        </CardActions>
                                        <Button variant="contained" size="small" color="secondary" className={classes.margin} onClick={fetchNewConsmer}>
                                                View
                                            </Button>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4}>
                                    <Card className={classes.card} style={{backgroundColor:"#b2dfdb"}}>
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Total Old Consumer (Before2021)
                                            </Typography>
                                            <Typography color="primary" variant="h2" component="h2" style={{ fontWeight: "bold", textAlign: "center" }}>
                                                {customerTotal.oldCustomer}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4} style={{ marginTop: "50px" }}>
                                <Grid item xs={12} sm={12} md={4}>
                                    <Card className={classes.card} style={{backgroundColor:"#a5d6a7"}}>
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Total Load
                                            </Typography>
                                            <Typography color="primary" variant="h2" component="h2" style={{ fontWeight: "bold", textAlign: "center" }}>
                                                {customerTotal.totalLoad}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4}>
                                    <Card className={classes.card} style={{backgroundColor:"#ffccbc"}}>
                                        <CardContent className={classes.cardContent} >
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Installation Complete
                                            </Typography>
                                            <Typography color="primary" variant="h2" component="h2" style={{ fontWeight: "bold", textAlign: "center" }}>
                                                {customerTotal.installationComplete}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                        </CardActions>
                                    </Card> 
                                </Grid>                                         
                                <Grid item xs={12} sm={12} md={4}>
                                    <Card className={classes.card} style={{backgroundColor:"#b39ddb"}}>
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Installation Pending
                                            </Typography>
                                            <Typography color="secondary" variant="h2" component="h2" style={{ fontWeight: "bold", textAlign: "center" }}>
                                                {customerTotal.totalLoad - customerTotal.installationComplete}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                        </CardActions>
                                        <Button variant="contained" size="small" color="secondary" className={classes.margin} onClick={fetchPendingConsmer}>
                                                View
                                            </Button>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4}>
                                    <Card className={classes.card} style={{backgroundColor:"#90caf9 "}}>
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Today's Registration
                                            </Typography>
                                            <Typography color="secondary" variant="h2" component="h2" style={{ fontWeight: "bold", textAlign: "center" }}>
                                                {customerTotal.totalLoad - customerTotal.installationComplete}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                        </CardActions>
                                        <Button variant="contained" size="small" color="secondary" className={classes.margin} onClick={fetchPendingConsmer}>
                                                View
                                            </Button>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>}
                </Container>
            </div>

            {viewConsumer?
            <Container component="main" >
                 {/* <div style={{ paddingTop: "30px", justifyContent: "center", alignItems: "center", textAlign: "center", width: "100%" }}><p>This may take couple of mins...</p> <CircularProgress /> </div>  */}
                    <MaterialTable
                        title="All registration List JAMAN HP GAS"
                        data={customer}
                        //@ts-ignore
                        columns={columns}
                        options={{
                            exportButton: true,
                            exportAllData: true,
                            filtering: true,
                            sorting: true,
                            pageSizeOptions: [5, 20, 50, 100, 200, 500],
                            headerStyle: {
                                backgroundColor: '#F42870',
                                color: '#FFF'
                            }
                        }}
                    />

            </Container>:null}
            {viewPending?
            <Container component="main" >
                 {/* <div style={{ paddingTop: "30px", justifyContent: "center", alignItems: "center", textAlign: "center", width: "100%" }}><p>This may take couple of mins...</p> <CircularProgress /> </div>  */}
                    <MaterialTable
                        title="PENDING Consumer list JAMAN HP GAS"
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
                                backgroundColor: '#F42870',
                                color: '#FFF'
                            }
                        }}
                    />

            </Container>:null}

            {viewAllCustomer?
            <Container component="main" >
                 {/* <div style={{ paddingTop: "30px", justifyContent: "center", alignItems: "center", textAlign: "center", width: "100%" }}><p>This may take couple of mins...</p> <CircularProgress /> </div>  */}
                    <MaterialTable
                        title="All Consumer List JAMAN HP GAS"
                        data={allcustomer}
                                                //@ts-ignore

                        columns={columns}
                        options={{
                            exportButton: true,
                            exportAllData: true,
                            filtering: true,
                            sorting: true,
                            pageSizeOptions: [5, 20, 50, 100, 200, 500],
                            headerStyle: {
                                backgroundColor: '#F42870',
                                color: '#FFF'
                            }
                        }}
                    />

            </Container>:null}

        </React.Fragment >
    );


}

export default AgentDashBoard