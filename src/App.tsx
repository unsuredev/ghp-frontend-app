import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink'
import MemberSignUp from './Pages/UserManagement'
import SignIn from './Pages/Signin';
import Forgot from './Pages/Forgot';
import Home from './Pages/Home';
import Customer from './Pages/Customer';
import ResponsiveDrawer from './Pages/Drawer';
import CustomerStats from './Pages/CustomerStats';
import Reports from './Pages/Report';
import AgentList from './Pages/AgentManagement';
import TrashConsumerTable from "./Pages/TrashUsers";
import ResetPassword from './Pages/ResetPassword';
import ImageManagement from './Pages/ImageManagement'
import { ToastProvider } from "./Common/ToastProvider";
import './App.css';


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
              <Route exact path="/" component={SignIn} />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/reset" component={Forgot} />
              <Route exact path="/res" component={ResponsiveDrawer} />
              <Route exact path="/cst" component={CustomerStats} />
              <Route exact path="/reports" component={Reports} />
              <Route exact path="/agentlist" component={AgentList} />
              <Route exact path="/trashUsers" component={TrashConsumerTable} />
              <Route exact path="/changepassword" component={ResetPassword} />
              <Route exact path="/customerDocs" component={ImageManagement} />

            </Switch>
          </Router>
        </ToastProvider>
      </div>
    </ThemeProvider>

  );
}

export default App;
