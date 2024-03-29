import React from 'react';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from "../Components/Copyright";
import ResponsiveDrawer from "./Drawer";
import { BASE_URL } from "../Common/constant";
import axios from "axios";
import MaterialTable from 'material-table';



const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
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
}));


export default function RejectFingerPrint() {
    const classes = useStyles();
    const [allcustomer, setAllCustomer] = React.useState([]);
    const [viewPending, setViewPending] = React.useState(false)


    React.useEffect(() => {
        document.title = "Fingerprint List | JAMAN HP GAS  "
        fetchAllPendingFingerprint()
    }, []);



    const getToken = () => {
        //@ts-ignore
        return localStorage.getItem("access_token")
    }

    const fetchAllPendingFingerprint = async () => {
        try {
            const result = await axios.post(BASE_URL + "agent/rejectfingerprint", {},
                {
                    headers: {
                        encryption: false,
                        access_token: getToken()
                    },
                });
            if (result.data) {
                setAllCustomer(result.data.data)
            }
        }
        catch (error) {
            console.error(error);
        }
    }



    const columns = [
        { title: 'Sl No', field: 'tableData.id' },
        { title: "Name", field: "name" },
        { title: "Main Aadhaar", field: "mainAadhaar" },
        { title: "Family Aadhaar", field: "familyAadhaar" },
        { title: "Mobile", field: "mobile" },
        { title: "Contact Number", field: "contactNumber" },
        { title: "Registered Agency Name", field: 'registeredAgencyName' },
        { title: "Registration Status", field: 'registrationStatus' },
        { title: "Sub Agent", field: 'subAgent' },
        { title: "Remarks", field: 'remarks' },
    ]

    return (
        <React.Fragment>
            <CssBaseline />
            <ResponsiveDrawer />
            <main>
                <Container component="main" style={{ marginTop: "3rem", paddingTop: "2rem" }}>
                    <MaterialTable
                        title="Your ALL REJECT FINGER PRINT LIST JAMAN HP GAS"
                        data={allcustomer}
                        columns={columns}
                        options={{
                            exportButton: true,
                            exportAllData: true,
                            filtering: true,
                            sorting: true,
                            pageSizeOptions: [20, 50, 100, 200, 500],
                            headerStyle: {
                                backgroundColor: '#009688',
                                color: '#FFF'
                            }
                        }}
                    />
                </Container>
            </main>
            <br></br>
            <Copyright />
        </React.Fragment>
    );
}
