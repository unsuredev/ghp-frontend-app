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
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { BASE_URL } from "../Common/constant";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import moment from "moment";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'




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
    input: {
        display: 'none',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    }
}));

const Profile = () => {
    const classes = useStyles();
    const { showToast } = React.useContext(ToastContext);
    let history = useHistory()
    const [profile, setProfile] = React.useState({ preview: "", raw: "" });
    const [error, setError] = React.useState("")

    React.useEffect(() => {
        document.title = "Jaman HP GAS | Profile  "
        fetchUser()

    }, []);

    const findUserId = () => {
        let token: any = localStorage.getItem("access_token");
        var decoded = jwt_decode(token);
        //@ts-ignore
        let { user_id } = decoded;
        return user_id
    }

    const [user, setUser] = useState({
        "user_id": findUserId(),
        name: "",
        city: "",
        dob: "",
        old_password: "",
        new_password: "",
        email: "",
        mobile:""
    });

    const [data, setData] = useState({
        old_password: "",
        new_password: "",
        confrim_password: "",

    });


    const handlePassword = (event: any) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleChange = (event: any) => {
        console.log("dob", event.target.value)
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const [dob, setDob] = React.useState(new Date(moment().startOf('month').format('YYYY-MM-DD')));



    const [selectedImage, setSelectedImage] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);

    React.useEffect(() => {
        if (selectedImage) {
            //@ts-ignore
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);





    const getToken = () => {
        //@ts-ignore
        return localStorage.getItem("access_token")
    }



    const fetchUser = async () => {
        try {
            const result = await axios.post(BASE_URL + "user/find",
                {
                    "user_id": findUserId()
                },
                {
                    headers: {
                        encryption: false,
                        access_token: getToken()
                    }
                })
            if (result.data && result.data != null) {
                setUser(result.data.data)
            }
            else {
                showToast(result.data.message, "error");
            }
        } catch (error) {
            console.log(error)
            showToast("unable to find user!", "error");
        }
    };

    const HandleUpdate = async () => {
        try {
            const result = await axios.post(BASE_URL + "user/update",
                {
                    "email": user.email,
                    "dob": user.dob,
                    "city": user.city,
                    "mobile":user.mobile
                },
                {
                    headers: {
                        encryption: false,
                        access_token: getToken()
                    }
                })
            if (result.data && result.data != null) {
                showToast("Profile updated successfully!", "success");
            }
            else {
                showToast(result.data.message, "error");
            }
        } catch (error) {
            console.log(error)
            showToast("Profile couldn't update", "error");

        }
    };


    const updatePassword = async () => {
        try {
            if (data.new_password != data.confrim_password) {
                return showToast("New password and confirm password didn't matched!", "error");
            }
            const result = await axios.post(BASE_URL + "user/changepassword",
                {
                    "user_id": findUserId(),
                    "old_password": data.old_password,
                    "new_password": data.new_password
                },
                {
                    headers: {
                        encryption: false,
                        access_token: getToken()
                    }
                })
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




    const UploadPhoto = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", profile.raw);
        formData.append("user_id", findUserId())
        await fetch(BASE_URL + "user/uploadprofilephoto",
            {
                method: 'POST',
                body: formData
            },
        )
            .then(response => response.json())
            .then(data =>
                showToast(data.message, "success"),
                //@ts-ignore
                setProfile({ preview: "", raw: "" })
            )
            .catch((error) => {
                showToast(error.message, "error")
            })
    }



    const HandlePhoto = (e: any) => {
        if (e.target.files.length) {
            setProfile({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
            setError("")

        }
        const file = e.target.files[0];
        if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
            window.alert("File does not support. You must use .png or .jpg ");
            setError('Select a valid image type')
        }
        if (file.size > 1000089) {
            window.alert("Please upload a file smaller than 1 MB ");
            setProfile({
                preview: "",
                raw: ""
            });
            setError('Select a valid image size')
        }
    };



    const handleLogout = async () => {
        try {
            const result = await axios.post(BASE_URL + "user/logout",
                {},
                {
                    headers: {
                        encryption: false,
                        access_token: getToken()
                    }
                })
            if (result.data && result.data != null) {
                showToast(result.data.message, "success");
                localStorage.clear();
                history.push("/");
            }
            else {
                showToast(result.data.message, "error");
            }
        } catch (error) {
            console.log(error)
            showToast("Something went wrong!", "error");
        }
    };



    return (
        <React.Fragment>
            <br></br>
            <br></br>
            <br></br>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <ResponsiveDrawer />
                {/* <Typography component="h1" variant="h5" style={{ textAlign: "center" }}>
                    Your Profile
                </Typography> */}
                <Grid>
                    <input accept="image/*"
                        onChange={HandlePhoto}
                        style={{ display: 'none' }}
                        className={classes.input} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">Select Profile Photo
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                    {profile.preview && (
                        <div>
                            <Box mt={2} textAlign="center">
                                <div>Profile Preview:</div>
                                {/* @ts-ignore */}
                                <img src={profile.preview} alt="profile" height="100" />
                            </Box>
                            <Button variant="outlined" size="small" color="primary" onClick={UploadPhoto} >
                                upload
                            </Button>
                        </div>
                    )}
                </Grid>
                <form className={classes.form} noValidate style={{ marginTop: "2rem" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <Typography>Name:  <span style={{ color: "#303F9F" }}>{user.name}</span>  </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                size="small"
                                value={user.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="mobile"
                                label="Mobile Number"
                                name="mobile"
                                autoComplete="mobile"
                                size="small"
                                value={user.mobile}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <form className={classes.container} noValidate>
                                <TextField
                                    id="date"
                                    label="Date of Birth"
                                    type="date"
                                    name="dob"
                                    defaultValue={user.dob}
                                    className={classes.textField}
                                    value={user.dob}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={12}  >
                            <TextField
                                margin="normal"
                                required
                                id="city"
                                label="Village Name"
                                name="city"
                                autoComplete="city"
                                autoFocus
                                value={user.city}
                                onChange={handleChange}
                                size="small"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={HandleUpdate}
                        size="small"
                    >
                        SAVE & UPDATE
                    </Button>
                </form>
            </Container>

            <Container component="main" maxWidth="xs">
                <Grid container>
                    <Grid item xs={12}  >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="old_password"
                            label="Old Pasword"
                            name="old_password"
                            autoComplete="old_password"
                            autoFocus
                            value={data.old_password}
                            onChange={handlePassword}
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="new_password"
                            label="New Password"
                            type="password"
                            id="new_password"
                            autoComplete="current-password"
                            value={data.new_password}
                            onChange={handlePassword}
                            size="small"
                        />
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="confrim_password"
                                label="Confirm Password"
                                type="password"
                                id="new_password"
                                autoComplete="current-password"
                                value={data.confrim_password}
                                onChange={handlePassword}
                                size="small"
                            />
                        </Grid>

                    </Grid>
                </Grid>
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={updatePassword}
                    size="small"

                >
                    UPDATE PASSWORD
                </Button>

            </Container>


        </React.Fragment >
    );
}

export default Profile