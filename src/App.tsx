import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles'
import teal from '@material-ui/core/colors/teal';
import AuthenticatedRoute from './Components/auth';
import yellow from '@material-ui/core/colors/yellow'
import Forgot from './Pages/Forgot';
import Home from './Pages/Home';
import Customer from './Pages/Registration';
import ResponsiveDrawer from './Components/Drawer';
import CustomerStats from './Pages/DailyUpdatePage';
import Reports from './Pages/Report';
import AgentList from './Pages/AgentManagement';
import TrashConsumerTable from "./Components/TrashUsers";
import Profile from './Pages/Profile';
import ImageManagement from './Pages/ImageManagement'
import OldDataManagement from './Components/OldCustomerManagement'
import ConnectionDashboard from './Pages/ConnectionDashboard'
import { ToastProvider } from "./Common/ToastProvider";
import MainDashboard from "./Pages/MainDashboard";
import UserDashBoard from './Pages/UserDashBoard'
import SignInSide from './Pages/Login';
import AgentDashBoard from './Pages/AgentDashBoard'
import './App.css';
import FingerPrint from "./Components/FingerPrint";
import RefillSales from "./Pages/RefillSales";
import RefillSale from "./Components/RefilSale";

import Transactions from './Pages/Transactions'
import RejectFingerPrint from './Components/RejectFingerPrint'
import MemberManagement from "./Pages/UserManagement";
import { isTokenExpired } from "./Common/helper";
const theme = createTheme(

  {
    palette: {
      primary: teal,
      secondary: yellow
    },
  });



const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">

        <ToastProvider>
          <Router>
            {!isTokenExpired() ? <ResponsiveDrawer /> : (<React.Fragment></React.Fragment>)}

            <Switch>

              <Route exact path="/" component={SignInSide} />
              <Route exact path="/home" component={Home} />
              <AuthenticatedRoute path="/dailycustomer" exact component={CustomerStats} />
              <AuthenticatedRoute exact path="/reports" component={Reports} />
              <AuthenticatedRoute exact path="/agentlist" component={AgentList} />
              <AuthenticatedRoute exact path="/trash" component={TrashConsumerTable} />
              <AuthenticatedRoute exact path="/customerdocs" component={ImageManagement} />
              <AuthenticatedRoute exact path="/delivery" component={MainDashboard} />
              <AuthenticatedRoute exact path="/dash" component={UserDashBoard} />
              <AuthenticatedRoute exact path="/dash" component={UserDashBoard} />
              <Route exact path="/customer" component={Customer} />
              <Route exact path="/reset" component={Forgot} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/connection" component={ConnectionDashboard} />
              <Route exact path="/olddatamanagement" component={OldDataManagement} />
              <Route exact path="/connection" component={ConnectionDashboard} />
              <Route exact path="/agentdashboard" component={AgentDashBoard} />
              <Route exact path="/fingerprint" component={FingerPrint} />
              <Route exact path="/refillsales" component={RefillSales} />
              <Route exact path="/transaction" component={Transactions} />
              <Route exact path="/completefinger" component={RejectFingerPrint} />
              <Route exact path="/member" component={MemberManagement} />
              <Route exact path="/test" component={RefillSale}
              />
            </Switch >
          </Router >
        </ToastProvider >
      </div >
    </ThemeProvider >
  );
}

export default App;

