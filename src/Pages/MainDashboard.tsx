import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { BASE_URL } from "../Common/constant";
import axios from "axios";
import { Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getToken } from '../Common/helper';
import { ToastContext } from "../Common/ToastProvider";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

const MainDashboard = () => {
  const classes = useStyles();
  const [connection, setConnection] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const [data, setData] = React.useState([]);
  const { showToast } = React.useContext(ToastContext);


  React.useEffect(() => {
    getNcDetails();
  }, []);


  const getNcDetails = async () => {
    try {
      const result = await axios.get(BASE_URL + "ncdelivery/get",
        {
          headers: {
            encryption: false,
            token: getToken()
          },
        });
      if (result && result.data) {
        setConnection(result.data.data.NcDetails)
        setLoading(false)
      }
    }
    catch (error) {
      if (error) {
        console.log(error)
        //@ts-ignore
        showToast(error.response.data.message, "error")
      }
    }
  }




  return (
    <React.Fragment>
      {loading ? <div style={{ paddingTop: "16rem", justifyContent: "center", alignItems: "center", textAlign: "center", width: "100%" }}> <CircularProgress /> </div> :
        <div

          style={{ textAlign: "center", marginTop: "3rem" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    TOTAL LOAD DELIVERED
                  </Typography>
                  <div
                    style={{
                      backgroundColor: "#2196f3",
                      color: "white",
                      height: "10rem",
                      width: "10rem",
                      borderRadius: "70%",
                      display: "inline-flex",
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h1 style={{ fontSize: "40px" }}>
                      {/* @ts-ignore */}
                      {connection.totalLod}
                    </h1>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    TOTAL REGULATOR DELIVERED
                  </Typography>
                  <div
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      height: "10rem",
                      width: "10rem",
                      borderRadius: "70%",
                      display: "inline-flex",
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h1 style={{ fontSize: "40px" }}>
                      {/* @ts-ignore */}
                      {connection.totalRegulator}
                    </h1>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    TOTAL PIPE DELIVERED
                  </Typography>
                  <div
                    style={{
                      backgroundColor: "#4caf50",
                      color: "white",
                      height: "10rem",
                      width: "10rem",
                      borderRadius: "70%",
                      display: "inline-flex",
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h1 style={{ fontSize: "40px" }}>
                      {/* @ts-ignore */}
                      {connection.totalPipe}
                    </h1>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    TOTAL BPL OVEN DELIVERED
                  </Typography>
                  <div
                    style={{
                      backgroundColor: "#ffc107",
                      color: "white",
                      height: "10rem",
                      width: "10rem",
                      borderRadius: "70%",
                      display: "inline-flex",
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h1 style={{ fontSize: "40px" }}>
                      {/* @ts-ignore */}
                      {connection.totalBplOven}
                    </h1>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    TOTAL HP OVEN DELIVERED
                  </Typography>
                  <div
                    style={{
                      backgroundColor: "#00897b",
                      color: "white",
                      height: "10rem",
                      width: "10rem",
                      borderRadius: "70%",
                      display: "inline-flex",
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h1 style={{ fontSize: "40px" }}>
                      {/* @ts-ignore */}
                      {connection.totalHpOven}
                    </h1>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    TOTAL NON HP DELIVERED
                  </Typography>
                  <div
                    style={{
                      backgroundColor: "#3f51b5",
                      color: "white",
                      height: "10rem",
                      width: "10rem",
                      borderRadius: "70%",
                      display: "inline-flex",
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h1 style={{ fontSize: "40px" }}>
                      {/* @ts-ignore */}
                      {connection.totalNonHpOven}
                    </h1>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    TOTAL LIGHT DELIVERED
                  </Typography>
                  <div
                    style={{
                      backgroundColor: "#ef6c00",
                      color: "white",
                      height: "10rem",
                      width: "10rem",
                      borderRadius: "70%",
                      display: "inline-flex",
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h1 style={{ fontSize: "40px" }}>
                      {/* @ts-ignore */}
                      {connection.totalLight}
                    </h1>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    TOTAL INSTALLATION COMPLETE
                  </Typography>
                  <div
                    style={{
                      backgroundColor: "#9c27b0",
                      color: "white",
                      height: "10rem",
                      width: "10rem",
                      borderRadius: "70%",
                      display: "inline-flex",
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h1 style={{ fontSize: "40px" }}>
                      {/* @ts-ignore */}
                      {connection.installationComplete}
                    </h1>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    TOTAL AMOUNT PAID
                  </Typography>
                  <div
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      height: "10rem",
                      width: "10rem",
                      borderRadius: "70%",
                      display: "inline-flex",
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h1 style={{ fontSize: "40px" }}>
                      {/* @ts-ignore */}
                      {connection.totalAmount}
                    </h1>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>}
      <br></br>
    </React.Fragment>
  );
}

export default MainDashboard
