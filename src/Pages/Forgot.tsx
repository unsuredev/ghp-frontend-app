import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../Components/Copyright';
import { httpClient } from '../Common/Service'
import { CodeJson } from 'mdi-material-ui';
import { ToastContext } from "../Common/ToastProvider";


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/1600x900/?architecture)',
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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



const Forgot = () => {
  const classes = useStyles();
  const { showToast } = React.useContext(ToastContext);

  const [user, setUser] = React.useState({
    email: "",
    password: ""
  })
  return (
    <React.Fragment>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            {/* <PersonOutlinedIcon/> */}
            <Typography component="h1" variant="h5">
              JAMAN HP GAS
            </Typography>
            <h4>Code: 13816000</h4>

            <p>Reset password is enabled yet!</p>
            <form noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email "
                name="email"
                autoComplete="email"
                autoFocus
              // value={user.email}
              // onChange={handleChange}
              />


              <Button style={{ marginTop: "15px" }}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              //   className={classes.submit}
              //   onClick={handleSubmit}
              >
                Send Reset email
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
                </Grid>
                <br></br>
                <Grid item style={{ marginTop: "25px" }}>
                  <Link href="/" variant="body2">
                    {"Login  here"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={20}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Forgot
