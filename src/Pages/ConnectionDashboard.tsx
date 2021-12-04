import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
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
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
const useStyles = makeStyles({
    head: {
        backgroundColor: 'blue',
        color: 'white',
    },
    table: {
        minWidth: 550,
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
});



const ConnectionDashboard = () => {
    const classes = useStyles();
    const { showToast } = React.useContext(ToastContext);
    const [show, setShow] = React.useState(false)
    const [agentList, setAgetList] = React.useState([]);
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
        setAgent({ ...agent, [event.target.name]: event.target.value });
    }


    const handleUpdate = async () => {
        setOpen(false);
        try {
            const result = await axios.post(BASE_URL + "agent/connection/update", { data: agent },
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
        let { user_id } = decoded;
        if (user_id === "HHP_91c528fa-31f8-46ff-8c0f-d786cc7487ef") {
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


    const handleFind = async () => {
        try {
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
        }
        catch (error) {
            if (error) {
                //@ts-ignore
                showToast(error.response.data.message, "error")
            }
        }
    }


    const handleChangeAgent = (event: any) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }


    async function getCharacters() {
        const result = await axios.get(BASE_URL + "agent/getall", {
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
        { title: "TOTAL CONNECTION ", field: "totalConnection" },
        { title: "LOAD", field: "load" },
        { title: "REGULATOR ", field: "regulator" },
        { title: "PIPE", field: "pipe" },
        { title: "PAID LIGHT", field: "paidLight" },
        { title: "TOATL LIGHT ", field: "totalLight" },
        { title: "BPL OVEN", field: "bplOven" },
        { title: "NON HP OVEN", field: "nonHpOven" },
        { title: "HP OVEN", field: "hpOven" },
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
                        </Select>
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

                    <Grid container spacing={3} style={{ marginTop: "2rem" }}>
                        <Grid item xs={4}>
                            <Card style={{ backgroundColor: "#e91e63", color: "white", height: "11rem" }}>
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
                            </Card>                        </Grid>
                        {/* <Grid item xs={4}>
                        <Card  style={{backgroundColor:"primary", color:"white", height:"11rem" }}>
                            <CardContent>
                                <Typography gutterBottom>
                                    Today's sales 
                                </Typography>
                                <Typography variant="h6" component="h2">
                                 REGULATOR:   451
                                </Typography>
                                <Typography variant="h6" component="h2">
                                 PIPE 890
                                </Typography>
                            </CardContent>
                            <CardActions>
                            <Button size="small" ></Button>
                            </CardActions>
                        </Card>
                        </Grid> */}
                        {/* <Grid item xs={4}>
                        <Card  style={{backgroundColor:"#e91e63", color:"white" , height:"11rem"}}>
                            <CardContent>
                                <Typography gutterBottom>
                                Today's sales 
                                </Typography>
                                <Typography variant="h6" component="h2">
                                                                        REGULATOR:   451
                                </Typography>
                                <Typography variant="h6" component="h2">
                                                                        PIPE 890
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" ></Button>
                            </CardActions>
                        </Card>
                        </Grid> */}

                    </Grid>


                </Grid>
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
            {show ?
                <Container style={{ color: "#FFFFFF", marginTop: "6rem", justifyContent: "center", alignContent: "center", textAlign: "center", marginLeft: "250px" }}>
                    <Grid style={{ width: "100%" }}>
                        <TableContainer component={Paper} style={{ width: "97rem", overflowX: "unset" }} >
                            <Table className={classes.table} aria-label="simple table" >
                                <TableHead style={{ backgroundColor: "#3F51B5", color: "#FFFFFF" }}>
                                    <TableRow >
                                        <TableCell align="left" style={{ color: "white" }}>AGENT NAME</TableCell>
                                        <TableCell style={{ color: "white" }}
                                            align="left">TOTAL CONNECTION</TableCell>
                                        <TableCell style={{ color: "white" }}
                                            align="left">CONNECTION DUE</TableCell>
                                        <TableCell style={{ color: "white" }}>LOAD</TableCell>
                                        <TableCell style={{ color: "white" }}>REGULATOR DUE</TableCell>
                                        <TableCell style={{ color: "white" }}>PIPE DUE</TableCell>
                                        <TableCell style={{ color: "white" }}>LIGHT PAID</TableCell>
                                        <TableCell style={{ color: "white" }}>LIGHT DUE</TableCell>
                                        <TableCell style={{ color: "white" }}>BPL OVEN</TableCell>
                                        <TableCell style={{ color: "white" }}>OVEN NON HP</TableCell>
                                        <TableCell style={{ color: "white" }}>HP OVEN</TableCell>
                                        <TableCell style={{ color: "white" }}>OVEN DUE</TableCell>
                                        <TableCell style={{ color: "white" }}>TOTAL AMOUNT </TableCell>
                                        <TableCell style={{ color: "white" }}>TOTAL AMOUNT PAID</TableCell>
                                        <TableCell style={{ color: "white" }}>TOTAL AMOUNT DUE</TableCell>
                                        <TableCell style={{ color: "white" }}>REMARKS</TableCell>
                                        <TableCell style={{ color: "white" }}>ACTION</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow >
                                        <TableCell align="left">
                                            {/* @ts-ignore */}
                                            {agent.agent}
                                        </TableCell>
                                        {/* @ts-ignore */}
                                        <TableCell align="left" id="totalConnection">{agent.totalConnection}</TableCell>
                                        {/* @ts-ignore */}
                                        <TableCell style={{ backgroundColor: "#bdbdbd" }} align="left" id="dueConnection">{agent.totalConnection - agent.load}</TableCell>
                                        {/* @ts-ignore */}
                                        <TableCell align="left" id="load">{agent.load}</TableCell>
                                        {/* @ts-ignore */}
                                        <TableCell align="left" id="regulator"> {agent.regulator}
                                        </TableCell>
                                        {/* @ts-ignore */}
                                        <TableCell align="left" id="pipe">{agent.pipe}
                                        </TableCell>
                                        {/* @ts-ignore */}
                                        <TableCell align="left" id="paidLight"> {agent.paidLight}
                                        </TableCell>
                                        {/* @ts-ignore */}
                                        <TableCell style={{ backgroundColor: "#bdbdbd" }} align="left" id="totalLight"> {agent.totalLight}
                                        </TableCell>
                                        {/* @ts-ignore */}
                                        <TableCell align="left" id="bplOven"> {agent.bplOven}
                                        </TableCell>
                                        {/* @ts-ignore */}
                                        <TableCell align="left" id="nonHpOven"> {agent.nonHpOven}
                                        </TableCell>
                                        {/* @ts-ignore */}
                                        <TableCell align="left" id="hpOven"> {agent.hpOven}
                                        </TableCell>

                                        {/* @ts-ignore */}
                                        <TableCell align="right" id="ovendue" style={{ backgroundColor: "#bdbdbd" }}> {agent.load - agent.hpOven - agent.nonHpOven - agent.bplOven}
                                            <Divider orientation="vertical" />
                                        </TableCell>
                                        {/* @ts-ignore */}
                                        <TableCell align="right" id="totalAmount" style={{ backgroundColor: "#bdbdbd" }}>{agent.nonHpOven * pricing.nonHpOvenPricing + agent.hpOven * pricing.hpOvenPricing}
                                        </TableCell>
                                        {/* @ts-ignore */}
                                        <TableCell align="right" id="amountPaid"> {agent.paidAmount}
                                        </TableCell>
                                        {/* @ts-ignore */}
                                        <TableCell align="right" id="amountDue" style={{ backgroundColor: "#bdbdbd" }}> {agent.nonHpOven * pricing.nonHpOvenPricing + agent.hpOven * pricing.hpOvenPricing - agent.paidAmount}
                                        </TableCell>
                                        {/* @ts-ignore */}
                                        <TableCell align="right"> {agent.remarks}
                                        </TableCell>
                                        <TableCell align="right" style={{ color: "red" }}>
                                            {getUser() ?
                                                <IconButton aria-label="delete" size="medium" onClick={() => setOpen(true)}>
                                                    <CreateIcon />
                                                </IconButton> : "No option"}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Container> : null}

            <div>

                <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">                        Update Connection :</DialogTitle>

                    <DialogContent >

                        <DialogContentText style={{ backgroundColor: "#E91E63", color: "white" }}>
                            <div >

                                <Grid container spacing={3}>


                                    <Grid item xs={6} style={{ backgroundColor: "#E91E63", color: "white" }}>

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
                                    <Grid item xs={6} style={{ backgroundColor: "#E91E63", color: "white" }}>
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
                        <Typography style={{ textAlign: "left" }}>
                            Updated here:
                        </Typography>

                        <div  >

                            <TextField
                                autoFocus
                                margin="dense"
                                label="Total Connection"
                                type="number"
                                value={agent.totalConnection}
                                name="totalConnection"
                                variant="outlined"
                                onChange={handleChange}
                                style={{ color: "white" }}
                                InputLabelProps={{ style: { fontSize: 20, color: "white" } }} // font size of input label

                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Load "
                                type="number"
                                value={agent.load}
                                name="load"
                                variant="outlined"
                                onChange={handleChange}
                                InputLabelProps={{ style: { fontSize: 20, color: "white" } }} // font size of input label

                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="regulator"
                                value={agent.regulator}
                                label="Regulator"
                                type="number"
                                variant="outlined"
                                onChange={handleChange}
                                name="regulator"
                                InputLabelProps={{ style: { fontSize: 20, color: "white" } }} // font size of input label

                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="pipe"
                                label="Pipe "
                                type="number"
                                variant="outlined"
                                value={agent.pipe}
                                onChange={handleChange}
                                name="pipe"
                                InputLabelProps={{ style: { fontSize: 20, color: "white" } }} // font size of input label

                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="paidLight"
                                label="Light Paid"
                                type="number"
                                value={agent.paidLight}
                                variant="outlined"
                                onChange={handleChange}
                                name="paidLight"
                                InputLabelProps={{ style: { fontSize: 20, color: "white" } }} // font size of input label

                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="bplOven"
                                label="BPL Oven"
                                type="number"
                                variant="outlined"
                                value={agent.bplOven}
                                onChange={handleChange}
                                name="bplOven"
                                InputLabelProps={{ style: { fontSize: 20, color: "white" } }} // font size of input label

                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="nonHpOven"
                                label="Non HP Oven"
                                type="number"
                                variant="outlined"
                                value={agent.nonHpOven}
                                onChange={handleChange}
                                name="nonHpOven"
                                InputLabelProps={{ style: { fontSize: 20, color: "white" } }} // font size of input label

                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="hpOven"
                                label="HP Oven"
                                type="number"
                                variant="outlined"
                                value={agent.hpOven}
                                onChange={handleChange}
                                name="hpOven"
                                InputLabelProps={{ style: { fontSize: 20, color: "white" } }} // font size of input label

                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="paidAmount"
                                label="Total Amount Paid"
                                type="number"
                                variant="outlined"
                                value={agent.paidAmount}
                                onChange={handleChange}
                                name="paidAmount"
                                InputLabelProps={{ style: { fontSize: 20, color: "white" } }} // font size of input label

                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="remarks"
                                label="Remarks"
                                type="text"
                                variant="outlined"
                                value={agent.remarks}
                                onChange={handleChange}
                                name="remarks"
                                InputLabelProps={{ style: { fontSize: 20, color: "white" } }} // font size of input label

                            />

                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)} variant="outlined" color="secondary">
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