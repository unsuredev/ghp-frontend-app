import React from 'react';
import { Button, Typography, CardHeader, CardActions, Tabs, Tab, CardContent, Card, Grid, makeStyles, Container, CssBaseline, TextField } from "@material-ui/core";
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
                                        FIND &  UPLOAD CONSUMER'S PHOTO
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
            </main>
            <div style={{ marginRight: "1rem" }}>
                <Container className={classes.cardGrid} maxWidth="md" >
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
                                                <Typography>Swasthya Sathi  Letter  :</Typography>
                                                <br />

                                                <FileUpload mainAadhaar={user.mainAadhaar} photo_key="swasthyaSathiLetter" tab={tab} />
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

            <Container className={classes.cardGrid} maxWidth="md" >
                {/* End hero unit */}
                <Grid container spacing={2} >
                    {users.map((user, i) => (
                        <Grid container key={i}>
                            <Grid item xs={12} sm={12} md={4}>
                                {user.InstalationLetter ?
                                    <Card>
                                        <img
                                            src={processUrl(user?.InstalationLetter)}
                                            alt="new"
                                            height="300"
                                            width="300"
                                        />
                                        <CardActions>
                                            <Button size="small"> Installation Letter</Button>
                                            <Button size="small">

                                                <a href={processUrl(user?.InstalationLetter)} target="_blank" rel="noreferrer">Download</a>
                                            </Button>
                                        </CardActions>
                                    </Card> : "No Image found"}

                            </Grid>


                            <Grid item xs={12} sm={12} md={4}>

                                {user.satisfactionLetter ?
                                    <Card>
                                        <img
                                            src={processUrl(user.satisfactionLetter)}
                                            alt="new"
                                            height="300"
                                            width="300"
                                        />
                                        <CardActions>


                                            <Button size="small"> Satisfaction Letter</Button>
                                            <Button size="small">


                                                <a href={user.satisfactionLetter} target="_blank" rel="noreferrer">Download</a>
                                            </Button>
                                        </CardActions>
                                    </Card> : "No Image found"}

                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>



                                {user.swasthyaSathiLetter ?
                                    <Card>
                                        <img
                                            src={processUrl(user.swasthyaSathiLetter)}
                                            alt="new"
                                            height="300"
                                            width="300"
                                        />
                                        <CardActions>
                                            <Button size="small"> Swasthya Sathi</Button>
                                            <Button size="small">
                                                <a href={processUrl(user.swasthyaSathiLetter)} target="_blank" rel="noreferrer">Download</a>
                                            </Button>
                                        </CardActions>

                                    </Card> : "No Image found"}


                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>


                                {user.otherLetter ?
                                    <Card>
                                        <img
                                            src={processUrl(user.otherLetter)}
                                            alt="new"
                                            height="200"
                                            width="200"
                                        />

                                        <CardActions>
                                            <Button size="small"> Other Letter</Button>
                                            <Button size="small">
                                                <a href={processUrl(user.otherLetter)} target="_blank" rel="noreferrer">Download</a>
                                            </Button>
                                        </CardActions>
                                    </Card> : "No Image found"}

                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </React.Fragment>
    );
}


