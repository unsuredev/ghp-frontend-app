import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Copyright from "./Copyright";
import { BASE_URL } from "../Common/constant";
import axios from "axios";
import MaterialTable from 'material-table';
import { getToken, getUserName } from '../Common/helper';



export default function FingerPrint() {
    const [allcustomer, setAllCustomer] = React.useState([]);

    React.useEffect(() => {
        document.title = "Pending Fingerprint List | JAMAN HP GAS  "
        fetchAllPendingFingerprint()
    }, []);



    const fetchAllPendingFingerprint = async () => {
        try {
            const result = await axios.post(BASE_URL + "agent/fingerprint", { findKey: "pending", mainAgent: getUserName() },
                {
                    headers: {
                        encryption: false,
                        token: getToken()
                    },
                });
            if (result.data) {
                setAllCustomer(result.data.data)
            }
        }
        catch (error) {
            console.error(error);
        }
    }



    const columns = [
        { title: 'Sl No', field: 'tableData.id' },
        { title: "Name", field: "name" },
        { title: "Main Aadhaar", field: "mainAadhaar" },
        { title: "Family Aadhaar", field: "familyAadhaar" },
        { title: "Mobile", field: "mobile" },
        { title: "Contact Number", field: "contactNumber" },
        { title: "Registered Agency Name", field: 'registeredAgencyName' },
        { title: "Sub Agent", field: 'subAgent' },
        { title: "Remarks", field: 'remarks' },
    ]

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                <Container component="main" style={{ marginTop: "3rem", paddingTop: "2rem" }}>
                    <MaterialTable
                        title="Your ALL  PENDING FINGER PRINT  LIST JAMAN HP GAS"
                        data={allcustomer}
                        columns={columns}
                        options={{
                            exportButton: true,
                            exportAllData: true,
                            filtering: true,
                            sorting: true,
                            pageSizeOptions: [20, 50, 100, 200, 500],
                            headerStyle: {
                                backgroundColor: '#F42870',
                                color: '#FFF'
                            }
                        }}
                    />
                </Container>
            </main>
            <br></br>
            <Copyright />
        </React.Fragment>
    );
}
