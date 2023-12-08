import React from 'react';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField, makeStyles,
  Typography
} from '@material-ui/core';

import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { Link as RouterLink, useHistory } from "react-router-dom";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { ToastContext } from "../Common/ToastProvider";
import axios from "axios";
import { BASE_URL } from "../Common/constant";
import '../App.css'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),

  }, main:
  {
    width: 270
  },
  tab: {
    width: "100%",
  }, input: {
    color: "black"
  }
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SignIn = () => {
  const [open, setOpen] = React.useState(true);


  const handleClose = () => {
    setOpen(false);
  };

  let history = useHistory();
  const classes = useStyles();

  const { showToast } = React.useContext(ToastContext);
  const [passwordShown, setPasswordShown] = React.useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const [user, setUser] = React.useState({
    email: "",
    password: ""
  })

  let icon: any;
  if (passwordShown == true) {
    icon = <VisibilityIcon onClick={togglePasswordVisiblity} />;
  } else if (passwordShown == false) {
    icon = <VisibilityOffIcon onClick={togglePasswordVisiblity} />;
  }

  return (
    <>
      <div className="bg-img">
        <div style={{ paddingTop: "150px" }}>
          <Helmet>
            <title>Login | JAMAN HP</title>
          </Helmet>
          <Box

          >
            <Container maxWidth="sm">
              {/* @ts-ignore */}

              <Formik
                initialValues={{
                  email: '',
                  password: ''
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                  password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values: any) => {
                  try {
                    const result = await axios.post(BASE_URL + "user/login", {
                      "login_type": "email",
                      "email": values.email.toLowerCase(),
                      "password": values.password,
                    }, {
                      headers: {
                        encryption: false,
                        'Accept': 'application/json'
                      },
                    });
                    console.log("data==>", result.data.data.token)
                    if (result.data.status === "success") {
                      console.log("data", result.data.data.token)
                      localStorage.setItem("access_token", result.data.data.token)
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
                  <form onSubmit={handleSubmit}>
                    <Box style={{ textAlign: "center", color: "white" }}>
                      <Typography
                        variant="h3"
                      >
                        JAMAN HP GAS
                      </Typography>

                      <img src={require("../hp.png").default} style={{ borderRadius: "20%" }}
                        width="90px" height="90px" alt="hpgas logo 2" />

                      <Typography
                        gutterBottom
                        variant="h6"
                      >

                        SAP Code: 41033623

                      </Typography>

                    </Box>
                    <Box style={{ marginTop: "4rem", color: "white" }}

                    >
                      <Typography
                        align="center"
                        variant="body1"
                      >
                        Login with registered Email Id
                      </Typography>
                    </Box>
                    <TextField
                      color="primary"
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      helperText={touched.email && errors.email}
                      label="Email Address"
                      margin="normal"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="email"
                      value={values.email}
                      variant="outlined"
                      InputProps={{
                        className: classes.input
                      }}
                    />
                    <TextField
                      color="primary"
                      error={Boolean(touched.password && errors.password)}
                      fullWidth
                      helperText={touched.password && errors.password}
                      label="Password"
                      margin="normal"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type={passwordShown ? "text" : "password"}
                      value={values.password}
                      variant="outlined"
                      InputProps={{
                        endAdornment: icon,
                        className: classes.input

                      }}
                    />
                    {/* @ts-ignore */}

                    <Box sx={{ py: 2 }}>
                      <Button
                        color="primary"
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Sign in now
                      </Button>
                    </Box>

                  </form>
                )}
              </Formik>
            </Container>
          </Box>
        </div>
      </div>
    </>
  );
};

export default SignIn;
