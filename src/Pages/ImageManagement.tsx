import React from 'react';
import { Button, Typography, CardHeader, Tabs, Tab, CardContent, Card, Grid, makeStyles, Container, CssBaseline, TextField } from "@material-ui/core";
import FooterSection from "../Components/Footer";
import { httpClient } from "../Common/Service";
import { ToastContext } from "../Common/ToastProvider";
import jwt_decode from "jwt-decode";
import moment from "moment";
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { processUrl } from '../Service/utilService';
import FileUpload from '../Components/FileUpload';

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
    const [tab, setTab] = React.useState(0);

    const handleChangevalue = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTab(newValue);
    };


    const handleFind = async (event: any) => {
        try {
            event.preventDefault();
            if (tab === 0) {
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
            if (tab === 1) {
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
                                value={tab}
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
                                                title={user?.name?.toUpperCase()}

                                            />
                                            <CardHeader style={{ textAlign: "center" }} />
                                            <div style={{ marginTop: "-40px" }}>
                                                {/* @ts-ignore */}
                                                <Typography>Name : {user?.name?.toUpperCase()}</Typography>
                                                {/* @ts-ignore */}
                                                <Typography>Main Aadhaar : {user?.mainAadhaar}</Typography>
                                                {/* @ts-ignore */}
                                                <Typography>
                                                    Family Aadhaar : {user?.familyAadhaar}
                                                </Typography>
                                                {/* @ts-ignore */}
                                                <Typography>Mobile No : {user?.mobile}</Typography>
                                                {/* @ts-ignore */}
                                                <Typography>
                                                    Registration No : {user.regNo || "NA"}
                                                </Typography>
                                                <Typography>
                                                    Consumer No :{user.consumerNo || "NA"}
                                                </Typography>
                                                {/* @ts-ignore */}
                                                <Typography>Main Agent : {user?.mainAgent.toUpperCase()}</Typography>
                                                {/* @ts-ignore */}
                                                <Typography>Sub Agent : {user?.subAgent || "NA"}</Typography>
                                                <Typography>Registered Agency Name :<span style={{ color: "red" }}> {user.registeredAgencyName || "NA"}</span> </Typography>
                                                <Typography>Remarks : {user?.remarks || "NA"}</Typography>
                                                {/* @ts-ignore */}
                                                <Typography>Created On : {moment(user.createdAt).format('LLL') || "NA"}</Typography>
                                                <Typography variant="subtitle2" gutterBottom color="primary">Added By : {user.addedBy || "NA"}</Typography>
                                            </div>
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
                                                        <Grid item xs={12} md={12}>
                                                            <Typography>Installation Letter  :</Typography>
                                                            <br />

                                                            <FileUpload mainAadhaar={user.mainAadhaar} photo_key="InstalationLetter" tab={tab} />
                                                        </Grid >
                                                    )
                                                }


                                                if (user.installtatus !== "Complete" && findRole() === "admin") {
                                                    return (
                                                        <div>
                                                            <Grid item xs={12}
                                                                md={12}>
                                                                <Typography>Installation Letter  :</Typography>
                                                                <br />


                                                                <FileUpload mainAadhaar={user.mainAadhaar} photo_key="InstalationLetter" tab={tab} />
                                                            </Grid ></div>
                                                    )
                                                }


                                                if (user.installtatus === "Complete") {
                                                    return (
                                                        <div><Typography color="primary">Installation photo already submitted !</Typography></div>
                                                    )
                                                }
                                            })()}

                                            <Grid item xs={12}
                                                sm={12}
                                                md={12}>
                                                <Typography>Satisfaction Letter  :</Typography>
                                                <br />

                                                <FileUpload mainAadhaar={user.mainAadhaar} photo_key="satisfactionLetter" tab={tab} />
                                            </Grid>

                                            <Grid item xs={12}
                                                sm={12}
                                                md={12}>
                                                <Typography>Other Letter  :</Typography>
                                                <br />

                                                <FileUpload mainAadhaar={user.mainAadhaar} photo_key="otherLetter" tab={tab} />
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
                                                src={processUrl(user?.InstalationLetter)}
                                                alt="new"
                                            />

                                            <a href={processUrl(user?.InstalationLetter)} target="_blank" rel="noreferrer">Download</a>

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
                                                src={processUrl(user.satisfactionLetter)}
                                                alt="new"
                                            />

                                            <a href={user.satisfactionLetter} target="_blank" rel="noreferrer">Download</a>
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
                                                src={processUrl(user.otherLetter)}
                                                alt="new"
                                            />

                                            <a href={processUrl(user.otherLetter)} target="_blank" rel="noreferrer">Download</a>
                                        </div> : "No Image found"}

                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </div>
            <FooterSection />
        </React.Fragment>
    );
}


