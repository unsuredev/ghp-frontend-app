import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ResponsiveDrawer from "./Drawer";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { BASE_URL } from "../Common/constant";
import axios from "axios";
import { ToastContext } from "../Common/ToastProvider";
import { Button, Grid, Container, CssBaseline, } from "@material-ui/core";
import MaterialTable from 'material-table';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);

const MainDashboard = () => {
    const classes = useStyles();
    const { showToast } = React.useContext(ToastContext);
    const [connection, setConnection] = React.useState({})
    const [loadingTable, setLoadingTable] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [data, setData] = React.useState([]);


    React.useEffect(() => {
        getNcDetails();
    }, []);

    const getToken = () => {
        //@ts-ignore
        return localStorage.getItem("access_token")
    }

    const getNcDetails = async () => {
        try {
            const result = await axios.get(BASE_URL + "ncdelivery/get",
                {
                    headers: {
                        encryption: false,
                        access_token: getToken()
                    },
                });
            if (result && result.data) {
                setConnection(result.data.data.NcDetails)

            }
        }
        catch (error) {
            if (error) {
            }
        }
    }


    // const getNcdelivery = async() => {
    //     try {
    //         setLoadingTable(true)
    //         setLoading(true)

    //         const result = await axios.get(BASE_URL + "ncdelivery/all",
    //             {
    //                 headers: {
    //                     encryption: false,
    //                     access_token: getToken()
    //                 },
    //             });
    //         if (result && result.data) {
    //             setData(result.data.data.NcDetails)
    //             console.log("data", result.data.data)
    //             setLoading(false)
    //             setLoadingTable(true)

    //         }
    //     }
    //     catch (error) {
    //         if (error) {
    //         }
    //     }
    // }

    // const columns = [
    //     {
    //         title: "DATE ", field: "createdAt", type: "date",
    //         dateSetting: { locale: "ko-KR" }
            
    //     },
    //     { title: 'AGENT', field: 'agent' },
    //     { title: "PAID AMOUNT ", field: "totalAmount" ,type: 'numeric'},
    //     { title: "PAID BPL OVEN ", field: "totalBplOven",type: 'numeric' },
    //     { title: "PAID HP OVEN", field: "totalHpOven"},
    //     { title: "PAID NON HP  OVEN", field: "totalNonHpOven" },
    //     { title: "PAID REGULATOR ", field: "totalRegulator" },
    //     { title: "PAID PIPE ", field: "totalPipe" },
    //     { title: "PAID LIGHT", field: "paidLight" },
    //     { title: "PAID LOAD  ", field: "totalLod" },
    //     { title: "PAID LIGHT ", field: "totalLight" },
     
    // ]



    return (
        <React.Fragment>
            <ResponsiveDrawer />
            <div className={classes.root} style={{ textAlign: "center" , marginTop:"5rem"}}>
                <Grid container spacing={2} >
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={12} md={3} >
                        <Card  >
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    TOTAL LOAD DELIVERED
                                </Typography>
                                <div style={{ backgroundColor: "#2196f3", color: "white", height: "10rem", width: "10rem", borderRadius: "70%", display: "inline-flex", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
                                    <h1 style={{ fontSize: "40px" }}>
                                        {/* @ts-ignore */}
                                        {connection.totalLod}
                                    </h1>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card  >
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    TOTAL REGULATOR DELIVERED
                                </Typography>
                                <div style={{ backgroundColor: "red", color: "white", height: "10rem", width: "10rem", borderRadius: "70%", display: "inline-flex", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
                                    <h1 style={{ fontSize: "40px" }}>
                                        {/* @ts-ignore */}
                                        {connection.totalRegulator}
                                    </h1>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card  >
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    TOTAL PIPE DELIVERED
                                </Typography>
                                <div style={{ backgroundColor: "#4caf50", color: "white", height: "10rem", width: "10rem", borderRadius: "70%", display: "inline-flex", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
                                    <h1 style={{ fontSize: "40px" }}>
                                        {/* @ts-ignore */}
                                        {connection.totalPipe}
                                    </h1>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card  >
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    TOTAL BPL OVEN DELIVERED
                                </Typography>
                                <div style={{ backgroundColor: "#ffc107", color: "white", height: "10rem", width: "10rem", borderRadius: "70%", display: "inline-flex", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
                                    <h1 style={{ fontSize: "40px" }}>
                                        {/* @ts-ignore */}
                                        {connection.totalBplOven}
                                    </h1>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card  >
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    TOTAL HP OVEN DELIVERED
                                </Typography>
                                <div style={{ backgroundColor: "#00897b", color: "white", height: "10rem", width: "10rem", borderRadius: "70%", display: "inline-flex", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
                                    <h1 style={{ fontSize: "40px" }}>
                                        {/* @ts-ignore */}
                                        {connection.totalHpOven}
                                    </h1>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card  >
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    TOTAL NON HP DELIVERED
                                </Typography>
                                <div style={{ backgroundColor: "#3f51b5", color: "white", height: "10rem", width: "10rem", borderRadius: "70%", display: "inline-flex", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
                                    <h1 style={{ fontSize: "40px" }}>
                                        {/* @ts-ignore */}
                                        {connection.totalNonHpOven}
                                    </h1>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card  >
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    TOTAL LIGHT  DELIVERED
                                </Typography>
                                <div style={{ backgroundColor: "#ef6c00", color: "white", height: "10rem", width: "10rem", borderRadius: "70%", display: "inline-flex", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
                                    <h1 style={{ fontSize: "40px" }}>
                                        {/* @ts-ignore */}
                                        {connection.totalLight}
                                    </h1>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card  >
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    TOTAL INSTALLATION COMPLETE 
                                </Typography>
                                <div style={{ backgroundColor: "#9c27b0", color: "white", height: "10rem", width: "10rem", borderRadius: "70%", display: "inline-flex", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
                                    <h1 style={{ fontSize: "40px" }}>
                                        {/* @ts-ignore */}
                                        {connection.installationComplete}
                                    </h1>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card  >
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    TOTAL AMOUNT PAID
                                </Typography>
                                <div style={{ backgroundColor: "black", color: "white", height: "10rem", width: "10rem", borderRadius: "70%", display: "inline-flex", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
                                    <h1 style={{ fontSize: "40px" }}>
                                        {/* @ts-ignore */}
                                        {connection.totalAmount}
                                    </h1>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
            </div>
            <br></br>
            {/* <div>
                {loadingTable ?
                    <Container component="main" >
                        {loading ? <div style={{ paddingTop: "60px",marginTop:"60px", justifyContent: "center", alignItems: "center", textAlign: "center", width: "100%" }}><p>Please...</p> <CircularProgress /> </div> :
                            <MaterialTable
                                title="Jaman Hp Sales History"
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
                                        backgroundColor: '#01579b',
                                        color: '#FFF'
                                    }
                                }}
                            />
                        }
                    </Container> : null}
            </div> */}
        </React.Fragment>
    );
}

export default MainDashboard
