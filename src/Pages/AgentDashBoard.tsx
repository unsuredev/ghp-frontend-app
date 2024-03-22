import React from "react";
import { Typography, Grid, Button, makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { httpClient } from "../Common/Service";
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import MaterialTable from "material-table";

import { BASE_URL } from "../Common/constant";
import { getToken, getUserName } from "../Common/helper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    color: 'white',
    width: 185,
    margin: 10

  },
  margin: {
    margin: theme.spacing(1),

  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 3),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingBottom: theme.spacing(8),
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
  title: {
    fontSize: 14,
  },
  tab: {
    width: "100%",
  },
}));


const AgentDashBoard = () => {
  const classes = useStyles();
  const [customerTotal, setCustomerTotal] = React.useState({
    "newCustomer": 0,
    "oldCustomer": 0,
    "totalConnection": 0,
    "installationComplete": 0,
    "totalLoad": 0,

  })
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState([]);
  const [customer, setCustomer] = React.useState([]);
  const [allcustomer, setAllCustomer] = React.useState([]);
  const [singleUser, setSingleUser] = React.useState(0);
  const [doubleUser, setDoubleUser] = React.useState(0);
  const [svlist, setSvlist] = React.useState([])



  const columns = [
    { title: 'Sl No', field: 'tableData.id' },
    { title: "Name", field: "name" },
    { title: "Main Aadhaar", field: "mainAadhaar" },
    { title: "Family Aadhaar", field: "familyAadhaar" },
    { title: "Mobile", field: "mobile" },
    { title: "Consumer No", field: 'consumerNo' },
    { title: "Registered Agency Name", field: 'registeredAgencyName' },
    { title: "Sub Agent", field: 'subAgent' },
    { title: "Installation status", field: 'installtatus' },
    { title: "Remarks", field: 'remarks' },
    {
      title: "Register Date ", field: "registerDate"
    }

  ]

  React.useEffect(() => {
    document.title = "Live Stats | JAMAN HP GAS  "
    fetchDashBoard()
    fetchNewConsumer()
  }, []);


  const fetchPendingConsmer = async () => {
    try {
      setLoading(true)
      const result = await axios.post(BASE_URL + "agent/pendingcustomer", {},
        {
          headers: {
            encryption: false,
            token: getToken()
          },
        });

      if (result.data) {
        setData(result.data.data.data)
        setLoading(false)
        setSvlist([])

      }
    }
    catch (error) {
      console.log("error", error)
    }
  }


  const fetchNewConsumer = async () => {
    try {
      setLoading(true);
      const result = await axios.post(
        BASE_URL + "agent/onlyconsumer",
        {},
        {
          headers: {
            encryption: false,
            token: getToken(),
          },
        }
      );

      if (result.data) {
        setCustomer(result.data.data.data);
        let resultArray = result.data.data.data.filter(
          (doc: any) => doc.isSingleWomen === true
        );
        setSingleUser(resultArray.length);
        let resultArray2 = result.data.data.data.filter(
          (doc: any) => doc.isSingleWomen === false
        );
        setDoubleUser(resultArray2.length);
        setLoading(false);
        setSvlist([])

      }
    } catch (error) {
      console.log("error", error);
    }
  };


  const manageSingleAadhaar = async () => {
    try {
      setLoading(true);
      const result = await axios.post(
        BASE_URL + "agent/onlyconsumer",
        {},
        {
          headers: {
            encryption: false,
            token: getToken(),
          },
        }
      );

      if (result.data) {
        let resultArray = result.data.data.data.filter(
          (doc: any) => doc.isSingleWomen === true
        );
        setCustomer(resultArray);
        setLoading(false);
        setSvlist([])

      }
    } catch (error) {
      console.log("error", error);
    }
  };


  const manageDoubleAadhaar = async () => {
    try {
      setLoading(true);
      const result = await axios.post(
        BASE_URL + "agent/onlyconsumer",
        {},
        {
          headers: {
            encryption: false,
            token: getToken(),
          },
        }
      );
      if (result.data) {
        let resultArray = result.data.data.data.filter(
          (doc: any) => doc.isSingleWomen === false
        );
        setDoubleUser(resultArray.length);
        setCustomer(resultArray);
        setLoading(false);
        setSvlist([])

      }
    } catch (error) {
      console.log("error", error);
    }
  };




  const fetchDashBoard = async () => {
    try {
      setLoading(true)
      const result = await httpClient("customer/customerbyagent", "POST", {})
      if (result.data) {
        setCustomerTotal(result.data)
        setLoading(false)
        setSvlist([])

      }
    }
    catch (error) {
      console.error(error);
    }
  }


  const fetchAllCustomer = async () => {
    try {
      const result = await httpClient("agent/allconsumer", "POST", {})
      if (result.data) {
        setAllCustomer(result.data.data)
        setSvlist([])

      }
    }
    catch (error) {
      console.error(error);
    }
  }

  const svreadylistFun = async () => {
    try {
      //@ts-ignore
      setLoading(true)
      const result = await httpClient("agent/svreadylist", "POST", { mainAgent: getUserName() });
      if (result.data) {
        setSvlist(result.data);
        setLoading(false);
        setAllCustomer([])
        setCustomer([])
        setData([])

      }
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <React.Fragment>
      <CssBaseline />
      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Container maxWidth="lg">
          {loading ? (
            <div
              style={{
                paddingTop: "30px",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                width: "100%",
              }}
            >
              <p>Loading...</p> <CircularProgress />{" "}
            </div>
          ) : (
            <div>
              <Grid container spacing={2} style={{ marginTop: "50px" }}>

                <Grid item xs={12} sm={12} md={3}>
                  <Card
                    className={classes.card}
                  >
                    <CardContent className={classes.cardContent}>
                      <h2 style={{ textAlign: "center" }}>
                        SV Ready
                      </h2>
                      <Typography
                        variant="h2"
                        component="h2"
                        style={{ fontWeight: "bold", textAlign: "center" }}
                      >
                        ALL
                      </Typography>
                    </CardContent>
                    <CardActions></CardActions>
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      className={classes.margin}
                      onClick={svreadylistFun}
                    >
                      View
                    </Button>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <Card
                    className={classes.card}
                  >
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        PMUY 2.0 Registration
                      </Typography>
                      <Typography
                        variant="h2"
                        component="h2"
                        style={{ fontWeight: "bold", textAlign: "center" }}
                      >
                        {customerTotal.newCustomer}
                      </Typography>
                    </CardContent>
                    <CardActions></CardActions>
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      className={classes.margin}
                      onClick={fetchAllCustomer}
                    >
                      View
                    </Button>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <Card
                    className={classes.card}
                  >
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        PMUY 2.0 Consumer
                      </Typography>
                      <Typography
                        variant="h2"
                        component="h2"
                        style={{
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        {customerTotal.totalConnection}
                      </Typography>
                    </CardContent>
                    <CardActions></CardActions>
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      className={classes.margin}
                      onClick={fetchNewConsumer}
                      style={{
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      View
                    </Button>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <Card
                    className={classes.card}
                  >
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Single Aadhaar Consumer
                      </Typography>
                      <Typography
                        variant="h2"
                        component="h2"
                        style={{ fontWeight: "bold", textAlign: "center" }}
                      >
                        {singleUser}
                      </Typography>
                    </CardContent>
                    <CardActions></CardActions>
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      className={classes.margin}
                      onClick={manageSingleAadhaar}
                    >
                      View
                    </Button>
                  </Card>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={4}>
                  <Card
                    className={classes.card}

                  >
                    <CardContent className={classes.cardContent}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                      >
                        Double Aadhaar Consumer
                      </Typography>
                      <Typography
                        color="secondary"
                        variant="h2"
                        component="h2"
                        style={{ fontWeight: "bold", textAlign: "center" }}
                      >
                        {doubleUser}
                      </Typography>
                    </CardContent>
                    <CardActions></CardActions>
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      className={classes.margin}
                      onClick={manageDoubleAadhaar}
                    >
                      View
                    </Button>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <Card
                    className={classes.card}
                  >
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Today's Registration
                      </Typography>
                      <Typography
                        variant="h2"
                        component="h2"
                        style={{ fontWeight: "bold", textAlign: "center" }}
                      >
                        {customerTotal.totalLoad -
                          customerTotal.installationComplete}
                      </Typography>
                    </CardContent>
                    <CardActions></CardActions>
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      className={classes.margin}
                      onClick={fetchPendingConsmer}
                    >
                      View
                    </Button>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <Card
                    className={classes.card}
                  >
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Installation Pending
                      </Typography>
                      <Typography
                        variant="h2"
                        component="h2"
                        style={{ fontWeight: "bold", textAlign: "center" }}
                      >
                        {customerTotal.totalLoad -
                          customerTotal.installationComplete}
                      </Typography>
                    </CardContent>
                    <CardActions></CardActions>
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      className={classes.margin}
                      onClick={fetchPendingConsmer}
                    >
                      View
                    </Button>
                  </Card>
                </Grid>
              </Grid>
              <Grid container spacing={4} style={{ marginTop: "50px" }}>
                <Grid item xs={12} sm={12} md={4}>
                  <Card
                    className={classes.card}
                  >
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Total Load
                      </Typography>
                      <Typography
                        variant="h2"
                        component="h2"
                        style={{ fontWeight: "bold", textAlign: "center" }}
                      >
                        {customerTotal.totalLoad}
                      </Typography>
                    </CardContent>
                    <CardActions></CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <Card
                    className={classes.card}
                  >
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Installation Complete
                      </Typography>
                      <Typography
                        variant="h2"
                        component="h2"
                        style={{ fontWeight: "bold", textAlign: "center" }}
                      >
                        {customerTotal.installationComplete}
                      </Typography>
                    </CardContent>
                    <CardActions></CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <Card
                    className={classes.card}
                  >
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Total Old Consumer (Before2021)
                      </Typography>
                      <Typography
                        variant="h2"
                        component="h2"
                        style={{ fontWeight: "bold", textAlign: "center" }}
                      >
                        {customerTotal.oldCustomer}
                      </Typography>
                    </CardContent>
                    <CardActions></CardActions>
                  </Card>
                </Grid>
              </Grid>
            </div>
          )}
        </Container>
      </div>

      {customer.length > 0 ? (
        <Container component="main">
          {/* <div style={{ paddingTop: "30px", justifyContent: "center", alignItems: "center", textAlign: "center", width: "100%" }}><p>This may take couple of mins...</p> <CircularProgress /> </div>  */}
          <MaterialTable
            title="All registration List JAMAN HP GAS"
            data={customer}
            //@ts-ignore
            columns={columns}
            options={{
              exportButton: true,
              exportAllData: true,
              filtering: true,
              sorting: true,
              pageSizeOptions: [5, 20, 50, 100, 200, 500],
              headerStyle: {
                backgroundColor: "#004e8d",
                color: "#FFF",
              },
            }}
          />
        </Container>
      ) : null}
      {data.length > 0 ? (
        <Container component="main">
          {/* <div style={{ paddingTop: "30px", justifyContent: "center", alignItems: "center", textAlign: "center", width: "100%" }}><p>This may take couple of mins...</p> <CircularProgress /> </div>  */}
          <MaterialTable
            title="PENDING Consumer list JAMAN HP GAS"
            data={data}
            //@ts-ignore
            columns={columns}
            options={{
              exportButton: true,
              exportAllData: true,
              filtering: true,
              sorting: true,
              pageSizeOptions: [5, 20, 50, 100, 200, 500],
              headerStyle: {
                backgroundColor: "#F42870",
                color: "#FFF",
              },
            }}
          />
        </Container>
      ) : null}

      {allcustomer.length > 0 ? (
        <Container component="main">
          {/* <div style={{ paddingTop: "30px", justifyContent: "center", alignItems: "center", textAlign: "center", width: "100%" }}><p>This may take couple of mins...</p> <CircularProgress /> </div>  */}
          <MaterialTable
            title="All Consumer List JAMAN HP GAS"
            data={allcustomer}
            //@ts-ignore

            columns={columns}
            options={{
              exportButton: true,
              exportAllData: true,
              filtering: true,
              sorting: true,
              pageSizeOptions: [5, 20, 50, 100, 200, 500],
              headerStyle: {
                backgroundColor: "#F42870",
                color: "#FFF",
              },
            }}
          />
        </Container>
      ) : null}

      {svlist.length > 0 ? (
        <Container component="main">
          {/* <div style={{ paddingTop: "30px", justifyContent: "center", alignItems: "center", textAlign: "center", width: "100%" }}><p>This may take couple of mins...</p> <CircularProgress /> </div>  */}
          <MaterialTable
            title="SV list JAMAN HP GAS"
            data={svlist}
            //@ts-ignore

            columns={columns}
            options={{
              exportButton: true,
              exportAllData: true,
              filtering: true,
              sorting: true,
              pageSizeOptions: [5, 20, 50, 100, 200, 500],
              headerStyle: {
                backgroundColor: "#F42870",
                color: "#FFF",
              },
            }}
          />
        </Container>
      ) : null}

    </React.Fragment>
  );


}

export default AgentDashBoard