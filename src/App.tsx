import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import AuthenticatedRoute from './Components/auth';
import yellow from '@material-ui/core/colors/yellow'
import pink from '@material-ui/core/colors/pink';
import MemberSignUp from './Pages/UserManagement'
import Forgot from './Pages/Forgot';
import Home from './Pages/Home';
import Customer from './Pages/CustomerRegistration';
import ResponsiveDrawer from './Pages/Drawer';
import CustomerStats from './Pages/DailyCustomer';
import Reports from './Pages/Report';
import AgentList from './Pages/AgentManagement';
import TrashConsumerTable from "./Pages/TrashUsers";
import Profile from './Pages/Profile';
import ImageManagement from './Pages/ImageManagement'
import OldDataManagement from './Pages/OldCustomerManagement'
import ConnectionDashboard from './Pages/ConnectionDashboard'
import { ToastProvider } from "./Common/ToastProvider";
import MainDashboard from "./Pages/MainDashboard";
import HappyBirthDay from './Pages/HappyBirthDay'
import UserDashBoard from './Pages/UserDashBoard'
import SignInSide from './Pages/Login';
import AgentDashBoard from './Pages/AgentDashBoard'
import './App.css';
import FingerPrint from "./Pages/FingerPrint";
import RefillSales from "./Pages/RefillSales";
import Transactions from  './Pages/Transactions'
import RejectFingerPrint from './Pages/RejectFingerPrint'
const theme = createMuiTheme(

  {
    palette: {
      primary: teal,
      secondary:yellow
    },
  });



const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ToastProvider>
          <Router>
            <Switch>
              <Route exact path="/member" component={MemberSignUp} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/customer" component={Customer} />
              <Route exact path="/" component={SignInSide} />
              <Route exact path="/signin" component={SignInSide} />
              <Route exact path="/reset" component={Forgot} />
              <Route exact path="/res" component={ResponsiveDrawer} />
              <AuthenticatedRoute
                path="/dailycustomer"
                exact
                component={CustomerStats}
              />
              <AuthenticatedRoute exact path="/reports" component={Reports} />
              <AuthenticatedRoute
                exact
                path="/agentlist"
                component={AgentList}
              />
              <AuthenticatedRoute
                exact
                path="/trash"
                component={TrashConsumerTable}
              />
              <Route exact path="/profile" component={Profile} />
              <AuthenticatedRoute
                exact
                path="/customerDocs"
                component={ImageManagement}
              />
              <AuthenticatedRoute
                exact
                path="/customerDocs"
                component={ImageManagement}
              />
              <Route
                exact
                path="/olddatamanagement"
                component={OldDataManagement}
              />
              <Route exact path="/connection" component={ConnectionDashboard} />
              <AuthenticatedRoute
                exact
                path="/delivery"
                component={MainDashboard}
              />
              <Route exact path="/wish" component={HappyBirthDay} />
              <AuthenticatedRoute
                exact
                path="/dash"
                component={UserDashBoard}
              />
              <Route exact path="/agentdashboard" component={AgentDashBoard} />
              <Route exact path="/fingerprint" component={FingerPrint} />
              <Route exact path="/refillsales" component={RefillSales} />
              <Route exact path="/transaction" component={Transactions} />
              <Route
                exact
                path="/completefinger"
                component={RejectFingerPrint}
              />
            </Switch>
          </Router>
        </ToastProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
