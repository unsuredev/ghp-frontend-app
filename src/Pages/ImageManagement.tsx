import React from 'react';
import {
    Button,
    Typography,
    CardHeader,
    Paper,
    Tabs,
    Tab,
    CardContent,
    Card,
    Grid,
    makeStyles,
    Container,
    CssBaseline,
    TextField,
  } from "@material-ui/core";
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import FormControl from "@material-ui/core/FormControl";
import ResponsiveDrawer from "./Drawer";
import FooterSection from "../Components/Footer";


const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
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
}));

const cards = [1, 2, 3];

export default function ImageManagement() {
    const classes = useStyles();
    const [imageSrc, setImageSrc] = React.useState()
    const [upload, setUpload]=React.useState(false)
    const [view, setView]=React.useState(false)


    const handleImageSelect = (e:any) => {
        //@ts-ignore
      setImageSrc(URL.createObjectURL(e.target.files[0]))
    }

    return (
        <React.Fragment>
            <CssBaseline />
      <ResponsiveDrawer />
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Grid item xs={12} sm={12} md={12}>
                            <form className={classes.form} noValidate autoComplete="off">
                                <TextField
                                    id="outlined-basic"
                                    label="Main Aadhaar No"
                                    variant="outlined"
                                    fullWidth
                                    type="aadhaar"
                                    name="aadhaar"
                                    autoComplete="aadhaar"
                                    autoFocus
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
                                        color="secondary"
                                        onClick={()=>setView(true)}
                                    >
                                        VIEW CUSTOMER'S PHOTO
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        color="primary"
                                        onClick={()=>setUpload(true)}

                                    >
                                        UPLOAD CUSTOMER'S PHOTO
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>

                {upload?
                            <Container className={classes.cardGrid} maxWidth="md">
                            <Grid container spacing={4}>
                            <ol className="mw400 center" style={{ textAlign: "left" }}>
                                <li>
                                    UPLOAD INSTALLATION IMAGE: <UploadPreview />
                                </li>
                                <li>
                                    UPLOAD  DELIVERY LETTER IMAGE:<UploadPreview />
                                </li>
                                <li>
                                    UPLOAD OTHER IMAGE: <UploadPreview />
                                </li>
                            </ol>
                            </Grid>
                            </Container>:null}
                            </Grid></Container>
                            {view?
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {cards.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://source.unsplash.com/random"
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Main Aadhaar:
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" variant="contained" color="primary">
                                            DOWNLOAD
                                        </Button>
                                        <Button size="small" variant="contained" color="secondary">
                                            delete
                                        </Button>
                                        
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>:null}
            </main>
            
            {/* Footer */}
            <FooterSection />
            {/* End footer */}
        </React.Fragment>
    );
}



class UploadPreview extends React.Component {
    constructor(props:any) {
        super(props);
        this.state = { file: null };
        this.onChange = this.onChange.bind(this);
        this.resetFile = this.resetFile.bind(this);
    }
    onChange(event:any) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        });
    }

    resetFile(event:any) {
        event.preventDefault();
        this.setState({ file: null });
    }
    render() {
        return (
            <div>
                <input type="file" onChange={this.onChange} />
                      {/* @ts-ignore */}
                {this.state.file && (
                    <div style={{ textAlign: "center" }}>
                        <button onClick={this.resetFile}>Remove File</button>
                    </div>
                )}
                      {/* @ts-ignore */}
                <img style={{ width: "100%" }} src={this.state.file} />
            </div>
        );
    }
}