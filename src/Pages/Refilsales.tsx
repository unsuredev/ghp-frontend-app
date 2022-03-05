import React from 'react';
import MaterialTable from 'material-table';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {
    Button,
    Grid,
    makeStyles,
    CssBaseline,
    TextField, Typography
} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import InputLabel from '@material-ui/core/InputLabel';
import { BASE_URL } from "../Common/constant";
import { ToastContext } from "../Common/ToastProvider";

import ResponsiveDrawer from "./Drawer";

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
    formControl: {
        minWidth: 250
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));


const RefilSales = () => {
    const classes = useStyles();
    const { showToast } = React.useContext(ToastContext);

    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false)
    const [sptype, setSptype] = React.useState('14.2 KG ONLY');
    const [agentList, setAgetList] = React.useState([]);
    const [agentDetails, setAgentDetails] = React.useState("")

    const [agentdata, setAgentdata] = React.useState({
        agent: "",
        totalAmount: 0,
        totalAmountPaid: 0,
        totalAmountDue: 0,
        remarks: "",
        loadPaid14: 0,
        emptyCycliderRecived14: 0,
        emptyDue14: 0,
        rate14: 0,
        loadPaid19: 0,
        emptyCycliderRecived19: 0,
        emptyDue19: 0,
        rate19: 0,
        loadPaid5: 0,
        emptyCycliderRecived5: 0,
        emptyDue5: 0,
        rate5: 0,
        loadPaid5ftl: 0,
        emptyCycliderRecived5ftl: 0,
        emptyDue5ftl: 0,
        rate5ftl: 0,
        spCategory:"",
        spQantity: 0,
        spRate: 0,

    })

    const handleSpType = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSptype(event.target.value as string);
    };

    const handleChange = (event: any) => {
        setAgentdata({ ...agentdata, [event.target.name]: event.target.value });
    };







    React.useEffect(() => {
        getCharacters();
        fetchRefilSalesHistory()
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

    const totalAmount14 = () => {
        //@ts-ignore
        const totalamount14 = agentdata.loadPaid14 * agentdata.rate14
        return totalamount14
    }

    const totalAmount19 = () => {
        //@ts-ignore
        const totalamount19 = agentdata.loadPaid19 * agentdata.rate19
        return totalamount19
    }


    const totalAmount5 = () => {
        //@ts-ignore
        const totalamount5 = agentdata.loadPaid5 * agentdata.rate5
        return totalamount5
    }

    const totalAmount5ftl = () => {
        //@ts-ignore
        const totalamount5ftl = agentdata.loadPaid5ftl * agentdata.rate5ftl
        return totalamount5ftl
    }



    const totalAmountSp = () => {
        //@ts-ignore
        const totalamountSp = agentdata.spQantity * agentdata.spRate
        return totalamountSp
    }

    const todaysTotalAmount = () => {
        return totalAmount14() + totalAmount19() + totalAmount5() + totalAmount5ftl() + totalAmountSp()
    }


    const todaysTotalAmountDue = () => {
        //@ts-ignore
        const todaysDue = todaysTotalAmount() - agentdata.totalAmountPaid
        return todaysDue
    }



    // GET A AGENT'S REFIL SALE
    const handleFind = async () => {
        try {
            const result = await axios.post(BASE_URL + "refilsale/get", { "agent": agentdata.agent },
                {
                    headers: {
                        encryption: false,
                        access_token: getToken()
                    },
                })
            if (result.data && result.data != undefined) {
                setAgentDetails(result.data.result.data.agent)
                showToast("Fetched agent's details susccesssfully", "success")

            }
        } catch (error) {
            if (error) {
                //@ts-ignore
                console.log("error", error)
            }
        }
    };

       // UPDATE A AGENT'S REFIL SALE
       const updateHandle = async () => {
        try {
            if(!agentdata.agent)
            {
                return showToast("PLease choose a agent first!", "warn")

            }
            const result = await axios.post(BASE_URL + "refilsale/update",
                {
                    agent: agentdata.agent,
                    totalAmount: todaysTotalAmount(),
                    totalAmountPaid: agentdata.totalAmountPaid,
                    totalAmountDue: todaysTotalAmountDue(),
                    remarks:agentdata.remarks,
                    loadPaid14:agentdata.loadPaid14,
                    emptyCycliderRecived14: agentdata.emptyCycliderRecived14,
                    emptyDue14: agentdata.emptyDue14,
                    rate14: agentdata.rate14,
                    loadPaid19: agentdata.loadPaid19,
                    emptyCycliderRecived19: agentdata.emptyCycliderRecived19,
                    emptyDue19: agentdata.emptyDue19,
                    rate19: agentdata.rate19,
                    loadPaid5: agentdata.loadPaid5,
                    emptyCycliderRecived5: agentdata.emptyCycliderRecived5,
                    emptyDue5: agentdata.emptyDue5,
                    rate5: agentdata.rate5,
                    loadPaid5ftl: agentdata.loadPaid5ftl,
                    emptyCycliderRecived5ftl: agentdata.emptyCycliderRecived5ftl,
                    emptyDue5ftl: agentdata.emptyDue5ftl,
                    rate5ftl: agentdata.rate5ftl,
                    spQantity: agentdata.spQantity,
                    spRate: agentdata.spRate,
                    spCategory:sptype
                },
                {
                    headers: {
                        encryption: false,
                        access_token: getToken()
                    },
                })
                if (result.data ) {
                    showToast(result.data.data.message, "success")
    
                }
        } catch (error) {
            if (error) {
                //@ts-ignore
                console.log("error", error)
                 //@ts-ignore
                showToast(error.response.data.errorMessage, "error")


            }
        }
    };




    const fetchRefilSalesHistory = async() => {
        try {
            setLoading(true)
            const result = await axios.get(BASE_URL + "/refilsale/getAll", {
                headers: {
                    encryption: false,
                    access_token: getToken()
                },
            });
            if(result.data){
                console.log("resultdata", result.data)
                setData(result.data.data.data)
                setLoading(false)
            }
        }
        catch (error) {
            console.log("error", error)
        }
    }


    const columns = [
        { title: "Name", field: "agent" },
        { title: "Load Paid 14KG", field: "loadPaid14" },
        { title: "Empty Cyclider Recived 14KG", field: "emptyCycliderRecived14" },
        { title: "Empty Due 14", field: "emptyDue14" },
        { title: "Rate 14KG ", field: "rate14" },

        { title: "Load Paid 19KG", field: "loadPaid19" },
        { title: "Empty Cyclider Recived 19KG", field: "emptyCycliderRecived19" },
        { title: "Empty Due 19", field: "emptyDue19" },
        { title: "Rate 19 KG", field: "rate19" },
        
        { title: "Load Paid 5KG", field: "loadPaid5" },
        { title: "Empty Cyclider Recived 5KG", field: "emptyCycliderRecived5" },
        { title: "Empty Due 5KG", field: "emptyDue14" },
        { title: "Rate 19 KG", field: "rate5" },
        
        { title: "Load Paid FTL", field: "loadPaid5ftl" },
        { title: "Empty Cyclider Recived FTL", field: "emptyCycliderRecived5ftl" },
        { title: "Empty Due 5KG", field: "emptyDue14" },
        { title: "Rate FTL", field: "rate5ftl" },
        
        { title: "Special Category", field: "spCategory" },
        { title: "Special Quantity ", field: "spRate" },
        { title: "Special Remarks ", field: "remarks" },
        { title: "Total Amount ", field: "totalAmount" },
        { title: "Total Amount Due ", field: "totalAmountDue" },
        { title: "Total Amount Paid ", field: "totalAmountPaid" },


        
    
        
    ]




    return (
        <React.Fragment>
            <ResponsiveDrawer />
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="md">
                        <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
                            Refil Sales Managements
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} style={{ textAlign: "center" }} >
                                <Grid item xs={12} md={4}>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl variant="filled" className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-required-label">Agent Name *</InputLabel>
                                        <Select
                                            onChange={handleChange}
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
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
                                </Grid>
                            </Grid>
                            <div style={{ marginTop: "1rem", textAlign: "center" }}>
                                <Button variant="contained" size="medium" color="primary" onClick={handleFind} >
                                    CHOOSE AGENT
                                </Button>
                            </div>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="lg">
                    {/* @ts-ignore */}
                    <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
                        Name: <span style={{ color: "blue" }}>  {agentDetails}</span>

                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={12} md={2} spacing={3}>
                            <Typography >14 KG REFIL SALE </Typography>
                            <TextField
                                id="outlined-basic"
                                size="small"
                                label="Load Paid"
                                variant="outlined"
                                name="loadPaid14"
                                value={agentdata.loadPaid14}
                                type="number"
                                onChange={handleChange}
                            />
                            <TextField
                                id="outlined-basic"
                                size="small"
                                label="Empty Received"
                                value={agentdata.emptyCycliderRecived14}
                                variant="outlined"
                                name="emptyCycliderRecived14"
                                type="number"
                                onChange={handleChange}
                            />
                            {/* @ts-ignore */}
                            <Typography style={{ textAlign: "left" }} variant="body2">Empty Due :{agentdata.loadPaid14 - agentdata.emptyCycliderRecived14}</Typography>
                            <TextField
                                id="outlined-basic"
                                size="small"
                                label="Rate"
                                value={agentdata.rate14}
                                variant="outlined"
                                name="rate14"
                                onChange={handleChange}

                                type="number"
                            />
                            {/* @ts-ignore */}
                            <Typography >Amount:{totalAmount14()} </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2} spacing={3}>
                            <Typography >19 KG REFIL SALE </Typography>
                            <TextField
                                id="outlined-basic"
                                size="small"
                                label="Load Paid"
                                variant="outlined"
                                name="loadPaid19"
                                type="number"
                                onChange={handleChange}
                                value={agentdata.loadPaid19}

                            />
                            <TextField
                                id="outlined-basic"
                                size="small"
                                label="Empty Received"
                                variant="outlined"
                                name="emptyCycliderRecived19"
                                type="number"
                                onChange={handleChange}
                                value={agentdata.emptyCycliderRecived19}
                            />
                            {/* @ts-ignore */}
                            <Typography style={{ textAlign: "left" }} variant="body2">Empty Due :{agentdata.loadPaid19 - agentdata.emptyCycliderRecived19}</Typography>
                            <TextField
                                id="outlined-basic"
                                size="small"
                                label="Rate"
                                variant="outlined"
                                name="rate19"
                                type="number"
                                onChange={handleChange}
                                value={agentdata.rate19}
                            />
                            {/* @ts-ignore */}
                            <Typography >Amount:{totalAmount19()} </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2} spacing={3} >
                            <Typography >5 KG REFIL SALE </Typography>
                            <TextField
                                id="outlined-basic"
                                size="small"
                                label="Load Paid"
                                variant="outlined"
                                name="loadPaid5"
                                type="number"
                                onChange={handleChange}
                                value={agentdata.loadPaid5}
                            />
                            <TextField
                                id="outlined-basic"
                                size="small"
                                label="Empty Received"
                                variant="outlined"
                                name="emptyCycliderRecived5"
                                type="number"
                                onChange={handleChange}
                                value={agentdata.emptyCycliderRecived5}
                            />
                            {/* @ts-ignore */}

                            <Typography style={{ textAlign: "left" }} variant="body2">Empty Due :{agentdata.loadPaid5 - agentdata.emptyCycliderRecived5}</Typography>

                            <TextField
                                id="outlined-basic"
                                size="small"
                                label="Rate"
                                variant="outlined"
                                name="rate5"
                                type="number"
                                onChange={handleChange}
                                value={agentdata.rate5}
                            />
                            {/* @ts-ignore */}

                            <Typography >Amount:{totalAmount5()} </Typography>

                        </Grid>
                        <Grid item xs={12} sm={12} md={2} >
                            <Typography >5KG FTL REFIL SALE </Typography>
                            <TextField
                                id="outlined-basic"
                                size="small"
                                label="Load Paid"
                                variant="outlined"
                                name="loadPaid5ftl"
                                type="number"
                                onChange={handleChange}
                                value={agentdata.loadPaid5ftl}
                            />
                            <TextField
                                id="outlined-basic"
                                size="small"
                                label="Empty Received"
                                variant="outlined"
                                name="emptyCycliderRecived5ftl"
                                type="number"
                                onChange={handleChange}
                                value={agentdata.emptyCycliderRecived5ftl}
                            />
                            {/* @ts-ignore */}

                            <Typography style={{ textAlign: "left" }} variant="body2">Empty Due :{agentdata.loadPaid5ftl - agentdata.emptyCycliderRecived5ftl}</Typography>
                            <TextField
                                id="outlined-basic"
                                size="small"
                                label="Rate"
                                variant="outlined"
                                name="rate5ftl"
                                type="number"
                                onChange={handleChange}
                                value={agentdata.rate5ftl}
                            />
                            {/* @ts-ignore */}
                            <Typography >Amount:{agentdata.loadPaid5ftl * agentdata.rate5ftl} </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3}>
                            <Typography >NC/EXTRA REFIL SALE </Typography>
                            <FormControl variant="filled" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-filled-label">Cylinder Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={sptype}
                                    onChange={handleSpType}
                                >
                                    <MenuItem value="14 KG NC WITHOUT OVEN">14 KG NC WITHOUT OVEN </MenuItem>
                                    <MenuItem value="14 KG NC WITH OVEN">14 KG NC WITH OVEN </MenuItem>
                                    <MenuItem value="5 KG DOMESTIc">5 KG NC DOMESTIC </MenuItem>
                                    <MenuItem value="5 KG FTLR">5 KG FTL NC</MenuItem>
                                    <MenuItem value="5 KG FTLR">PAPER CONNECTION</MenuItem>
                                    <MenuItem value="5 KG FTLR">EXTRA OVEN</MenuItem>

                                </Select>
                            </FormControl>
                            <TextField
                                id="outlined-basic"
                                size="small"
                                label="Quantity"
                                variant="outlined"
                                name="spQantity"
                                type="number"
                                onChange={handleChange}
                                value={agentdata.spQantity}
                            />
                            <TextField
                                id="outlined-basic"
                                size="small"
                                label="Rate"
                                variant="outlined"
                                name="spRate"
                                type="number"
                                onChange={handleChange}
                                value={agentdata.spRate}
                            />
                            {/* @ts-ignore */}
                            <Typography variant="body2">Amount:{agentdata.spQantity * agentdata.spRate} </Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={12} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography  >Total Amount: {todaysTotalAmount()} </Typography>

                                    <TextField
                                        id="outlined-basic"
                                        size="small"
                                        label="Total Amount Paid"
                                        variant="outlined"
                                        name="totalAmountPaid"
                                        type="number"
                                        onChange={handleChange}
                                        value={agentdata.totalAmountPaid}
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        size="small"
                                        label="Remarks"
                                        variant="outlined"
                                        name="remarks"
                                        type="text"
                                        onChange={handleChange}
                                        value={agentdata.remarks}
                                    />
                                    {/* @ts-ignore */}

                                    <Typography >Total Amount Due:{todaysTotalAmountDue()} </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    <div style={{ marginTop: "1rem", textAlign: "center" }}>
                        <Button variant="contained" size="medium" color="secondary" onClick={updateHandle}>
                            save & update
                        </Button>
                    </div>
                </Container>

            <Container component="main" >
                {loading ? <div style={{ paddingTop: "30px", justifyContent: "center", alignItems: "center", textAlign: "center", width: "100%" }}><p>This may take couple of mins...</p> <CircularProgress /> </div> :
                    <MaterialTable
                        title="Jaman Hp Consumer Data"
                        data={data}
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

            </Container>
            </main>
            {/* Footer */}


            {/* End footer */}
        </React.Fragment >
    );
}



export default RefilSales