import { useState, useMemo, useCallback } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Button, Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import DownloadIcon from '@mui/icons-material/Download';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

// Define row data type
interface RowData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  status: string;
}

// Styled container for the grid
const GridContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  width: '100%',
  height: 400,
  '& .MuiDataGrid-root': {
    border: 'none',
    fontSize: '0.875rem',
    '& .MuiDataGrid-cell': {
      padding: theme.spacing(1),
    },
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: theme.palette.grey[100],
      fontWeight: 'bold',
    },
    '& .MuiDataGrid-row:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

export default function MUIDataGridDemo() {
  // Sample data
  const rowData = useMemo<RowData[]>(() => [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', age: 28, status: 'Active' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', age: 32, status: 'Inactive' },
    { id: 3, firstName: 'Bob', lastName: 'Johnson', email: 'bob.johnson@example.com', age: 45, status: 'Active' },
    { id: 4, firstName: 'Sara', lastName: 'Williams', email: 'sara.williams@example.com', age: 29, status: 'Active' },
    { id: 5, firstName: 'Michael', lastName: 'Brown', email: 'michael.brown@example.com', age: 37, status: 'Inactive' },
    { id: 6, firstName: 'Emily', lastName: 'Davis', email: 'emily.davis@example.com', age: 31, status: 'Active' },
    { id: 7, firstName: 'Daniel', lastName: 'Miller', email: 'daniel.miller@example.com', age: 41, status: 'Active' },
    { id: 8, firstName: 'Olivia', lastName: 'Wilson', email: 'olivia.wilson@example.com', age: 26, status: 'Inactive' },
  ], []);

  // Column definitions
  const columns = useMemo<GridColDef[]>(() => [
    { field: 'id', headerName: 'ID', width: 90, sortable: true, filterable: true },
    {
      field: 'firstName',
      headerName: 'First Name',
      flex: 1,
      sortable: true,
      filterable: true,
      editable: true,
      minWidth: 120,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      flex: 1,
      sortable: true,
      filterable: true,
      editable: true,
      minWidth: 120,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1.5,
      sortable: true,
      filterable: true,
      editable: true,
      minWidth: 200,
    },
    {
      field: 'age',
      headerName: 'Age',
      width: 100,
      sortable: true,
      filterable: true,
      editable: true,
      type: 'number',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      sortable: true,
      filterable: true,
      editable: true,
    },
  ], []);

  // State for row selection with explicit typing
  const [rowSelectionModel, setRowSelectionModel] = useState<number[]>([]);

  // Handle CSV export
const handleExportCSV = useCallback(() => {
  const selectedRows = rowSelectionModel.length
    ? rowData.filter((row) => rowSelectionModel.includes(row.id))
    : rowData;
    
  const headers = columns.map((col) => col.headerName).join(',');
  const csvRows = selectedRows.map((row) =>
    columns.map((col) => {
      const field = col.field as keyof RowData; // Type-safe key
      return `"${row[field]}"`;
    }).join(',')
  );
  
  const csvContent = [headers, ...csvRows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'data-grid-export.csv');
  link.click();
  URL.revokeObjectURL(url);
}, [rowSelectionModel, rowData, columns]);


  // Handle clear filters
  const handleClearFilters = useCallback(() => {
    // Free version lacks direct filter reset; reload as workaround
    window.location.reload();
  }, []);

  return (
    <Box sx={{ p: 4, maxWidth: 'lg', mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
        MUI Data Grid Example
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handleExportCSV}
          sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
        >
          Export to CSV
        </Button>
        <Button
          variant="outlined"
          startIcon={<FilterAltOffIcon />}
          onClick={handleClearFilters}
          sx={{ color: 'text.secondary', borderColor: 'text.secondary', '&:hover': { bgcolor: 'action.hover' } }}
        >
          Clear Filters
        </Button>
      </Box>

      <GridContainer>
        <DataGrid
          rows={rowData}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          checkboxSelection
          onRowSelectionModelChange={(newSelection) => setRowSelectionModel(newSelection as unknown as number[])}
          rowSelectionModel={rowSelectionModel}
          disableRowSelectionOnClick
          pagination
          autoHeight={false}
          sx={{ height: '100%' }}
        />
      </GridContainer>

      <Paper sx={{ mt: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 2 }}>
          Features Demonstrated:
        </Typography>
        <List sx={{ pl: 2 }}>
          {[
            'Row selection with checkboxes',
            'Column sorting and filtering',
            'Pagination with customizable page sizes',
            'CSV export of selected or all rows',
            'In-cell editing',
            'Responsive column sizing with flex',
            'Modern and appealing UI with MUI styling',
          ].map((feature) => (
            <ListItem key={feature} disablePadding>
              <ListItemText primary={feature} sx={{ pl: 1 }} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}