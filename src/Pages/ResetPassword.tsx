import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ToastContext } from "../Common/ToastProvider";
import axios from "axios";
import { useHistory } from "react-router"
import jwt_decode from "jwt-decode";
import ResponsiveDrawer from "./Drawer";







const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const ResetPassword = () => {
    const classes = useStyles();
    const { showToast } = React.useContext(ToastContext);
    let history = useHistory()


    const [user, setUser] = useState({
        old_password: "",
        new_password: "",
        email:""
    });
    const handleChange = (event: any) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const result = await handleReset()
    }

    React.useEffect(() => {
        document.title = "JAMAN HP GAS | Change Password "

    }, []);

    const findEmail=() => {
        let token: any = localStorage.getItem("access_token");
        var decoded = jwt_decode(token);
        //@ts-ignore
        let { email } = decoded;
        return email
      }


    const Headers = {
        'Content-Type': 'application/json',
        "encryption": false,
    }


    const handleReset = async () => {
        try {
            const result = await axios.post("https://jamanenterprise.herokuapp.com/user/changepassword",
            {
                "old_password":user.old_password,
                "password":user.new_password,
                "email":findEmail()
            } ,
             { headers: Headers })
            if (result.data && result.data != null) {
                showToast(result.data.message, "success");
                handleLogout()
            }
            else {
                showToast(result.data.message, "error");
            }
        } catch (error) {
            console.log(error)
            showToast("Invalid password!", "error");

        }
    };

    const handleLogout = () => {
        localStorage.clear();
        history.push("/");
    };

    return (
        <React.Fragment>
            <br></br>
            <br></br>
            <br></br>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <ResponsiveDrawer />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Change Your Password
                </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="old_password"
                            label="Old Pasword"
                            name="old_password"
                            autoComplete="old_password"
                            autoFocus
                            value={user.old_password}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="new_password"
                            label="New Password"
                            type="password"
                            id="new_password"
                            autoComplete="current-password"
                            value={user.new_password}
                            onChange={handleChange}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSubmit}
                        >
                            Change it
                    </Button>
                    </form>
                </div>
            </Container>
        </React.Fragment>
    );
}

export default ResetPassword