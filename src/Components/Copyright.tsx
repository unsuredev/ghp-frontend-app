import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';




const  Copyright = ()=> {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        JAMAN HP GAS
        {new Date().getFullYear()}
        {'.'}
        <p style={{fontFamily:"Pacifico"}}>  Designed and developed by    
        <a href="https://www.facebook.com/unsuredev" target="_blank" >Jamal</a></p>
     
      </Typography>
    );
  }

  export default Copyright ;