import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles, createStyles, Grid } from "@material-ui/core";
import { ClassProps } from "./vm";
import FingerPrint from "./Components/FingerPrint";
import RefillSales from "./Pages/RefillSales";
import Customer from './Pages/Registration';
import CustomerStats from './Pages/DailyUpdatePage';
import Reports from './Pages/Report';
import AgentList from './Pages/AgentManagement';
import TrashConsumerTable from "./Components/TrashUsers";
import Profile from './Pages/Profile';
import ImageManagement from './Pages/ImageManagement'
import OldDataManagement from './Components/OldCustomerManagement'
import ConnectionDashboard from './Components/ConnectionDashboard'
import AuthenticatedRoute from './Components/auth';
import NavBar from "./Components/NavBar";
import CheckSpaceBar from "./Common/CheckSpaceBar";
import SignInSide from "./Pages/Login";
import MainDashboard from "./Pages/MainDashboard";
import UserDashBoard from "./Pages/UserDashBoard";
import Forgot from "./Pages/Forgot";
import AgentDashBoard from "./Pages/AgentDashBoard";
import RejectFingerPrint from "./Components/RejectFingerPrint";
import MemberManagement from "./Pages/UserManagement";
import Transactions from "./Pages/Transactions";
import ConnectionPage from "./Pages/ConnectionPage";
import HomePage from "./Pages/Home";
import AgentCompleteFingerPrint from "./Components/CompleteAgentFinger";
import ProductMain from "./Pages/Ecom/ProductMain";


export interface RouteProps extends ClassProps { }

const Routes: React.FC<RouteProps> = ({ classes }) => {
  return (
    <Router>
      <div className="d-flex">
        <CssBaseline />
        <Grid container>
          <Grid item md={2}>
            <NavBar />
          </Grid>
          <Grid item sm={12} md={10} xs={12}>
            <main className={classes.content}>
              <CheckSpaceBar />
              <Switch>
                <Route path="/" exact component={SignInSide} />
                <Route exact path="/home" component={HomePage} />
                <AuthenticatedRoute path="/dailyconsumer" exact component={CustomerStats} />
                <AuthenticatedRoute exact path="/reports" component={Reports} />
                <AuthenticatedRoute exact path="/agentlist" component={AgentList} />
                <AuthenticatedRoute exact path="/trash" component={TrashConsumerTable} />
                <AuthenticatedRoute exact path="/customerdocs" component={ImageManagement} />
                <AuthenticatedRoute exact path="/delivery" component={MainDashboard} />
                <AuthenticatedRoute exact path="/dash" component={UserDashBoard} />
                <Route exact path="/customer" component={Customer} />
                <Route exact path="/reset" component={Forgot} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/connection" component={ConnectionPage} />
                <Route exact path="/olddatamanagement" component={OldDataManagement} />
                <Route exact path="/connection" component={ConnectionDashboard} />
                <Route exact path="/agentdashboard" component={AgentDashBoard} />
                <Route exact path="/fingerprint" component={FingerPrint} />
                <Route exact path="/refillsales" component={RefillSales} />
                <Route exact path="/transaction" component={Transactions} />
                {/* Agent */}
                <Route exact path="/rejectfingerPrint" component={RejectFingerPrint} />
                <Route exact path="/completefingerPrint" component={AgentCompleteFingerPrint} />

                <Route exact path="/member" component={MemberManagement} />
                <AuthenticatedRoute exact path="/products" component={ProductMain} />
              </Switch>
            </main>
          </Grid>
        </Grid>



      </div>
    </Router>
  );
};

const styles = () =>
  createStyles({
    appBarSpacer: { height: 48 },
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
      padding: 16,
      backgroundColor: "##fbfbfb",
      //   marginTop: 48,
    },
  });
export default withStyles(styles)(Routes);
