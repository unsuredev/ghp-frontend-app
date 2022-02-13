import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';
import AuthenticatedRoute from './Components/auth';

import pink from '@material-ui/core/colors/pink'
import MemberSignUp from './Pages/UserManagement'
import SignIn from './Pages/Signin';
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
import RefilSale from './Pages/RefilSale';
import HappyBirthDay from './Pages/HappyBirthDay'
import UserDashBoard from './Pages/UserDashBoard'
import SignInSide from './Pages/Login';
import AgentDashBoard from './Pages/AgentDashBoard'
import './App.css';
import FingerPrint from "./Pages/FingerPrint";

const theme = createMuiTheme(

  {
    palette: {
      primary: indigo,
      secondary: pink,
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
              <AuthenticatedRoute exact path="/agentlist" component={AgentList} />
              <AuthenticatedRoute exact path="/trashUsers" component={TrashConsumerTable} />
              <Route exact path="/profile" component={Profile} />
              <AuthenticatedRoute exact path="/customerDocs" component={ImageManagement} />
              <AuthenticatedRoute exact path="/customerDocs" component={ImageManagement} />
              <AuthenticatedRoute exact path="/olddatamanagement" component={OldDataManagement} />
              <Route exact path="/connection" component={ConnectionDashboard} />
              <AuthenticatedRoute exact path="/delivery" component={MainDashboard} />
              <AuthenticatedRoute exact path="/refilsale" component={RefilSale} />
              <Route exact path="/wish" component={HappyBirthDay} />
              <AuthenticatedRoute exact path="/dash" component={UserDashBoard} />
              <Route exact path="/agentdashboard" component={AgentDashBoard} />
              <Route exact path="/fngerprint" component={FingerPrint} />

            </Switch>
          </Router>
        </ToastProvider>
      </div>
    </ThemeProvider>

  );
}

export default App;
