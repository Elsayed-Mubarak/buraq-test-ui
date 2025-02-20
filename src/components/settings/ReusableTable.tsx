import { Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
interface Props {
    rows: any[];
    columns: GridColDef[];
    paginationModel?: any;
}
function ReusableTable({ rows, columns, paginationModel }: Props) {

    return (
        <Paper
            sx={{
                height: '500px',
                width: '100%',
                boxShadow: 0,
                border: '1px solid #E0E0E0',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
        >
            <div style={{ flexGrow: 1, }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pagination
                    paginationMode="client"
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    autoPageSize
                    sx={{
                        width: "100%",
                        border: 0,
                        '& .MuiDataGrid-columnSeparator': { display: 'none' },
                        '& .MuiDataGrid-cell': {
                            borderBottom: 'none',
                            padding: '4px 10px',
                            outline: 'none', // Ensures no default focus outline
                        },
                        '& .MuiDataGrid-cell:focus': {
                            outline: 'none', // Removes focus border when clicked
                        },
                        '& .MuiDataGrid-virtualScroller': { overflow: 'auto' },
                        minHeight: '100%',
                        overflow: 'auto'
                    }}
                />

            </div>
        </Paper>
    );
}
export default ReusableTable;