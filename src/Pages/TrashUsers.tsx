import * as React from 'react';
import { Button, Container, CssBaseline, TextField, } from "@material-ui/core";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import MaterialTable from 'material-table';
import CircularProgress from '@material-ui/core/CircularProgress';
import ResponsiveDrawer from "./Drawer";

export default function TrashConsumerTable() {

    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false)

    const columns = [
        { title: "Name", field: "name" },
        { title: "Main Aadhaar", field: "mainAadhaar" },
        { title: "Family Aadhaar", field: "familyAadhaar" },
        { title: "Mobile", field: "mobile" },
        { title: "Reg No", field: '' },
        { title: "Consumer No", field: '' },
        { title: "Main Agent", field: 'mainAgent' },
        { title: "Sub Agent", field: 'subAgent' },
        { title: "Remarks", field: 'remarks' },





    ]
    React.useEffect(() => {
        setLoading(true)
        fetch("https://jamanenterprise.herokuapp.com/customer/trashCustomer")
            .then(resp => resp.json())
            .then(resp => {
                setData(resp.data)
                setLoading(false)
            })
    }, [])

    return (
        <React.Fragment>
            <CssBaseline />
            <ResponsiveDrawer />
            <Container component="main" >
                {loading ? <div style={{ paddingTop: "30px", justifyContent: "center", alignItems: "center", textAlign: "center", width: "100%" }}><p>This may take couple of mins...</p> <CircularProgress /> </div> :
                    <MaterialTable
                        title="Jaman Hp Consumer Trash Consumer list"
                        data={data}
                        columns={columns}
                        options={{
                            exportButton: true,
                            exportAllData: true,
                            filtering: true,
                            sorting: true,
                            pageSizeOptions: [5, 20, 50, 100, 200, 500],
                            headerStyle: {
                                backgroundColor: '#039be5',
                                color: '#FFF'
                            }
                        }}
                    />
                }
            </Container>
        </React.Fragment>
    );
}




