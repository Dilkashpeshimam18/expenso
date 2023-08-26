import React, { useEffect } from 'react'
import SingleExpense from '../SingleExpense/SingleExpense'
import { useSelector } from 'react-redux'
import Divider from '@mui/material/Divider';
import './AllExpense.css'
import { all } from 'axios';
let isIntial = true
const AllExpense = ({ handleEdit }) => {
    const allExpenses = useSelector(state => state.expenses.expenses)

    return (
        <div className='allExpenses'>
            {localStorage.getItem('email') == null && localStorage.getItem('token') == null ? (
                <div >
                    <SingleExpense id={1} amount={1200} desc='Fish' category='Food' handleEdit={handleEdit} />
                    <Divider />
                    <SingleExpense id={2} amount={500} desc='Top' category='Clothing' handleEdit={handleEdit} />
                    <Divider />
                </div>
            ) : (
                (allExpenses?.map((expense, index) => {
                    return <div key={index}>
                        <SingleExpense key={index} id={expense?._id} amount={expense?.amount} name={expense?.name} category={expense?.category} handleEdit={handleEdit} />
                        <Divider />
                    </div>
                }))
            )}






        </div >
    )
}

export default AllExpense