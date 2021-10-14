import * as React from 'react';
import { Button, Container, CssBaseline, TextField, } from "@material-ui/core";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import MaterialTable from 'material-table';
import CircularProgress from '@material-ui/core/CircularProgress';
import ResponsiveDrawer from "./Drawer";
import { BASE_URL } from "../Common/constant";

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
        const getToken = () => {
            //@ts-ignore
            return localStorage.getItem("access_token")
        }
    
    
    
    
    const fetchTrashData = async () => {
        try {
            setLoading(true)
            const result = await axios.get(BASE_URL + "customer/trashCustomer", {
                headers: {
                    encryption: false,
                    access_token: getToken()
                },
            });
            if (result.data) {
                setData(result.data.data)
                setLoading(false)

            }
        }
        catch (error) {
            console.log("error", error)
        }
    }




    React.useEffect(() => {
        fetchTrashData()
    }, [])









    return (
        <React.Fragment>
            <CssBaseline />
            <ResponsiveDrawer />
            <Container component="main" >
                {loading ? <div style={{ paddingTop: "30px", justifyContent: "center", alignItems: "center", textAlign: "center", width: "100%" }}><p>This may take couple of mins...</p> <CircularProgress /> </div> :
                    <MaterialTable
                        title="Jaman Hp Gas Trash Consumer list"
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




