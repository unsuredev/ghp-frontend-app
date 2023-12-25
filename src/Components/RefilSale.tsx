import { Container, CssBaseline } from '@material-ui/core'
import React from 'react'
import ResponsiveDrawer from './Drawer'
import { Grid, TextField, makeStyles, Paper } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FileUpload from '../Components/FileUpload';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const RefilSale = () => {

    const classes = useStyles();
    const data = [
        {
            employeeId: '01',
            name: 'John Doe',
            email: 'johndoe@email.com',
            position: 'Frontend Developer',
        },
        {
            employeeId: '02',
            name: 'Kala',
            email: 'kala@email.com',
            position: 'HR Executive',
        },
        {
            employeeId: '03',
            name: 'Mike',
            email: 'mike@email.com',
            position: 'Backend Developer',
        },
    ]


    const [employeeData, setEmployeeData] = React.useState(data)
    const onChange = (e: any, employeeId: string) => {
        const { name, value } = e.target
        const editData = employeeData.map((item) =>
            item.employeeId === employeeId && name ? { ...item, [name]: value } : item
        )
        setEmployeeData(editData)
    }


    return (
        <React.Fragment>
            <CssBaseline />
            <Container component="main" maxWidth="lg">
                <FileUpload />
                <Grid >
                    <Grid item xs={12} >
                    </Grid>
                    <Grid item xs={12} md={12} sm={12}>
                        <div className="container">
                            <h1 className="title">Daily Refil Update</h1>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Agent Name</TableCell>
                                            <TableCell >Refil QTY</TableCell>
                                            <TableCell >Rate</TableCell>
                                            <TableCell >Total Amount</TableCell>
                                            <TableCell >Paid Amount</TableCell>
                                            <TableCell >Due Amount</TableCell>
                                            <TableCell >Fare</TableCell>
                                            <TableCell >Collected Amount</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {employeeData.map(({ employeeId, name, email, position }) => (
                                            <TableRow key={employeeId}>
                                                <TableCell >
                                                    <TextField value={name} variant='outlined' onChange={(e) => onChange(e, employeeId)}
                                                        placeholder="Name" id="standard-basic" label="Name" />

                                                </TableCell>
                                                <TableCell >
                                                    <TextField value={name} variant='outlined' onChange={(e) => onChange(e, employeeId)}
                                                        placeholder="Name" id="standard-basic" label="Name" />

                                                </TableCell>
                                                <TableCell >
                                                    <TextField value={name} variant='outlined' onChange={(e) => onChange(e, employeeId)}
                                                        placeholder="Name" id="standard-basic" label="Name" />
                                                </TableCell>
                                                <TableCell >
                                                    <TextField value={name} variant='outlined' onChange={(e) => onChange(e, employeeId)}
                                                        placeholder="Name" id="standard-basic" label="Name" />
                                                </TableCell>
                                                <TableCell >
                                                    <TextField value={name} variant='outlined' onChange={(e) => onChange(e, employeeId)}
                                                        placeholder="Name" id="standard-basic" label="Name" />
                                                </TableCell>
                                                <TableCell >
                                                    <TextField value={name} variant='outlined' onChange={(e) => onChange(e, employeeId)}
                                                        placeholder="Name" id="standard-basic" label="Name" />
                                                </TableCell>
                                                <TableCell >
                                                    <TextField value={name} variant='outlined' onChange={(e) => onChange(e, employeeId)}
                                                        placeholder="Name" id="standard-basic" label="Name" />
                                                </TableCell>
                                                <TableCell >
                                                    <TextField value={name} variant='outlined' onChange={(e) => onChange(e, employeeId)}
                                                        placeholder="Name" id="standard-basic" label="Name" />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default RefilSale









