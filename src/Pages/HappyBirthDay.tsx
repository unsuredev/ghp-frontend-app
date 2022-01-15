import React from 'react'
import '../style/happBirthDay.css'
import {
    Button,
    Grid,
    makeStyles,
    CssBaseline,Container,
    TextField, Typography
  } from "@material-ui/core";
function HappyBirthDay() {
    return (
        <React.Fragment>
 
            <div className="BirthDaycard">
                    <div className="text">
                        <h1 style={{color:"#fff900", marginTop:"20rem"}}>Happy Birthday <span >Jaman!</span></h1>
                        {/* <p>I hope you have a wonderful birthday</p> */}
                        {/* <p className="muted">- Jonah Lawrence</p> */}
                    </div>
                    <div className="space"></div>

            </div>


        </React.Fragment>
    )
}

export default HappyBirthDay
