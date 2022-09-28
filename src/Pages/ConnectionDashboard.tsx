import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Grid, Container, CssBaseline, } from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import { ToastContext } from "../Common/ToastProvider";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { BASE_URL } from "../Common/constant";
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from '@material-ui/core/InputLabel';
import Select from "@material-ui/core/Select";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ResponsiveDrawer from "./Drawer";
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import MUIDataTable from "mui-datatables";
import MaterialTable from 'material-table';
import CircularProgress from '@material-ui/core/CircularProgress';
import jwt_decode from "jwt-decode";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import CardMedia from '@material-ui/core/CardMedia';
const useStyles = makeStyles({
    head: {
        backgroundColor: 'blue',
        color: 'white',
    },
    table: {
        minWidth: 500,
    },
    formControl: {
        minWidth: "50%",
    },
    selectEmpty: {
        marginTop: '',
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
    },
    cardMedia: {
        paddingTop: '46.25%', // 16:9
      },
});



const ConnectionDashboard = () => {
    const classes = useStyles();
    const { showToast } = React.useContext(ToastContext);
    const [show, setShow] = React.useState(false)
    const [agentList, setAgetList] = React.useState([]);
    const [sms, setSms]= React.useState({
        "agent":"",
        "load": 0,
        "regulator": 0,
        "pipe": 0,
        "light": 0,
        "bplOven": 0,
        "nonHpOven": 0,
        "hpOven": 0,
        "installationPending":0,
        "paidAmount": 0,
        "dueAmount":0
    })
    const [customer, setCustomer] = React.useState({
        agent: "",
    });
    const [open, setOpen] = React.useState(false);
    const [agent, setAgent] = React.useState({
        "agent": "",
        "totalConnection": 0,
        "load": 0,
        "regulator": 0,
        "pipe": 0,
        "totalLight": 0,
        "paidLight": 0,
        "bplOven": 0,
        "nonHpOven": 0,
        "hpOven": 0,
        "paidAmount": 0,
        "remarks": " ",
        installationComplete: 0
    })

    const [connection, setConnection] = React.useState({
        "agent": "",
        "totalConnection": 0,
        "load": 0,
        "regulator": 0,
        "pipe": 0,
        "totalLight": 0,
        "paidLight": 0,
        "bplOven": 0,
        "nonHpOven": 0,
        "hpOven": 0,
        "paidAmount": 0,
        "remarks": " ",
    })



    const [pricing, setPricing] = React.useState({})
    const [openPrice, setOpenPrice] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false)
    const [loadingTable, setLoadingTable] = React.useState(false)

    const handleClickOpen = () => {
        setOpenPrice(true);
    };

    const handleClose = () => {
        setOpenPrice(false);
    };


    const handleChangePricing = (event: any) => {
        setPricing({ ...pricing, [event.target.name]: event.target.value });
    }

    const updatePricing = async (event: any) => {
        try {
            const result = await axios.post(BASE_URL + "pricing/update", { data: pricing },
                {
                    headers: {
                        encryption: false,
                        access_token: getToken()
                    },
                })
            if (result.data.data && result.data != undefined) {
                //@ts-ignore
                showToast(result.data.message, "success");
                setOpenPrice(false)
            }
        } catch (error) {
            if (error) {
                //@ts-ignore
                showToast(error.response.data.message, "error")
            }
        }
    };



    const handleChange = (event: any) => {
        setConnection({ ...connection, [event.target.name]: event.target.value });
    }

    const handleChangeSMS = (event: any) => {
        setSms({ ...sms, [event.target.name]: event.target.value });
    }


    const getUserName = () => {
        let token: any = localStorage.getItem("access_token");
        var decoded = jwt_decode(token);
        //@ts-ignore
        let { name } = decoded;
        if (name && name != undefined) {
            return name
        }

    }


    const getRole = () => {
        let token: any = localStorage.getItem("access_token");

        var decoded = jwt_decode(token);
        //@ts-ignore
        let { role } = decoded;
        return role;
    }





    const handleUpdate = async () => {
        setOpen(false);
        try {
            const result = await axios.post(BASE_URL + "agent/connection/update", {
                "agent": customer.agent,
                "totalConnection": connection.totalConnection,
                "load": connection.load,
                "regulator": connection.regulator,
                "pipe": connection.pipe,
                "totalLight": connection.totalLight,
                "paidLight": connection.paidLight,
                "bplOven": connection.bplOven,
                "nonHpOven": connection.nonHpOven,
                "hpOven": connection.hpOven,
                "paidAmount": connection.paidAmount,
                "remarks": connection.remarks,
                "updatedBy": getUserName()
            },
                {
                    headers: {
                        encryption: false,
                        access_token: getToken()
                    },
                })
            if (result.data.data && result.data != undefined) {
                //@ts-ignore
                showToast(result.data.message, "success");
                setOpen(false);
                setConnection({
                    "agent": "",
                    "totalConnection": 0,
                    "load": 0,
                    "regulator": 0,
                    "pipe": 0,
                    "totalLight": 0,
                    "paidLight": 0,
                    "bplOven": 0,
                    "nonHpOven": 0,
                    "hpOven": 0,
                    "paidAmount": 0,
                    "remarks": " ",
                })
            }
        } catch (error) {
            if (error) {
                //@ts-ignore
                showToast(error.response.data.message, "error")
            }
        }
    };



    const getToken = () => {
        //@ts-ignore
        return localStorage.getItem("access_token")
    }

    React.useEffect(() => {
        getCharacters();
        getPricing()
    }, []);


    const getUser = () => {
        let token: any = localStorage.getItem("access_token");
        var decoded = jwt_decode(token);
        //@ts-ignore
        let { role } = decoded;

        if (role === "employee") {
            return true;
        } else {
            return false;
        }
    };

    const getPricing = async () => {
        try {
            const result = await axios.get(BASE_URL + "pricing/get",
                {
                    headers: {
                        encryption: false,
                        access_token: getToken()
                    },
                });
            if (result && result.data) {
                console.log("pricing", result.data.data[0])
                setPricing(result.data.data[0])
            }
        }
        catch (error) {
            if (error) {
                //@ts-ignore
                showToast(error.response.data.message, "error")
            }
        }
    }



    const FindOwnConnection = async () => {
        try {
            const result = await axios.post(BASE_URL + "agent/connection/get", {
                "agent": getUserName()
            },
                {
                    headers: {
                        encryption: false,
                        access_token: getToken()
                    },
                });
            if (result && result.data) {
                setAgent(result.data.data)
                setShow(true)
            }
        }
        catch (error) {
            if (error) {
                //@ts-ignore
                showToast(error.response.data.message, "error")
            }
        }
    }



    const handleFind = async () => {
        try {
            if(getRole()==="user"){
                FindOwnConnection()
            }
        else{
            const result = await axios.post(BASE_URL + "agent/connection/get", {
                "agent": customer.agent
            },
                {
                    headers: {
                        encryption: false,
                        access_token: getToken()
                    },
                });
            if (result && result.data) {
                setAgent(result.data.data)
                setShow(true)
            }
        }}
        catch (error) {
            if (error) {
                //@ts-ignore
                showToast(error.response.data.message, "error")
            }
        }
    }


    const handleChangeAgent = (event: any) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
        setConnection({ ...connection, [event.target.name]: event.target.value })
        setSms({ ...sms, [event.target.name]: event.target.value })
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


    //sales hitory data
    const fetchSalesData = async () => {
        try {
            setLoadingTable(true)
            setLoading(true)
            if(getRole()==="user"){
                fetchOwnSalesData()
            }else{
            const result = await axios.post(BASE_URL + "agent/slaes/getall", { "agent": customer.agent },
                {
                    headers: {
                        encryption: false,
                        access_token: getToken()
                    },
                })
            if (result.data) {
                setData(result.data.data)
                setLoading(false)
                setLoadingTable(true)
            }
        }}
        catch (error) {
            if (error) {
                //@ts-ignore
                showToast(error.response.data.message, "error")
            }
        }
    }


        //find own nc delivery data
        const fetchOwnSalesData = async () => {
            try {
                setLoadingTable(true)
                setLoading(true)
                const result = await axios.post(BASE_URL + "agent/slaes/getall", { "agent":getUserName()
                 },
                    {
                        headers: {
                            encryption: false,
                            access_token: getToken()
                        },
                    })
                if (result.data) {
                    setData(result.data.data)
                    setLoading(false)
                    setLoadingTable(true)
                }
            }
            catch (error) {
                if (error) {
                    //@ts-ignore
                    showToast(error.response.data.message, "error")
                }
            }
        }

        //send SMS to agent
        const sendSms = async () => {
            try {
                const result = await axios.post(BASE_URL + "agent/sendsms", { 
                    sms
                },
                    {
                        headers: {
                            encryption: false,
                            access_token: getToken()
                        },
                    })
                if (result.data) {
                    showToast(result.data.message, "success");
                }
            }
            catch (error) {
                if (error) {
                    //@ts-ignore
                    showToast(error.response.data.message, "error")
                }
            }
        }
    




    const columns = [
        { title: 'AGENT', field: 'agent' },
        { title: "TOTAL CONNECTION ", field: "totalConnection", type: 'numeric' },
        { title: "LOAD PAID", field: "load", type: 'numeric' },
        { title: "REGULATOR PAID", field: "regulator" },
        { title: "PIPE PAID", field: "pipe" },
        { title: "LIGHT PAID", field: "paidLight" },
        { title: "BPL OVEN", field: "bplOven" },
        { title: "NON HP OVEN", field: "nonHpOven" },
        { title: "HP OVEN", field: "hpOven" },
        { title: "OVEN DUE", field: "bplOven" },
        { title: "PAID AMOUNT ", field: "paidAmount" },
        { title: "REMARKS ", field: "remarks" },
        {
            title: "DATE ", field: "updatedAt", type: "date",
            dateSetting: { locale: "ko-KR" }
        }
    ]



    return (
        <React.Fragment>
            <CssBaseline />
            <ResponsiveDrawer />
            <Container style={{ justifyContent: "center", alignContent: "center", textAlign: "center" }}>
                <Grid item xs={12} sm={12} md={12}  >
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-required-label">Agent Name *</InputLabel>
                        {getRole()!="user"?
                        <Select
                            displayEmpty
                            className={classes.selectEmpty}
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            inputProps={{ 'aria-label': 'Without label' }}
                            name="agent"
                            onChange={handleChangeAgent}
                        >
                            {agentList.map(item => (
                                <MenuItem
                                    //@ts-ignore
                                    key={item.label} value={item.value} >{item.label}</MenuItem>
                            ))}
                        </Select>:
                                    <Typography variant="button" display="block" gutterBottom> <span style={{ color: "blue", fontSize: "20px" }}>{getUserName()}</span></Typography>}
                    </FormControl>
                </Grid>

                <Grid item style={{ marginTop: "1rem" }}>
                    <Button
                        variant="contained"
                        component="label"
                        color="primary"
                        onClick={handleFind}
                    >
                        FETCH & UPDATE
                    </Button>
                    <Button
                        variant="contained"
                        component="label"
                        color="secondary"
                        onClick={fetchSalesData}
                    >
                        VIEW HISTORY
                    </Button>

                </Grid>
                {show ?
                    <Grid container spacing={3} style={{ marginTop: "2rem" }}>



                        <Grid item xs={12} md={4}  >
                            <Card >
                            <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                                <CardContent>
                                    <Typography variant="button" display="block" gutterBottom><span style={{ color: "#e91e63", fontSize: "20px" ,textAlign:"center" }}> {agent.agent}</span></Typography>
                                    <div style={{textAlign:"left"}}>

                                    
                                    <Typography variant="button" display="block" gutterBottom>TOTAL CONNECTION: <span style={{ color: "blue", fontSize: "20px" }}>{agent.totalConnection}</span></Typography>
                                    <Typography variant="button" display="block" gutterBottom>LOAD PAID: <span style={{ color: "blue", fontSize: "20px" }}>{agent.load}</span></Typography>
                                    <Typography variant="button" display="block" gutterBottom>Installation Complete: <span style={{ color: "#e91e63", fontSize: "20px" }}>{agent.installationComplete}</span></Typography>
                                    <Typography variant="button" display="block" gutterBottom>Pending Installation: <span style={{ color: "blue", fontSize: "20px" }}>{agent.load - agent.installationComplete}</span></Typography>
                                    <Typography variant="button" display="block" gutterBottom>CONNECTION DUE: <span style={{ color: "blue", fontSize: "20px" }}>{agent.totalConnection - agent.load}</span></Typography>
                                    <Typography variant="button" display="block" gutterBottom>REGULATOR PAID: <span style={{ color: "blue", fontSize: "20px" }}> {agent.regulator}</span></Typography>
                                    <Typography variant="button" display="block" gutterBottom>REGULATOR DUE:<span style={{ color: "blue", fontSize: "20px" }}>{agent.load - agent.regulator}</span></Typography>
                                    <Typography variant="button" display="block" gutterBottom>PIPE PAID:<span style={{ color: "blue", fontSize: "20px" }}> {agent.pipe}</span></Typography>
                                    <Typography variant="button" display="block" gutterBottom>PIPE DUE:<span style={{ color: "blue", fontSize: "20px" }}> {agent.load - agent.pipe}</span></Typography>
                                    <Typography variant="button" display="block" gutterBottom>LIGHT PAID: <span style={{ color: "blue", fontSize: "20px" }}>{agent.paidLight}</span></Typography>
                                    <Typography variant="button" display="block" gutterBottom>LIGHT DUE:<span style={{ color: "blue", fontSize: "20px" }}> {agent.hpOven + agent.nonHpOven - agent.paidLight}</span></Typography>
                                    <Typography variant="button" display="block" gutterBottom>BPL OVEN: <span style={{ color: "blue", fontSize: "20px" }}>{agent.bplOven}</span></Typography>
                                    <Typography variant="button" display="block" gutterBottom>NON HP OVEN:<span style={{ color: "blue", fontSize: "20px" }}>{agent.nonHpOven}</span></Typography>
                                    <Typography variant="button" display="block" gutterBottom>HP OVEN: <span style={{ color: "blue", fontSize: "20px" }}>{agent.hpOven}</span></Typography>
                                    <Typography variant="button" display="block" gutterBottom>OVEN DUE: <span style={{ color: "blue", fontSize: "20px" }}>{agent.load - agent.hpOven - agent.nonHpOven - agent.bplOven}</span></Typography>
                                    {/* @ts-ignore */}
                                    <Typography variant="button" display="block" gutterBottom>TOTAL AMOUNT :  <span style={{ color: "blue", fontSize: "20px" }}> {agent.nonHpOven * pricing.nonHpOvenPricing + agent.hpOven * pricing.hpOvenPricing}</span></Typography>
                                    {/* @ts-ignore */}
                                    <Typography variant="button" display="block" gutterBottom>AMOUNT PAID : <span style={{ color: "blue", fontSize: "20px" }}> {agent.paidAmount}</span></Typography>
                                    {/* @ts-ignore */}
                                    <Typography variant="button" display="block" gutterBottom>AMOUNT DUE: <span style={{ color: "blue", fontSize: "20px" }}> {agent.nonHpOven * pricing.nonHpOvenPricing + agent.hpOven * pricing.hpOvenPricing - agent.paidAmount}</span></Typography>
                                    <Typography variant="button" display="block" gutterBottom>REMARKS: <span style={{ color: "blue", fontSize: "20px" }}> {agent.remarks} </span></Typography>
                                    <Typography variant="button" display="block" gutterBottom>ACTION :           {getRole()==="admin"||getRole()==="superadmin" ?
                                        <IconButton aria-label="delete" size="medium" onClick={() => setOpen(true)}>
                                            <CreateIcon />
                                        </IconButton> : "No option"}</Typography>
                                        </div>
                                </CardContent>
                            </Card>
                        </Grid>


                        {getRole()==="admin" || getRole()==="superadmin" ?
                        <Grid item xs={12} md={4}>
                            
                            <Card >
                                
                                <CardContent>
                                    <Typography gutterBottom>
                                        Send SMS Update to <span style={{ color: "#e91e63" , paddingTop:"3rem" }}>{agent.agent}</span>
                                    </Typography>
                                    <Grid container spacing={1} style={{marginTop:"2rem"}}>
                                    <Grid item xs={6}   >
                                        <div style={{margin:"2px"}}>
                                       
                                            <TextField label="Load"
                                                id="standard-size-small"
                                                size="small"
                                                value={sms.load}
                                                onChange={handleChangeSMS}
                                                name="load"
                                                type="Number"

                                            />
                                         <TextField label="Regulator"
                                                id="standard-size-normal"
                                                size="small"
                                                value={sms.regulator}
                                                onChange={handleChangeSMS}
                                                name="regulator"
                                                type="Number"

                                            />
                                            <TextField
                                                label="HP Oven"
                                                id="standard-size-small"
                                                size="small"
                                                value={sms.hpOven}
                                                onChange={handleChangeSMS}
                                                name="hpOven"
                                                type="Number"

                                            />
                                            <TextField label="BPL Oven"
                                                id="standard-size-normal"
                                                size="small"
                                                value={sms.bplOven}
                                                onChange={handleChangeSMS}
                                                name="bplOven"
                                                type="Number"

                                            />
                                       
                                            <TextField label="Amount Paid"
                                                id="standard-size-normal"
                                                size="small"
                                                value={sms.paidAmount}
                                                onChange={handleChangeSMS}
                                                name="paidAmount"
                                                type="Number"

                                            />
                                                 
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} >
                                            <TextField label="Pipe"
                                                id="standard-size-normal"
                                                size="small"
                                                value={sms.pipe}
                                                onChange={handleChangeSMS}
                                                name="pipe"
                                                type="Number"

                                            />
                                            <TextField label="Non HP Oven"
                                                id="standard-size-small"
                                                size="small"
                                                value={sms.nonHpOven}
                                                onChange={handleChangeSMS}
                                                name="nonHpOven"
                                                type="Number"

                                            />
                                            <TextField label="Light"
                                                id="standard-size-normal"
                                                size="small"
                                                value={sms.light}
                                                onChange={handleChangeSMS}
                                                name="light"
                                                type="Number"

                                            />
                                                <TextField label="Installation Pending"
                                                id="standard-size-normal"
                                                size="small"
                                                value={sms.installationPending}
                                                onChange={handleChangeSMS}
                                                name="installationPending"
                                                type="Number"

                                            />
                                            <TextField label="Total Amount Due"
                                                id="standard-size-normal"
                                                size="small"
                                                value={sms.dueAmount}
                                                onChange={handleChangeSMS}
                                                name="dueAmount"
                                                type="Number"

                                            />
                                    </Grid>
                                    </Grid>
                                </CardContent>
                                <Button
                                        variant="contained"
                                        component="label"
                                        color="primary"
                                        size="large"
                                        onClick={sendSms}
                                    >
                                        SEND SMS
                                    </Button>
                            </Card>
                        </Grid>:null
                        }
                                                {getRole()==="superadmin" &&(

                        <Grid item xs={12} md={4}>
                            <Card style={{ backgroundColor: "#009688", color: "white", height: "11rem" }}>
                                <CardContent>
                                    <Typography gutterBottom>
                                        Today's Pricing Table
                                    </Typography>
                                    <Typography variant="h6" component="h2">
                                        {/* @ts-ignore */}
                                        HP Oven Price : <b>{pricing.hpOvenPricing} &#x20B9;</b>
                                    </Typography>
                                    <Typography variant="h6" component="h2">
                                        {/* @ts-ignore */}
                                        Non HP Oven Price : <b>{pricing.nonHpOvenPricing} &#x20B9;</b>
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => setOpenPrice(true)}><CreateIcon fontSize="small" style={{ color: "white" }} /></Button>
                                </CardActions>
                            </Card> 
                            </Grid>
                                                )}
                    </Grid>
                    : null}
                <div>
                    <Dialog
                        open={openPrice}
                        keepMounted
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-slide-title">Update Oven Pricing :</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="hpOvenPricing"
                                label="HP Oven"
                                type="number"
                                //@ts-ignore
                                value={pricing.hpOvenPricing}
                                name="hpOvenPricing"
                                variant="outlined"
                                onChange={handleChangePricing}

                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="nonHpOvenPricing"
                                label="Non HP Oven"
                                type="number"
                                //@ts-ignore
                                value={pricing.nonHpOvenPricing}
                                name="nonHpOvenPricing"
                                variant="outlined"
                                onChange={handleChangePricing}

                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={updatePricing} color="primary">
                                update
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Container>

            <div>
                <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" style={{ backgroundColor: "#009688", color: '#FFF' }}> Update Connection : <span style={{ color: 'yellow' }}> {agent.agent}</span> </DialogTitle>

                    <DialogContent >

                        <DialogContentText style={{ backgroundColor: "#009688", color: "white" }}>
                            <div >
                                <Grid container spacing={3}>
                                    <Grid item xs={6} style={{ backgroundColor: "#009688", color: "white" }}>
                                        <List >
                                            <ListItem>
                                                Total Connection: {agent.totalConnection}
                                            </ListItem>
                                            <Divider />
                                            <ListItem>
                                                Load :{agent.load}
                                            </ListItem>
                                            <Divider />
                                            <ListItem>
                                                Regulator :{agent.regulator}
                                            </ListItem>
                                            <Divider />
                                            <ListItem>
                                                Pipe :{agent.pipe}
                                            </ListItem>
                                            <Divider />
                                            <ListItem>
                                                Light Paid :{agent.paidLight}
                                            </ListItem>
                                            <Divider />
                                        </List>
                                    </Grid>
                                    <Grid item xs={6} style={{ backgroundColor: "#009688", color: "white" }}>
                                        <List >
                                            <Divider />
                                            <ListItem>
                                                Light Paid :{agent.paidLight}
                                            </ListItem>
                                            <Divider />
                                            <ListItem>
                                                Non HP Oven  :{agent.nonHpOven}
                                            </ListItem>
                                            <Divider />
                                            <ListItem>
                                                HP Oven  :{agent.hpOven}
                                            </ListItem>
                                            <Divider />
                                            <ListItem>
                                                Total Amount Paid :{agent.paidAmount}
                                            </ListItem>
                                            <Divider />
                                            <ListItem>
                                                Remarks :{agent.remarks}
                                            </ListItem>
                                            <Divider />
                                        </List>
                                    </Grid>
                                </Grid>

                            </div>
                        </DialogContentText>
                        <Typography style={{ textAlign: "left", margin: "5px" }}>
                            Todays Delivery Update:
                        </Typography>

                        <div style={{ marginLeft: "3rem" }} >
                            {/* <TextField
                                autoFocus
                                margin="dense"
                                label="Total Connection"
                                type="Number"
                                value={connection.totalConnection}
                                name="totalConnection"
                                variant="outlined"
                                onChange={handleChange}
                                style={{ color: "white" }}
                            
                            /> */}
                            <TextField
                                autoFocus
                                margin="dense"
                                id="Load"
                                label="Load "
                                type="Number"
                                value={connection.load}
                                name="load"
                                variant="outlined"
                                onChange={handleChange}
                                size="medium"
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="regulator"
                                value={connection.regulator}
                                label="Regulator"
                                type="Number"
                                variant="outlined"
                                onChange={handleChange}
                                name="regulator"

                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="pipe"
                                label="Pipe "
                                type="Number"
                                variant="outlined"
                                value={connection.pipe}
                                onChange={handleChange}
                                name="pipe"

                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="paidLight"
                                label="Light Paid"
                                type="Number"
                                value={connection.paidLight}
                                variant="outlined"
                                onChange={handleChange}
                                name="paidLight"

                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="bplOven"
                                label="BPL Oven"
                                type="Number"
                                variant="outlined"
                                value={connection.bplOven}
                                onChange={handleChange}
                                name="bplOven"


                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="nonHpOven"
                                label="Non HP Oven"
                                type="Number"
                                variant="outlined"
                                value={connection.nonHpOven}
                                onChange={handleChange}
                                name="nonHpOven"

                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="hpOven"
                                label="HP Oven"
                                type="Number"
                                variant="outlined"
                                value={connection.hpOven}
                                onChange={handleChange}
                                name="hpOven"

                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="paidAmount"
                                label="Total Amount Paid"
                                type="Number"
                                variant="outlined"
                                value={connection.paidAmount}
                                onChange={handleChange}
                                name="paidAmount"
                            />
                            <Grid container>
                            <Grid item xs={4} sm={6} md={5}>
                            <FormControl className={classes.formControl} >
                                <InputLabel id="demo-simple-select-label" >Berner Type</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={handleChange}
                                style={{width:"180px"}}
                                >
                                <MenuItem value="GT 2B">GT 2B</MenuItem>
                                <MenuItem value="GT 3B">GT 3B</MenuItem>
                                <MenuItem value="GT 4B">GT 4B</MenuItem>
                                <MenuItem value="SINGLE B">SINGLE B</MenuItem>
                                <MenuItem value="EXTRA B">EXTRA ARB</MenuItem>
                                </Select>
                         
                            </FormControl>
                         
                            </Grid>
                            <Grid item xs={4} sm={12} md={6}>
                            <TextField
                                        autoFocus
                                        margin="dense"
                                        id="Quantity"
                                        label="Quantity"
                                        type="text"
                                        variant="outlined"
                                        onChange={handleChange}
                                        size="small"
                                        name="quantity"
                                    />
                            </Grid>
                            </Grid>
                          
                            <TextField
                                        autoFocus
                                        margin="dense"
                                        id="rate"
                                        label="Rate"
                                        type="text"
                                        variant="outlined"
                                        onChange={handleChange}
                                        size="small"
                                        name="rate"
                                    />
                                        <TextField
                                        autoFocus
                                        margin="dense"
                                        id="remarks"
                                        label="Remarks"
                                        type="text"
                                        variant="outlined"
                                        value={connection.remarks}
                                        onChange={handleChange}
                                        name="remarks"
                                    />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)} variant="contained" color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleUpdate} variant="contained" color="primary">
                            update
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                {loadingTable ?
                    <Container component="main" >
                        {loading ? <div style={{ paddingTop: "30px", justifyContent: "center", alignItems: "center", textAlign: "center", width: "100%" }}><p>Please...</p> <CircularProgress /> </div> :
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
            </div>
        </React.Fragment>
    );
}

export default ConnectionDashboard