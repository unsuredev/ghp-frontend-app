import React from 'react';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';
import { Link as RouterLink, useHistory } from "react-router-dom";

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { ToastContext } from "../Common/ToastProvider";
import axios from "axios";
import { BASE_URL } from "../Common/constant";

const SignIn = () => {
  let history = useHistory();

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
    <div style={{marginTop:"100px", paddingTop:"50px"}}>

    </div>
      <Helmet>
        <title>Login | GOURIPUR HP</title>
      </Helmet>
      <Box
      //@ts-ignore
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
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
                          headers: { encryption: false },
                      });
                      if (result.data.status==="success") {
                        console.log("data" ,result.data)
                        localStorage.setItem("access_token", result.data.data.access_token)
                        showToast("Loggedin susccesssfully", "success")
                        history.push('/home')
                      }
              }
              catch (error) {
                  //@ts-ignore
                  showToast(error.response.data.message, "error")
                  console.log(error)
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
                <Box style={{textAlign:"center"}}>
                  <Typography
                    color="textPrimary"
                    variant="h4"
                  >
                  GOURIPUR HP GAS
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Code : 13784600
                  </Typography>
                </Box>
                <Box  style={{marginTop:"4rem"}}
                
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    Login with registered Email Id
                  </Typography>
                </Box>
                <TextField
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
                />
                <TextField
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
                    endAdornment: icon
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
    </>
  );
};

export default SignIn;
