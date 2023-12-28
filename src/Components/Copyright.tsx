import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';




const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {" © "}
      {new Date().getFullYear()} &nbsp;
      <a href="https://wa.me/8926515635" target="_blank" rel="noreferrer">
        Jaman Enterprise &nbsp;
      </a>
      {"."}
      <p style={{ fontFamily: "Pacifico" }}>
        {" "}
        Designed and developed by &nbsp;
        <a href="https://www.facebook.com/unsuredev" target="_blank" rel="noreferrer">
          {" "}
          Jamal
        </a>
      </p>
    </Typography>
  );
}

export default Copyright;