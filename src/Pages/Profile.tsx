import React, { useState } from "react";
import { Box, Grid, Container, Button, makeStyles, CssBaseline, Typography, TextField } from '@material-ui/core';
import { ToastContext } from "../Common/ToastProvider";
import axios from "axios";
import { useHistory } from "react-router"
import { BASE_URL } from "../Common/constant";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { getToken, getUserId } from "../Common/helper";

const useStyles = makeStyles((theme: any) => ({
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
        document.title = " Jaman HP Gas | Profile  "
        fetchUser()

    }, []);

    const [user, setUser] = useState({
        "user_id": getUserId(),
        name: "",
        city: "",
        dob: "",
        old_password: "",
        new_password: "",
        email: "",
        mobile: ""
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
        setUser({ ...user, [event.target.name]: event.target.value });
    };
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);

    React.useEffect(() => {
        if (selectedImage) {
            //@ts-ignore
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);



    const fetchUser = async () => {
        try {
            const result = await axios.post(BASE_URL + "user/find",
                {
                    "user_id": getUserId()
                },
                {
                    headers: {
                        encryption: false,
                        token: getToken()
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
            //@ts-ignore
            if (error.response && error.response.status === 401) {
                history.push("/signin");
            }
            //@ts-ignore
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
                    "mobile": user.mobile
                },
                {
                    headers: {
                        encryption: false,
                        token: getToken()
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
                    "user_id": getUserId(),
                    "old_password": data.old_password,
                    "new_password": data.new_password
                },
                {
                    headers: {
                        encryption: false,
                        token: getToken()
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
        formData.append("user_id", getUserId())
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
                        token: getToken()
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
            <Container component="main" maxWidth="xs" className={classes.paper} >
                <CssBaseline />
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
                    {profile?.preview && (
                        <div>
                            <Box mt={2} textAlign="center">
                                <div>Profile Preview:</div>
                                <img src={profile?.preview} alt="profile" height="100" />
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