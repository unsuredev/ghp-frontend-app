import * as React from 'react';
import { Button, Container, CssBaseline, TextField, } from "@material-ui/core";
import axios from "axios";
import MaterialTable from 'material-table';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BASE_URL } from "../Common/constant";

export default function ConnectionFullTable() {

    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false)
    const [limit, setLimit]=React.useState(500)

    const columns = [
        { title: 'AGENT', field: 'agent' },
        { title: "TOTAL CONNECTION ", field: "totalConnection" },
        { title: "LOAD PAID", field: "load" },
        { title: "REGULATOR PAID", field: "regulator" },
        { title: "PIPE PAID", field: "pipe" },
        { title: "LIGHT PAID", field: "paidLight" },
        { title: "BPL OVEN", field: "bplOven" },
        { title: "NON HP OVEN", field: "nonHpOven" },
        { title: "HP OVEN", field: "hpOven" },
        { title: "PAID AMOUNT ", field: "paidAmount" },
        { title: "AMOUNT DUE ", field: "amountDue" },
        { title: "INSTALLATION COMPLETE ", field: "installationComplete" },
        { title: "INSTALLATION PENDING ", field: "installationPending" },
        { title: "TOTAL REGISTRATION ", field: "totalRegistration" },
        { title: "REMARKS ", field: "remarks" },

        {
            title: "DATE ", field: "updatedAt", type: "date",
            dateSetting: { locale: "ko-KR" }
        }
    ]



    const getToken = () => {
        //@ts-ignore
        return localStorage.getItem("access_token")
    }




    const fetchAllConnection = async() => {
        try {
            setLoading(true)
            const result = await axios.get(BASE_URL + "agent/slaes/all", {
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
        fetchAllConnection()
    }, [])


    return (
        <React.Fragment>
            <CssBaseline />

            <Container component="main" >
                {loading ? <div style={{ paddingTop: "30px", justifyContent: "center", alignItems: "center", textAlign: "center", width: "100%" }}><p>This may take couple of mins...</p> <CircularProgress /> </div> :
                    <MaterialTable
                        title="ALL agents NC Delivery "
                        data={data}
                        //@ts-ignore
                        columns={columns}
                        options={{
                            exportButton: true,
                            exportAllData: true,
                            filtering: true,
                            sorting: true,
                            pageSizeOptions: [5, 20, 50, 100, 200, 500],
                            headerStyle: {
                                backgroundColor: '#8bc34a',
                                color: '#FFF'
                            }
                        }}

                    />
                }

            </Container>
        </React.Fragment>
    );
}




