import * as React from 'react';
import { Container, CssBaseline, Button } from "@material-ui/core";
import axios from "axios";
import MaterialTable from 'material-table';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BASE_URL } from "../Common/constant";
import { getToken } from '../Common/helper';

const FullConsumerTable = () => {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 1000;
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
        { title: 'Registerd Agency Name', field: 'registeredAgencyName' },
        { title: "Remarks", field: 'remarks' },
        { title: "Install Status", field: 'installtatus' },
        { title: "Single Women", field: 'isSingleWomen' },
        { title: "Status", field: 'registrationStatus' },
        { title: "Added By", field: 'addedBY' },
        { title: "Updated By", field: 'updatedBy' },
        {
            title: "DATE ", field: "updatedAt", type: "date",
            dateSetting: { locale: "ko-KR" }
        },

    ]
    const fetchCustomerData = async () => {
        try {
            setLoading(true);

            const result = await axios.get(BASE_URL + `customer/getall?page=${page}&limit=${rowsPerPage}`, {
                headers: {
                    encryption: false,
                    token: getToken()
                },
            });

            if (result.data && result.data.data) {
                // Concatenate new data to existing data
                //@ts-ignore
                setData((prevData: any[]) => [...prevData, ...result.data.data]);

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
                    <React.Fragment >
                        <MaterialTable
                            title="Jaman Hp Consumer Data"
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
                                    backgroundColor: '#01579b',
                                    color: '#FFF'
                                }
                            }}
                        />
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>

                            <Button color='secondary' variant="contained" onClick={handleLoadMore}>Load More 1000 records</Button>
                        </div>

                    </React.Fragment>
                )}
            </Container>
        </React.Fragment>
    );
}


export default FullConsumerTable;