import React from 'react';
import { Button, Typography, CardHeader, Tabs, Tab, CardContent, Card, Grid, makeStyles, Container, CssBaseline, TextField, FormControl } from "@material-ui/core";
import ResponsiveDrawer from "../Components/Drawer";
import FooterSection from "../Components/Footer";
import { httpClient } from "../Common/Service";
import { ToastContext } from "../Common/ToastProvider";
import { BASE_URL } from "../Common/constant";
import jwt_decode from "jwt-decode";
import moment from "moment";
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
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
    button: {
        margin: theme.spacing(1),
    },
}));


export default function ImageManagement() {
    const { showToast } = React.useContext(ToastContext);

    const classes = useStyles();
    const [users, setUsers] = React.useState<any[]>([]);
    const [state, setState] = React.useState({
        aadhaar: "",
    });
    const [customer, setCustomer] = React.useState({
        mainAadhaar: ""
    });
    const [install, setInstall] = React.useState({ preview: "", raw: "" });
    const [satis, setSatis] = React.useState({ preview: "", raw: "" });
    const [other, setOther] = React.useState({ preview: "", raw: "" });
    const [errorI, setErrorI] = React.useState("")
    const [errorS, setErrorS] = React.useState("")
    const [errorO, setErrorO] = React.useState("")

    const [installb, setInstallb] = React.useState(false)
    const [satisb, setSatisb] = React.useState(false)
    const [otherb, setOtherb] = React.useState(false)
    const [value, setValue] = React.useState(0);

    const handleChangevalue = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };


    const handleFind = async (event: any) => {
        try {
            event.preventDefault();
            if (value === 0) {
                if (state.aadhaar) {
                    const result = await httpClient("customer/find", "POST", {
                        mainAadhaar: state.aadhaar,
                    });
                    if (!result.data && result.data === undefined)
                        return showToast("No result found", "error");
                    setUsers([result.data]);
                    setCustomer(result.data);
                }
            }
            if (value === 1) {
                if (state.aadhaar) {
                    const result = await httpClient("old/customer/findone", "POST", {
                        mainAadhaar: state.aadhaar,
                    });
                    if (!result.data && result.data === undefined) { return showToast("No result found", "error") }
                    setUsers([result.data]);
                    setCustomer(result.data);
                }
            }

        } catch (error) {
            showToast("Something went wrong", "error");
        }
    };




    const handleChange = (event: any) => {
        setState({ ...state, [event.target.name]: event.target.value });
    };



    const handleChangeInstall = (e: any) => {
        if (e.target.files.length) {
            setInstall({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
            setErrorI("")
            setInstallb(true)

        }
        const file = e.target.files[0];
        const maxSizeInBytes = 500 * 1024; // 500 KB

        if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
            window.alert("File does not support. You must use .png or .jpg ");
            setErrorI('Select a valid image type')
        }
        if (file.size > maxSizeInBytes) {
            window.alert("Please upload a file smaller than 1 MB ");
            setInstall({
                preview: "",
                raw: ""
            });
            setErrorI('Select a valid image size')
        }
    };




    const installRemoveImage = (e: any) => {
        e.preventDefault();
        e.target.value = null;
        setInstall({
            preview: "",
            raw: ""
        });
    };

    const satisRemoveImage = (e: any) => {
        e.preventDefault();
        e.target.value = null;
        setSatis({
            preview: "",
            raw: ""
        });
    };

    const otherRemoveImage = (e: any) => {
        e.preventDefault();
        e.target.value = null;
        setOther({
            preview: "",
            raw: ""
        });
    };


    const handleChangeSatis = (e: any) => {
        if (e.target.files.length) {
            setSatis({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            })
            setSatisb(true)
        }
        const file = e.target.files[0];
        if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
            window.alert("File does not support. You must use .png or .jpg ");
            setErrorS('Select a valid image type')
        }
        if (file.size > 1000089) {
            window.alert("Please upload a file smaller than 1 MB ");
            setSatis({
                preview: "",
                raw: ""
            });
            setErrorS('Select a valid image size')
        }
    };
    const handleChangeOther = (e: any) => {
        if (e.target.files.length) {
            setOther({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            })
            setOtherb(true)
        }
        const file = e.target.files[0];
        if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
            window.alert("File does not support. You must use .png or .jpg ");
            setErrorO('Select a valid image type')
        }
        if (file.size > 1000089) {
            window.alert("Please upload a file smaller than 1 MB ");
            setOther({
                preview: "",
                raw: ""
            });
            setErrorO('Select a valid image size')
        }
    };




    const installUpload = async (e: any, mainAadhaar: string) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", install.raw);
        formData.append("mainAadhaar", mainAadhaar)
        formData.append("photo_key", "InstalationLetter");
        if (value === 0) {
            fetch(BASE_URL + "customer/uploadimages", {
                method: "POST",
                body: formData
            })
                .then(response => response.json())
                .then(data =>
                    showToast(data.message, "success"),
                    //@ts-ignore
                    setInstall({ preview: "", raw: "" })
                )
                .catch((error) => {
                    showToast(error.message, "error")
                });
        }

        if (value === 1) {
            fetch(BASE_URL + "old/customer/uploadimages", {
                method: "POST",
                body: formData
            })
                .then(response => response.json())
                .then(data =>
                    showToast(data.message, "success"),
                    //@ts-ignore
                    setInstall({ preview: "", raw: "" })
                )
                .catch((error) => {
                    showToast(error.message, "error")
                });
        }
    }




    const othereUpload = async (e: any, mainAadhaar: string) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", other.raw);
        formData.append("mainAadhaar", mainAadhaar)
        formData.append("photo_key", "otherLetter");
        if (value === 0) {
            await fetch(BASE_URL + "customer/uploadimages",
                {
                    method: "POST",
                    body: formData
                })
                .then(response => response.json())
                .then(data =>
                    showToast(data.message, "success"),
                    //@ts-ignore
                    setOther({ preview: "", raw: "" })
                )
                .catch((error) => {
                    showToast(error.message, "error")
                })
        }
        if (value === 1) {
            await fetch(BASE_URL + "old/customer/uploadimages",
                {
                    method: "POST",
                    body: formData
                })
                .then(response => response.json())
                .then(data =>
                    showToast(data.message, "success"),
                    //@ts-ignore
                    setOther({ preview: "", raw: "" })
                )
                .catch((error) => {
                    showToast(error.message, "error")
                })
        }
    }



    const satisUpload = async (e: any, mainAadhaar: string) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", satis.raw);
        formData.append("mainAadhaar", mainAadhaar)
        formData.append("photo_key", "satisfactionLetter");
        if (value === 0) {
            await fetch(BASE_URL + "customer/uploadimages",
                {
                    method: "POST",
                    body: formData
                })
                .then(response => response.json())
                .then(data =>
                    showToast(data.message, "success"),
                    //@ts-ignore
                    setSatis({ preview: "", raw: "" })

                )
                .catch((error) => {
                    showToast(error.message, "error")
                })
        }
        if (value === 1) {
            await fetch(BASE_URL + "old/customer/uploadimages",
                {
                    method: "POST",
                    body: formData
                })
                .then(response => response.json())
                .then(data =>
                    showToast(data.message, "success"),
                    //@ts-ignore
                    setSatis({ preview: "", raw: "" })

                )
                .catch((error) => {
                    showToast(error.message, "error")
                })
        }
    }

    React.useEffect(() => {
        document.title = "Image upload | Jaman HP Gas";
    }, []);


    const findRole = () => {
        let token: any = localStorage.getItem("access_token");
        var decoded = jwt_decode(token);
        //@ts-ignore
        let { role } = decoded;
        if (role) {
            return role
        }
        else {
            return "NOT_ADMIN"
        }
    }



    return (
        <React.Fragment>
            <CssBaseline />

            <main>
                <div className={classes.heroContent} style={{ marginRight: "1rem" }}>
                    <Container maxWidth="sm">
                        <Grid item xs={12} sm={12} md={12}>
                            <Tabs
                                value={value}
                                onChange={handleChangevalue}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                            >
                                <Tab label="New Customer" icon={<FiberNewIcon color="primary" fontSize="large" />} />
                                <Tab label="Old Customer" icon={<NewReleasesIcon />} />
                            </Tabs>
                            <form className={classes.form} noValidate autoComplete="off">
                                <TextField
                                    id="outlined-basic"
                                    label="Main Aadhaar No"
                                    variant="outlined"
                                    fullWidth
                                    name="aadhaar"
                                    autoComplete="aadhaar"
                                    autoFocus
                                    value={state.aadhaar}
                                    onChange={handleChange}
                                    type="number"
                                />
                            </form>
                        </Grid>
                        <div className={classes.heroButtons}>
                            {/* @ts-ignore */}
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        color="primary"
                                        onClick={handleFind}
                                    >
                                        FIND &  UPLOAD CUSTOMER'S PHOTO
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
            </main>
            <div style={{ marginRight: "1rem" }}>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container  >
                        {users.map((user, i) => (
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                lg={6}
                                style={{
                                    justifyContent: "center",
                                    alignContent: "center",
                                    textAlign: "left",
                                }}
                            >
                                <Grid item style={{ marginTop: "-40PX" }}  >
                                    <Card className={classes.card} key={i} >
                                        <CardContent className={classes.cardContent} style={{ marginLeft: "2rem" }}>
                                            <Typography color="textSecondary" gutterBottom>
                                                Customer's Details
                                            </Typography>
                                            <CardHeader
                                                action={
                                                    <div style={{ margin: "0px", padding: "0px" }}>
                                                        {user.installtatus === "Complete" ?
                                                            <IconButton aria-label="settings">
                                                                <CheckCircleIcon style={{ color: "blue" }} />
                                                            </IconButton> : null}

                                                    </div>
                                                }
                                                //@ts-ignore agent card
                                                title={user.name.toUpperCase()}

                                            />

                                            <CardHeader style={{ textAlign: "center" }} />
                                            <div style={{ marginTop: "-40px" }}>
                                                {/* @ts-ignore */}
                                                <Typography>Name : {user.name.toUpperCase()}</Typography>
                                                {/* @ts-ignore */}
                                                <Typography>Main Aadhaar : {user.mainAadhaar}</Typography>
                                                {/* @ts-ignore */}
                                                <Typography>
                                                    Family Aadhaar : {user.familyAadhaar}
                                                </Typography>
                                                {/* @ts-ignore */}
                                                <Typography>Mobile No : {user.mobile}</Typography>
                                                {/* @ts-ignore */}
                                                <Typography>
                                                    Registration No : {user.regNo || "NA"}
                                                </Typography>
                                                <Typography>
                                                    Consumer No :{user.consumerNo || "NA"}
                                                </Typography>
                                                {/* @ts-ignore */}
                                                <Typography>Main Agent : {user.mainAgent.toUpperCase()}</Typography>
                                                {/* @ts-ignore */}
                                                <Typography>Sub Agent : {user.subAgent || "NA"}</Typography>
                                                <Typography>Registered Agency Name :<span style={{ color: "red" }}> {user.registeredAgencyName || "NA"}</span> </Typography>
                                                <Typography>Remarks : {user.remarks || "NA"}</Typography>
                                                {/* @ts-ignore */}
                                                <Typography>Created On : {moment(user.createdAt).format('LLL') || "NA"}</Typography>
                                                <Typography variant="subtitle2" gutterBottom color="primary">Added By : {user.addedBy || "NA"}</Typography>
                                            </div>
                                            {/* @ts-ignore */}
                                        </CardContent>
                                    </Card>
                                    <br></br>
                                    {user.consumerNo ? null :
                                        <Typography gutterBottom variant="h5" component="h2" color="primary">
                                            This Customer don't have any consumer Number
                                        </Typography>
                                    }

                                </Grid>
                                {user.installtatus && (
                                    <Container className={classes.cardGrid} maxWidth="md">
                                        <Grid container spacing={4} style={{ marginRight: "1rem" }}>
                                            {(() => {
                                                if (findRole() === "superadmin") {
                                                    return (
                                                        <div>                                                <Grid item xs={12}
                                                            md={12}>
                                                            <label htmlFor="upload-button1">
                                                                {install.preview ? (
                                                                    <img src={install.preview} alt="install" width="300" height="300" />
                                                                ) : null}
                                                            </label>
                                                            <Typography>Installation Letter Photo  :</Typography>
                                                            <input
                                                                type="file"
                                                                id="upload-button1"
                                                                // style={{ display: "none" }}
                                                                onChange={handleChangeInstall}
                                                                accept="image/*"
                                                            />
                                                            <br />

                                                            <span style={{ color: "red" }}>{errorI}</span>
                                                            <br />
                                                            <br />
                                                            {installb ?
                                                                <div>
                                                                    <Button
                                                                        size="medium"
                                                                        variant="contained"
                                                                        color="primary"
                                                                        style={{ backgroundColor: "#834bff" }}

                                                                        onClick={(e) => { installUpload(e, user.mainAadhaar) }}
                                                                    >
                                                                        Submit Installation Photo
                                                                    </Button>
                                                                    <Button
                                                                        size="medium"
                                                                        variant="contained"
                                                                        color="inherit"
                                                                        onClick={installRemoveImage}
                                                                    >
                                                                        Reset Photo
                                                                    </Button>
                                                                </div> : null}
                                                        </Grid ></div>
                                                    )
                                                }


                                                if (user.installtatus != "Complete" && findRole() === "admin") {
                                                    return (
                                                        <div>
                                                            <Grid item xs={12}
                                                                md={12}>
                                                                <label htmlFor="upload-button1">
                                                                    {install.preview ? (
                                                                        <img src={install.preview} alt="install" width="300" height="300" />
                                                                    ) : null}
                                                                </label>
                                                                <Typography>Installation Letter Photo:</Typography>
                                                                <input
                                                                    type="file"
                                                                    id="upload-button1"
                                                                    // style={{ display: "none" }}
                                                                    onChange={handleChangeInstall}
                                                                    accept="image/*"
                                                                />
                                                                <br />
                                                                <span style={{ color: "red" }}>{errorI}</span>
                                                                <br />
                                                                <br />
                                                                {installb ?
                                                                    <div>
                                                                        <Button
                                                                            size="medium"
                                                                            variant="contained"
                                                                            color="primary"
                                                                            style={{ backgroundColor: "#834bff" }}
                                                                            onClick={(e) => { installUpload(e, user.mainAadhaar) }}
                                                                        >
                                                                            Submit Installation Photo
                                                                        </Button>
                                                                        <Button
                                                                            size="medium"
                                                                            variant="contained"
                                                                            color="inherit"
                                                                            onClick={installRemoveImage}
                                                                        >
                                                                            Reset Photo
                                                                        </Button>
                                                                    </div> : null}
                                                            </Grid ></div>
                                                    )
                                                }


                                                if (user.installtatus === "Complete") {
                                                    return (
                                                        <div><Typography color="primary">Installation photo already submitted !</Typography></div>
                                                    )
                                                }
                                            })()}




                                            <br />
                                            <Grid item xs={12}
                                                sm={12}
                                                md={12}>
                                                <br />
                                                <label htmlFor="upload-button2">
                                                    {satis.preview ? (
                                                        <img src={satis.preview} alt="dummy" width="300" height="300" />
                                                    ) : null}
                                                </label>
                                                <Typography>Satisfaction Letter Photo :</Typography>
                                                <input
                                                    type="file"
                                                    id="upload-button2"
                                                    // style={{ display: "none" }}
                                                    onChange={handleChangeSatis}
                                                    accept="image/*"
                                                />
                                                <br />
                                                <span style={{ color: "red" }}>{errorS}</span>
                                                <br />
                                                <br />
                                                {satisb ?
                                                    <div>
                                                        <Button
                                                            size="medium"
                                                            variant="contained"
                                                            color="primary"
                                                            style={{ backgroundColor: "#f44336" }}
                                                            onClick={(e) => { satisUpload(e, user.mainAadhaar) }}
                                                        >
                                                            Submit Satisfaction  Photo
                                                        </Button>
                                                        <Button
                                                            size="medium"
                                                            variant="contained"
                                                            color="inherit"
                                                            onClick={satisRemoveImage}
                                                        >
                                                            Reset Photo
                                                        </Button>
                                                    </div> : null}
                                            </Grid>

                                            <Grid item xs={12}
                                                sm={12}
                                                md={12}>
                                                <br />
                                                <label htmlFor="upload-button3">
                                                    {other.preview ? (
                                                        <img src={other.preview} alt="dummy" width="300" height="300" />
                                                    ) : null}
                                                </label>
                                                <Typography>Other Letter Photo :</Typography>
                                                <input
                                                    type="file"
                                                    id="upload-button3"
                                                    // style={{ display: "none" }}
                                                    onChange={handleChangeOther}
                                                    accept="image/*"
                                                />
                                                <br />
                                                <span style={{ color: "red" }}>{errorO}</span>
                                                <br />
                                                <br />
                                                {otherb ?
                                                    <div>
                                                        <Button
                                                            variant="contained"
                                                            style={{ backgroundColor: "#8bc34a" }}
                                                            color="primary"
                                                            onClick={(e) => { othereUpload(e, user.mainAadhaar) }}
                                                        >
                                                            Submit Other Photo
                                                        </Button>
                                                        <Button
                                                            size="medium"
                                                            variant="contained"
                                                            color="inherit"
                                                            onClick={otherRemoveImage}
                                                        >
                                                            Reset Photo
                                                        </Button>
                                                    </div> : null
                                                }
                                            </Grid>
                                        </Grid>
                                    </Container>)}
                            </Grid>
                        ))}

                    </Grid>
                </Container>
            </div>
            <div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4} style={{ marginRight: "1rem" }}>
                        {users.map((user, i) => (
                            <Grid item key={i} xs={12} sm={6} md={4}>
                                <div>
                                    <Typography component="h2" variant="h5">
                                        Photo:    Installation Letter
                                    </Typography>
                                    <br></br>
                                    {user.InstalationLetter ?
                                        <div>
                                            <img
                                                src={user.InstalationLetter}
                                                alt="new"
                                            />

                                            {/* <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        startIcon={<CloudDownloadIcon />}
                                        href={user.InstalationLetter} target="_blank">
                                    
                                        Download
                                    </Button> */}
                                            <a href={user.InstalationLetter} target="_blank">Download</a>


                                        </div> : "No Image found"}
                                </div>
                                <br></br>
                                <div>
                                    <Typography component="h2" variant="h5">
                                        Photo:   Satisfaction Letter
                                    </Typography>
                                    <br></br>
                                    {user.satisfactionLetter ?
                                        <div>
                                            <img
                                                src={user.satisfactionLetter}
                                                alt="new"
                                            />
                                            {/* <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        startIcon={<CloudDownloadIcon />}
                                    >
                                        Download
                                    </Button> */}
                                            <a href={user.satisfactionLetter} target="_blank">Download</a>
                                        </div> : "No Image found"}
                                </div>
                                <br></br>
                                <div>
                                    <Typography component="h2" variant="h5">
                                        Photo:  Other Document
                                    </Typography>
                                    <br></br>
                                    {user.otherLetter ?
                                        <div>
                                            <img
                                                src={user.otherLetter}
                                                alt="new"
                                            />
                                            {/* <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        startIcon={<CloudDownloadIcon />}
                                    >
                                        Download
                                    </Button> */}
                                            <a href={user.otherLetter} target="_blank">Download</a>
                                        </div> : "No Image found"}

                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                <Container>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                label="Image"
                                type="file"
                                name="image"
                                //onChange={ }
                                // handleFileChange(event.target.files)

                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    inputProps: {
                                        accept: "image/x-png,image/gif,image/jpeg",
                                    },
                                }}
                            />
                        </FormControl>
                    </Grid>
                </Container>
            </div>

            <FooterSection />
            {/* End footer */}
        </React.Fragment>
    );
}


