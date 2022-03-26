import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Link as RouterLink, useHistory } from "react-router-dom";

import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from "axios";
import { BASE_URL } from "../Common/constant";
import { ToastContext } from "../Common/ToastProvider";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/1600x900/?nature)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    input: {
        color: "black"
    }
}));

export default function SignInSide() {
    const classes = useStyles();
    let history = useHistory();

  
    
    const [value, setValue] = React.useState('email');
    const { showToast } = React.useContext(ToastContext);
    const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    }
    const [passwordShown, setPasswordShown] = React.useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    let icon: any;
    if (passwordShown == true) {
        icon = <VisibilityIcon onClick={togglePasswordVisiblity} />;
    } else if (passwordShown == false) {
        icon = <VisibilityOffIcon onClick={togglePasswordVisiblity} />;
    }


    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    mobile: ''
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(150).optional(),
                    password: Yup.string().max(55).required('Password is required'),
                    mobile: Yup.string().optional()

                })}
                onSubmit={async (values: any) => {
                    try {
                        const result = await axios.post(BASE_URL + "user/login", {
                            "login_type": value,
                            "email": values.email.toLowerCase(),
                            "password": values.password,
                            "mobile":values.mobile
                        }, {
                            headers: {
                                encryption: false,
                                'Accept': 'application/json'
                            },
                        });
                        if (result.data.status === "success") {
                            console.log("data", result.data)
                            localStorage.setItem("access_token", result.data.data.access_token)
                            showToast("Loggedin susccesssfully", "success")
                            history.push('/home')
                        }
                    }
                    catch (error) {
                        //@ts-ignore
                        if (error.response.data.message == "Unable to Login user") {
                            //@ts-ignore
                            showToast(error.response.data.errorMessage, "error")
                        }
                        else {
                            //@ts-ignore
                            showToast(error.response.data.message, "error")
                            console.log(error)
                        }
                    }
                }}
            >
                {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    values
                }) => (
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <form onSubmit={handleSubmit}>
                            <div className={classes.paper}>
                                <Typography component="h1" variant="h4"
                                >
                                    JAMAN ENTERPRISE
                                </Typography>
                                <p>Code: 190322037887 </p>
                                <img src={require("../hp_logo.jpeg").default}  width="170px" height="150px"
                                    alt="hpgas logo" />
                                <br></br>
                                <br></br>
                                <FormControl component="fieldset" >
                                    <FormLabel component="legend">Choose Account Type</FormLabel>
                                    <RadioGroup aria-label="gender" name="gender1" style={{ display: "inline" }} value={value}
                                    onChange={handleChangeRadio}
                                    >
                                        <FormControlLabel value="email" control={<Radio />} label="Employee" />
                                        <FormControlLabel value="mobile" control={<Radio />} label="Agent" />
                                    </RadioGroup>
                                </FormControl>
                                {value != "mobile" && (
                                    <TextField
                                        error={Boolean(touched.email && errors.email)}
                                        fullWidth
                                        helperText={touched.email && errors.email}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="email"
                                        value={values.email}
                                        autoComplete="email"
                                        autoFocus
                                        InputProps={{
                                            className: classes.input
                                        }}
                                    />)}
                                {value === "mobile" && (
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        error={Boolean(touched.mobile && errors.mobile)}
                                        fullWidth
                                        helperText={touched.mobile && errors.mobile}
                                        onChange={handleChange}
                                        id="mobile"
                                        label="Mobile Number"
                                        name="mobile"
                                        autoFocus
                                        type="number"
                                        value={values.mobile}
                                    />)}
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    error={Boolean(touched.password && errors.password)}
                                    fullWidth
                                    helperText={touched.password && errors.password}
                                    name="password"
                                    label="Password"
                                    id="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    type={passwordShown ? "text" : "password"}
                                    InputProps={{
                                        endAdornment: icon,
                                        className: classes.input
                                    }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                >
                                    Sign In
                                </Button>
                            </div>
                        </form>
                    </Grid>

                )}
            </Formik>
        </Grid>
    );
}
