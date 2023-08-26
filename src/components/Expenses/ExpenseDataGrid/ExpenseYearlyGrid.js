import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, } from '@mui/x-data-grid';
import axios from 'axios';
import { useSelector } from 'react-redux';

const columns = [
  { field: '_id', headerName: 'ID', width: 90 },
  {
    field: 'month',
    headerName: 'Month',
    width: 150,
    editable: true,
  },
  {
    field: 'expense',
    headerName: 'Expense',
    type: 'number',
    width: 110,
    editable: true,
  },

];


export default function ExpenseYearlyGrid() {
  const [yearlyData, setYearlyData] = useState([])
  const theme = useSelector(state => state.theme.theme)

  const getRowId = (row) => row._id;

  const getYearlyExpense = async () => {
    try {
      const token = localStorage.getItem('token')

      let reqInstance = await axios.create({
        headers: {
          Authorization: token
        }
      })
      const response = await reqInstance.get('http://localhost:4000/expense/get-yearlyexpense')
      const data = response.data.data
      setYearlyData(data)
    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    getYearlyExpense()
  }, [])
  return (
    <>
      <h5 className={`${theme=='dark'?'gridDark__title':'gridLight__title'}`}>Yearly</h5>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={yearlyData}
          columns={columns}
          getRowId={getRowId}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}


          pageSizeOptions={[5, 10, 25, 50]}
          slots={{ toolbar: GridToolbar }}
          // hideFooter={true}
          sx={{
            width: '800px',
            padding: '5px',
            boxShadow: 2,
            borderColor: theme == 'dark' && '#2d383c',
            color: theme == 'dark' ? 'white' : 'black',
            backgroundColor: theme == 'dark' ? '#2d383c' : 'white'
          }}

        />
      </Box>
    </>

  );
}












































