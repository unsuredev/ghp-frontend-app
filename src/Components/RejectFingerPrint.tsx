import React from 'react';

import { Container, Grid } from '@material-ui/core';
import { BASE_URL } from "../Common/constant";
import axios from "axios";
import MaterialTable from 'material-table';
import { getToken, getUserName } from '../Common/helper';


export default function RejectFingerPrint() {
    const [allcustomer, setAllCustomer] = React.useState([]);

    React.useEffect(() => {
        document.title = "Fingerprint List | JAMAN HP GAS  "
        fetchAllRejectFingerprint()
    }, []);


    const fetchAllRejectFingerprint = async () => {
        try {
            const result = await axios.post(BASE_URL + "agent/fingerprint", { findKey: "reject", mainAgent: getUserName() },
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
        { title: "Registration Status", field: 'registrationStatus' },
        { title: "Sub Agent", field: 'subAgent' },
        { title: "Remarks", field: 'remarks' },
    ]

    return (
        <React.Fragment>
            <Container component="main" style={{ marginTop: "3rem", paddingTop: "2rem", justifyContent: "center", textAlign: "center" }}>
                <Grid container >
                    <Grid sm={12} md={12} xs={12}>
                        <MaterialTable
                            title="REJECT FINGER PRINT LIST: JAMAN HP GAS"
                            data={allcustomer}
                            columns={columns}
                            options={{
                                exportButton: true,
                                exportAllData: true,
                                filtering: true,
                                sorting: true,
                                pageSizeOptions: [20, 50, 100, 200, 500],
                                headerStyle: {
                                    backgroundColor: '#004e8d',
                                    color: '#FFF'
                                }
                            }}
                        />
                    </Grid>
                </Grid>

            </Container>
        </React.Fragment>
    );
}
