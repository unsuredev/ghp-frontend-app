import * as React from 'react';
import { Button, Container, CssBaseline, TextField, } from "@material-ui/core";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import MaterialTable from 'material-table';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link, Grid } from '@material-ui/core';
import CsvDownloader from 'react-csv-downloader';
import jwt_decode from "jwt-decode";
import { BASE_URL } from "../Common/constant";

export default function FullConsumerTable() {

    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false)
    const [limit, setLimit]=React.useState(500)
    const columns = [
        { title: 'Sl No', field: 'tableData.id' },
        { title: "Old SlNo", field: "slNo" },
        { title: "Name", field: "name" },
        { title: "Main Aadhaar", field: "mainAadhaar" },
        { title: "Family Aadhaar", field: "familyAadhaar" },
        { title: "Mobile", field: "mobile" },
        { title: "Contact Number", field: "contactNumber" },
        { title: "File No", field: 'regNo' },
        { title: "Consumer No", field: 'consumerNo' },
        { title: "Main Agent", field: 'mainAgent' },
        { title: "Sub Agent", field: 'subAgent' },
        { title:'Registerd Agency Name', field:'registeredAgencyName'},
        { title: "Remarks", field: 'remarks' },
        {title:"Install Status", field:'installtatus'},
        {title:"Single Women", field:'isSingleWomen'},
        {title:"File No ", field:'fileNo'},
        {title:"Status", field:'registrationStatus'},
        {title:"Added By", field:'addedBY'},
        {title:"Updated By", field:'updatedBy'},

        

        

        
    ]



    const getToken = () => {
        //@ts-ignore
        return localStorage.getItem("access_token")
    }




    const fetcCustomerData = async() => {
        try {
            setLoading(true)
            const result = await axios.get(BASE_URL + "customer/getall", {
                headers: {
                    encryption: false,
                    access_token: getToken()
                },
            });
            if(result.data){
                setData(result.data.data)
                setLoading(false)
            }
        }
        catch (error) {
            console.log("error", error)
        }

    }





    React.useEffect(() => {
        fetcCustomerData()
    }, [])



    return (
        <React.Fragment>
            <CssBaseline />
            <Container component="main" >
                {loading ? <div style={{ paddingTop: "30px", justifyContent: "center", alignItems: "center", textAlign: "center", width: "100%" }}><p>This may take couple of mins...</p> <CircularProgress /> </div> :
                    <MaterialTable
                        title="Jaman Hp Consumer Data"
                        data={data}
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
                }
            </Container>
        </React.Fragment>
    );
}




