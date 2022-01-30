import React from "react";
import { Typography, Grid, Button, makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import FooterSection from '../Components/Footer'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CircularProgress from '@material-ui/core/CircularProgress';
import { httpClient } from "../Common/Service";
import ResponsiveDrawer from './Drawer'
import FullConsumerTable from './FullConsumerTable'
import OldFullConsumerTable from './OldFullConsumerTable '
import ConnectionFullTable from './connectionFullTable'


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
        "totalConnection": 0
    })
    const [loading, setLoading] = React.useState(false)





    React.useEffect(() => {
        document.title = "Live Stats | JAMAN HP GAS  "
        fetchDashBoard()
    }, []);


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







    return (
        <React.Fragment>

            <CssBaseline />
            <ResponsiveDrawer />
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="md">
                    {loading ? <div style={{ paddingTop: "30px", justifyContent: "center", alignItems: "center", textAlign: "center", width: "100%" }}><p>Loading...</p> <CircularProgress /> </div> :
                <Grid container spacing={4} style={{ marginTop: "50px" }}>
                    <Grid item xs={12} sm={12} md={4}>
                        <Card className={classes.card}>
                            <CardContent className={classes.cardContent} >
                                <Typography gutterBottom variant="h5" component="h2">
                                    Total New Consumer
                                </Typography>

                                <Typography color="primary" variant="h2" component="h2" style={{fontWeight:"bold" , textAlign:"center"}}>
                                    {customerTotal.newCustomer}
                                </Typography>

                            </CardContent>
                            <CardActions>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <Card className={classes.card}>
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Total Old Consumer
                                </Typography>

                                <Typography color="secondary" variant="h2" component="h2" style={{fontWeight:"bold", textAlign:"center"}}>
                                    {customerTotal.oldCustomer}
                                </Typography>

                            </CardContent>
                            <CardActions>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <Card className={classes.card}>
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Total Connection
                                </Typography>

                                <Typography color="primary" variant="h2" component="h2" style={{fontWeight:"bold", textAlign:"center"}}>
                                    {customerTotal.totalConnection}
                                </Typography>

                            </CardContent>
                            <CardActions>
                            </CardActions>
                        </Card>
                    </Grid>

                </Grid>}
            </Container>
        </div>
    

        </React.Fragment >
    );


}

export default AgentDashBoard