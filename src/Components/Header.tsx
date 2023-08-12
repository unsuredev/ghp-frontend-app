import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from "react-router-dom";
import { BASE_URL } from "../Common/constant";
import axios from "axios";
import { ToastContext } from "../Common/ToastProvider";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

const Header = () => {
  const classes = useStyles();
  let history = useHistory();
  const [today, setDate] = React.useState(new Date());
  const { showToast } = React.useContext(ToastContext);

  const hour = today.getHours();
  const wish = `Good ${(hour < 12 && 'Morning') || (hour < 17 && 'Afternoon') || 'Evening'}, `;
  const userGreetings = () => {
    return (
      <div>
        <h2>
          {wish}</h2>
      </div>
    )
  }



  const getToken = () => {
    //@ts-ignore
    return localStorage.getItem("access_token")
  }

  const handleLogout = async () => {
    try {
      const result = await axios.post(BASE_URL + "user/logout",
        {},
        {
          headers: {
            encryption: false,
            token: getToken()
          }
        })
      if (result.data && result.data != null) {
        showToast(result.data.message, "success");
        localStorage.clear();
        history.push("/");
      }
      else {
        showToast(result.data.message, "error");
      }
    } catch (error) {
      console.log(error)
      showToast("Something went wrong!", "error");
    }
  };




  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        {/* <img
                            src={require("../../src/hpcl_logo.png").default}
                            alt="smitch logo"
                            width="40"
                            height="40"
                        /> */}
        {/* <Button size="large">Jaman HP GAS</Button> */}
        <Typography
          variant="subtitle1" gutterBottom
          color="primary"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >

        </Typography>
        <IconButton onClick={handleLogout} >
          <ExitToAppIcon />
        </IconButton>

      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>

      </Toolbar>
    </React.Fragment>
  );
}


export default Header