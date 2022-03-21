import React from 'react'
import MaterialTable from 'material-table';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CircularProgress from '@material-ui/core/CircularProgress';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

function RefilSalesTable(props:any) {


    console.log("dataAray",props.dataAray)

    const columns = [
        { title: "Name", field: "agent" },
        { title: "Load Paid 14KG", field: "loadPaid14" },
        { title: "Empty  Recived 14KG", field: "emptyCycliderRecived14" },
        { title: "Empty Due 14", field: "emptyDue14" },
        { title: "Rate 14KG ", field: "rate14" },

        { title: "Load Paid 19KG", field: "loadPaid19" },
        { title: "Empty  Recived 19KG", field: "emptyCycliderRecived19" },
        { title: "Empty Due 19", field: "emptyDue19" },
        { title: "Rate 19 KG", field: "rate19" },

        { title: "Load Paid 5KG DOM", field: "loadPaid5" },
        { title: "Empty  Recived 5KG DOM", field: "emptyRecived5" },
        { title: "Empty Due 5KG", field: "emptyDue14" },
        { title: "Rate 19 KG", field: "rate5" },
        { title: "Load Paid FTL 5KG", field: "loadPaid5ftl" },
        { title: "Empty  Recived FTL", field: "emptyCycliderRecived5ftl" },
        { title: "Empty Due 5KG", field: "emptyDue14" },
        { title: "Rate FTL 5KG", field: "rate5ftl" },
        { title: "Special Category", field: "spCategory" },
        { title: "Special Quantity ", field: "spRate" },
        { title: "Total Amount ", field: "totalAmount" },
        { title: "Total Amount Paid ", field: "totalAmountPaid" },
        { title: "Total Amount Due ", field: "totalAmountDue" },
        { title: "Remarks ", field: "remarks" },

    ]

    return (
        <div>
            <MaterialTable
                title="Jaman Hp Refil sales data"
                data={props.dataAray}
                columns={columns}
                options={{
                    exportButton: true,
                    exportAllData: true,
                    filtering: true,
                    sorting: true,
                    pageSizeOptions: [5, 20, 50, 100, 200, 500],
                    headerStyle: {
                        backgroundColor: '#01579b',
                        color: '#FFF'
                    }
                }}
            />
        </div>
    )
}

export default RefilSalesTable