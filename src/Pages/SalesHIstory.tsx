import * as React from 'react';
import {  Container, CssBaseline, TextField, } from "@material-ui/core";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import MaterialTable from 'material-table';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link, Grid } from '@material-ui/core';
import { BASE_URL } from "../Common/constant";

export default function Saleshistory() {

    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false)
    const [limit, setLimit]=React.useState(500)






    const getToken = () => {
        //@ts-ignore
        return localStorage.getItem("access_token")
    }












    React.useEffect(() => {
    }, [])



    return (
        <React.Fragment>
            <CssBaseline />
   
          
        </React.Fragment>
    );
}




