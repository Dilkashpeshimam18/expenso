import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import { useSelector } from 'react-redux';

const columns = [
  { field: '_id', headerName: 'ID', width: 90 },

  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 110,
    editable: true,
  },

  {
    field: 'amount',
    headerName: 'Expense',
    width: 160,
    type: 'number'

  },
];


export default function ExpenseMonthlyGrid({ rowPerPage }) {
  const [page, setPage] = useState(1)
  const [pageExpense, setPageExpense] = useState([])
  const [lastPage, setLastPage] = useState(0)
  const theme = useSelector(state => state.theme.theme)

  const getRowId = (row) => row._id;

  const handlePageChanged = async (event, value) => {
    try {
      let pageNumber;
      if (value == undefined) {
        pageNumber = 1
        setPage(pageNumber)

      } else {
        pageNumber = value
        setPage(pageNumber)

      }

      const token = localStorage.getItem('token')

      let reqInstance = await axios.create({
        headers: {
          Authorization: token
        }
      })

      const res = await reqInstance.get(`http://localhost:4000/expense/get-monthlyexpenses?page=${pageNumber}&rowPerPage=${rowPerPage}`)
      setPageExpense(res.data.expense)
      setLastPage(res.data.lastPage)
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    handlePageChanged()

  }, [rowPerPage])


  return (
    <>
      <h5 className={`${theme=='dark'?'gridDark__title':'gridLight__title'}`}>Monthly</h5>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={pageExpense}
          columns={columns}
          getRowId={getRowId}
          // slots={{ toolbar: GridToolbar }}
          hideFooter={true}
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
      <div style={{ display: 'flex', alignItems: 'center', marginTop: "20px", justifyContent: 'center' }}>
        <Pagination count={lastPage} page={page} onChange={handlePageChanged} variant="outlined"
        color={theme=='dark'?'primary':'primary'}
      />

      </div>

    </>

  );
}