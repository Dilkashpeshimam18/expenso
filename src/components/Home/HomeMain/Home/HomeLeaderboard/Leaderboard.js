import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';

const Leaderboard = () => {
    const [leaderBoardData, setLeaderBoardData] = useState([])
    const theme = useSelector(state => state.theme.theme)

    const fetchLeaderboard = async () => {
        try {
            const token = localStorage.getItem('token')

            let reqInstance = await axios.create({
                headers: {
                    Authorization: token
                }
            })
            const data = await reqInstance.get('http://localhost:4000/premium/show-leaderboard')
            setLeaderBoardData(data.data.data)

        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchLeaderboard()

    }, [])
    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
        },
        {
            field: 'total_expense',
            headerName: 'Total Expense',
            width: 110,
            editable: true,
        },
    ];
   

    const getRowId = (row) => row._id;

    return (
        <div>
            <h5 className={`${theme == 'dark' ? 'gridDark__title' : 'gridLight__title'}`}>Leaderboard</h5>

            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={leaderBoardData}
                    columns={columns}
                    getRowId={getRowId}
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
        </div>
    )
}

export default Leaderboard