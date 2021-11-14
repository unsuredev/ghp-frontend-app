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



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        color: 'white',
        width: 185,
        margin: 10

    },
    margin: {
        margin: theme.spacing(1),

    }, main:
    {
        width: 270
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


const Reports = () => {
    const classes = useStyles();
    const [customerTotal, setCustomerTotal] = React.useState("")
    const [memberCount, setMemberCount] = React.useState("")
    const [agent, setAgent] = React.useState("")
    const [loading, setLoading] = React.useState(true)
    const [show, setShow] = React.useState(false)
    const [oldCustomer , setOldCustomer]=React.useState("")
    const [old, setOld]=React.useState(false)
    const [hide, setHide]=React.useState(false)


    const fetchCount = async () => {
        try {
            //@ts-ignore
            const result = await httpClient("customer/count", "POST", { "project": "GET_COUNT" })
            if (result.data) {
                setCustomerTotal(result.data.CustomerCount)
                setMemberCount(result.data.userCount)
                setAgent(result.data.agentCount)
                setLoading(false)
            }
        }
        catch (error) {
            console.error(error);
        }
    }



    const fetchOldDataCount = async () => {

        try {
            //@ts-ignore
            const result = await httpClient("old/customer/count", "POST", { "project": "GET_COUNT" })
            if (result.data) {
                setOldCustomer(result.data.CustomerCount)
                setLoading(false)
            }
        }
        catch (error) {
            console.error(error);
        }
    }


const toggleView=()=>{
    setOld(!old)

}


const toggleNewView=()=>{
    setHide(!hide)

}





    React.useEffect(() => {
        document.title = "Live Stats | JAMAN HP GAS  "
        fetchCount()
        fetchOldDataCount()
    }, []);



    return (
        <React.Fragment>

            <CssBaseline />
            <ResponsiveDrawer />
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Card className={classes.main}>
                                    <CardContent>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom style={{textAlign:"center"}}>
                                        Total Customer 2021 
                                        </Typography>
                                        {loading ? <div style={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /> </div> : <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                            {customerTotal}
                                        </Typography>
                                        
                                        }
                                        
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                onClick={toggleNewView} 
                                            >View & Download</Button>

                                    </CardContent>
                                </Card>
                                <Card className={classes.main}>
                                    <CardContent>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom style={{textAlign:"center"}}> 
                                            Total Customer Before 2021 
                                        </Typography>
                                        {loading ? <div style={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /> </div> : <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                            {oldCustomer}
                                        </Typography>
                                        }
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                color="secondary"
                                                onClick={toggleView}
                                            >View & Download</Button>
                                    </CardContent>
                                </Card>
                                
                            </Grid>
                        </div>
                        <Grid container spacing={4} style={{ marginTop: "50px" }}>
                            <Grid item xs={12} sm={12} md={6}>
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Total Members
                                        </Typography>
                                        
                                        <Typography>
                                        {memberCount}
                                        </Typography>

                                    </CardContent>
                                    <CardActions>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Total Agents
                                        </Typography>
                                    
                                        <Typography>
                                        {agent}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </main>
            <div>
                <Container>
                    {hide && <FullConsumerTable />}
                </Container>
                <Container>
                    {old && <OldFullConsumerTable />}
                </Container>
            </div>
            <FooterSection />
        </React.Fragment >
    );


}

export default Reports