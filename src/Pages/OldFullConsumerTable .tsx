import * as React from 'react';
import { Button, Container, CssBaseline, TextField, } from "@material-ui/core";
import axios from "axios";
import MaterialTable from 'material-table';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BASE_URL } from "../Common/constant";

export default function OldFullConsumerTable() {

    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false)
    const [limit, setLimit]=React.useState(500)
    const columns = [
        { title: 'Sl No', field: 'tableData.id' },
        { title: "Name", field: "name" },
        { title: "Main Aadhaar", field: "mainAadhaar" },
        { title: "Mobile", field: "mobile" },
        { title: "Reg No", field: 'regNo' },
        { title: "Consumer No", field: 'consumerNo' },
        { title: "Main Agent", field: 'mainAgent' },
        { title: "Old Agent", field: 'oldAgentName' },
        {title:"Registered Agency Name", field:'registeredAgencyName'},
        { title: "Sub Agent", field: 'subAgent' },
        { title: "Remarks", field: 'remarks' },
        {title:"Installation status", field:'installtatus'},
        {title:"Year", field:'year'}

    ]


    const column = [
        { displayName: 'Sl No', id: 'tableData.id' },
        { displayName: "Name", id: "name" },
        { displayName: "Main Aadhaar", id: "mainAadhaar" },
        { displayName: "Mobile", id: "mobile" },
        { displayName: "Reg No", id: '' },
        { displayName: "Consumer No", id: '' },
        { displayName: "Main Agent", id: 'mainAgent' },
        { displayName: "Old Agent", id: 'oldAgentName' },
        { displayName:"Registered Agency Name", id:'registeredAgencyName'},
        { displayName: "Sub Agent", id: 'subAgent' },
        { displayName: "Remarks", id: 'remarks' },
        {displayName:"Install status", id:'installtatus'},
        {displayName:"Year", id:'year'}
        

    ];


    const getToken = () => {
        //@ts-ignore
        return localStorage.getItem("access_token")
    }




    const fetcCustomerData = async() => {
        try {
            setLoading(true)
            const result = await axios.get(BASE_URL + "old/customer/getall", {
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
                        title="Jaman Hp Consumer Data before 2021"
                        data={data}
                        columns={columns}
                        options={{
                            exportButton: true,
                            exportAllData: true,
                            filtering: true,
                            sorting: true,
                            pageSizeOptions: [5, 20, 50, 100, 200, 500],
                            headerStyle: {
                                backgroundColor: '#F42870',
                                color: '#FFF'
                            }
                        }}

                    />
                }

            </Container>
        </React.Fragment>
    );
}




