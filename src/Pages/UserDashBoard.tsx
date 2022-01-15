import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Copyright from "../Components/Copyright";
import { httpClient } from "../Common/Service";
import { Theme, withStyles, createStyles } from '@material-ui/core/styles';
import { ToastContext } from "../Common/ToastProvider";
import { Link as RouterLink, useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ResponsiveDrawer from "./Drawer";
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from "axios";
import moment from "moment";
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { BASE_URL } from "../Common/constant";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    table: {
        minWidth: 650,
    },
}));


const StyledBadge = withStyles((theme: Theme) =>
    createStyles({
        badge: {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: '$ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
        largeSize: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
    }),
)(Badge);

const UserDashBoard = () => {
    const classes = useStyles();
    const { showToast } = React.useContext(ToastContext);
    const [list, setList] = React.useState([])
    const [show, setShow] = React.useState(false)

    const [user, setUser] = React.useState({
        name: "",
        email: "",
        password: "",
    });


    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });

    const handleSwitch = (event: any) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const handleChange = (event: any) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };


    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const result = await axios.post(BASE_URL + "user/add", {
                "email": user.email,
                "login_type": "email",
                "name": user.name,
                "password": user.password
            }, {
                headers: {
                    encryption: false,
                }
            })
            if (result.data && result.data != null) {
                showToast("Registered susccesssfully", "success");

            }

        } catch (error) {
            console.log("error", error)
            //@ts-ignore
            showToast(error.response.data.message, "error")
        }
    }


    React.useEffect(() => {
        handleUsersList()
    }, [])


    const toggleChecked = async (email: any) => {
        try {
            const result = await axios.post(BASE_URL + "user/block", { "email": email }, {
                headers: {
                    encryption: false,
                    access_token: getToken()
                }
            })
            if (result.data && result.data != null) {
                showToast(result.data.message, "success");
                window.location.reload();

            }
        } catch (error) {
            //@ts-ignore
            showToast(error.response.data.message, "error")
        }
    };


    const getToken = () => {
        //@ts-ignore
        return localStorage.getItem("access_token")
    }

    const handleUsersList = async () => {
        try {
            const result = await axios.get(BASE_URL + "user/getall", {
                headers: {
                    encryption: false,
                    access_token: getToken()
                }
            })
            setList(result.data.data.users)
        } catch (error) {
            //@ts-ignore
            showToast(error.response.data.message, "error")
        }
    };


    return (
        <React.Fragment>
            <ResponsiveDrawer />
            <Container component="main" maxWidth="md">
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} style={{ margin: "auto", justifyContent: "center", textAlign: "center" }}>
                        <Typography component="h1" variant="h5">
                            User Activity Management
                        </Typography>
                        <h4></h4>
                    </Grid>
                </Grid>
                <br></br>
            </Container>
            <Container component="main" >
                <Grid container  >
                    <Grid item xs={12} sm={12} md={12} >
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Sl No</TableCell>
                                        <TableCell>Profile</TableCell>
                                        <TableCell >Name </TableCell>
                                        <TableCell >Email </TableCell>
                                        <TableCell >Online </TableCell>
                                        <TableCell >Staus </TableCell>
                                        <TableCell >Attendance  </TableCell>
                                        <TableCell >Last login Time  </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {list.map((user, i) => (
                                        //@ts-ignore
                                        <TableRow key={user.name}>
                                            <TableCell align="left">{i + 1}</TableCell>
                                            <TableCell>
                                                {/* @ts-ignore */}
                                                <Avatar alt={user.name} src={user.profile_url} />
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {/* @ts-ignore */}
                                                {user.name}
                                            </TableCell>
                                            {/* @ts-ignore */}
                                            <TableCell align="left">{user.email}</TableCell>
                                            {/* @ts-ignore */}
                                            <TableCell align="left">{user.is_online ? "YES" : "NO"}</TableCell>
                                            {/* @ts-ignore */}
                                            <TableCell align="left">{user.status}</TableCell>
                                            {/* @ts-ignore */}
                                            <TableCell align="left">{user.status}</TableCell>
                                            {/* @ts-ignore */}
                                            <TableCell align="left">{moment(user.last_login_timestamp).format('lll')}</TableCell>
                                            {/* <TableCell >
                                                <FormControlLabel
                                                    //@ts-ignore
                                                    control={<Switch checked={user.active} onChange={() => toggleChecked(user.email)} />}
                                                    label="Normal"
                                                />
                                            </TableCell> */}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
};

export default UserDashBoard;
