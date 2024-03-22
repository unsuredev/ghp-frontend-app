import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Copyright from "./Copyright";
import { BASE_URL } from "../Common/constant";
import axios from "axios";
import MaterialTable from 'material-table';



export default function FingerComplete(props: any) {

    const { swasthiSathi } = props
    const columns = [
        { title: 'Sl No', field: 'tableData.id' },
        { title: "Name", field: "name" },
        { title: "Main Aadhaar", field: "mainAadhaar" },
        { title: "Family Aadhaar", field: "familyAadhaar" },
        { title: "Registration Status", field: 'registrationStatus' },
        { title: "Mobile", field: "mobile" },
        { title: "Contact Number", field: "contactNumber" },
        { title: "Registered Agency Name", field: 'registeredAgencyName' },
        { title: "Agent", field: 'mainAgent' },
        { title: "Remarks", field: 'remarks' },
    ]

    return (
        <React.Fragment>
            <main>
                {swasthiSathi.length > 0 &&
                    <Container component="main" style={{ marginTop: "3rem", paddingTop: "2rem" }}>
                        <MaterialTable
                            title="JAMAN HP GAS"
                            data={swasthiSathi}
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
                    </Container>}
            </main>

        </React.Fragment>
    );
}
