import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ToastContext } from "../Common/ToastProvider";
import Container from "@material-ui/core/Container";
import axios from "axios";
import moment from "moment";
import Avatar from '@material-ui/core/Avatar';
import { Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Grid } from '@material-ui/core';

import { BASE_URL } from "../Common/constant";
import { getToken } from '../Common/helper';

const useStyles = makeStyles((theme: any) => ({
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
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
}));



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

    const handleUsersList = async () => {
        try {
            const result = await axios.get(BASE_URL + "user/getall", {
                headers: {
                    encryption: false,
                    token: getToken()
                }
            })
            setList(result.data.data)
        } catch (error) {
            showToast("Something went wrong!", "error")
        }
    };


    return (
        <React.Fragment>
            <Container >
                <Grid container>
                    <Grid item spacing={1} style={{ marginTop: "4rem" }}>
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
                                                <Avatar alt={user.name} src={user.profile_url} className={classes.large} />
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {/* @ts-ignore */}
                                                {user.name}
                                            </TableCell>
                                            {/* @ts-ignore */}
                                            <TableCell align="left">{user.email ? user.email : user.mobile}</TableCell>
                                            {/* @ts-ignore */}
                                            <TableCell align="left">{user.is_online ?
                                                <p style={{ color: "green" }}>Yes</p>
                                                : <p style={{ color: "red" }}>No</p>
                                            }</TableCell>
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
