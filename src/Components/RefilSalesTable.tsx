import React from 'react'
import MaterialTable from 'material-table';


function RefilSalesTable(props:any) {

    const columns = [
        { title: "Name", field: "agent" },
        { title: "Load Paid 14KG", field: "loadPaid14" },
        { title: "Empty  Recived 14KG", field: "emptyCycliderRecived14" },
        { title: "Empty Due 14", field: "emptyDue14" },
        { title: "Rate 14KG ", field: "rate14" },

        { title: "Load Paid 19KG", field: "loadPaid19" },
        { title: "Empty  Recived 19KG", field: "emptyCycliderRecived19" },
        { title: "Empty Due 19", field: "emptyDue19" },
        { title: "Rate 19 KG", field: "rate19" },
        { title: "Load Paid 5KG DOM", field: "loadPaid5" },
        { title: "Empty  Recived 5KG DOM", field: "emptyRecived5" },
        { title: "Empty Due 5KG", field: "emptyDue14" },
        { title: "Rate 19 KG", field: "rate5" },
        { title: "Load Paid FTL 5KG", field: "loadPaid5ftl" },
        { title: "Empty  Recived FTL", field: "emptyCycliderRecived5ftl" },
        { title: "Empty Due 5KG", field: "emptyDue14" },
        { title: "Rate FTL 5KG", field: "rate5ftl" },
        { title: "Special Category", field: "spCategory" },
        { title: "Special Quantity ", field: "spRate" },
        { title: "Total Amount ", field: "totalAmount" },
        { title: "Total Amount Paid ", field: "totalAmountPaid" },
        { title: "Total Amount Due ", field: "totalAmountDue" },
        { title: "Remarks ", field: "remarks" },

    ]

    return (
        <div>
            <MaterialTable
                title="JAMAN HP REFIL SALES"
                data={props.dataAray}
                columns={columns}
                options={{
                    exportButton: true,
                    exportAllData: true,
                    filtering: true,
                    sorting: true,
                    pageSizeOptions: [5, 20, 50, 100, 200, 500],
                    headerStyle: {
                        backgroundColor: '#009688',
                        color: '#FFF'
                    }
                }}
            />
        </div>
    )
}

export default RefilSalesTable