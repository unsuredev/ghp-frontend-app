import * as React from 'react';
import { Button, Container, CssBaseline, TextField, } from "@material-ui/core";
import axios from "axios";
import MaterialTable from 'material-table';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BASE_URL } from "../Common/constant";
import { getToken } from '../Common/helper';

export default function OldFullConsumerTable() {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 1000

    const columns = [
        { title: 'Sl No', field: 'tableData.id' },
        { title: "Name", field: "name" },
        { title: "Main Aadhaar", field: "mainAadhaar" },
        { title: "Mobile", field: "mobile" },
        { title: "Reg No", field: 'regNo' },
        { title: "Consumer No", field: 'consumerNo' },
        { title: "Main Agent", field: 'mainAgent' },
        { title: "Old Agent", field: 'oldAgentName' },
        { title: "Registered Agency Name", field: 'registeredAgencyName' },
        { title: "Sub Agent", field: 'subAgent' },
        { title: "Remarks", field: 'remarks' },
        { title: "Installation status", field: 'installtatus' },
        { title: "Year", field: 'year' }
    ]


    const fetchCustomerData = async () => {
        try {
            setLoading(true);

            const result = await axios.get(BASE_URL + `old/customer/getall?page=${page}&limit=${rowsPerPage}`, {
                headers: {
                    encryption: false,
                    token: getToken()
                },
            });

            if (result.data && result.data.data !== null) {
                // Concatenate new data to existing data
                //@ts-ignore
                setData(prevData => [...prevData, ...result.data.data]);

                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    const handleLoadMore = () => {
        // Increment the page number and fetch more data
        setPage(prevPage => prevPage + 1);
    };

    React.useEffect(() => {
        // Fetch data when the component mounts
        fetchCustomerData();
    }, [page]);

    return (
        <React.Fragment>
            <CssBaseline />
            <Container component="main" >
                {loading ? (
                    <div style={{ paddingTop: "30px", justifyContent: "center", alignItems: "center", textAlign: "center", width: "100%" }}>
                        <p>This may take a moment...</p> <CircularProgress />
                    </div>
                ) : (
                    <React.Fragment>
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

                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <Button onClick={handleLoadMore} variant="contained" color="primary">
                                Load More 1000 records
                            </Button>
                        </div>

                    </React.Fragment>
                )}
            </Container>
        </React.Fragment>
    );
}
