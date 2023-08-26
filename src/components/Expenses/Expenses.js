import React, {  useEffect } from 'react'
import AllExpense from './AllExpense/AllExpense'
import { useDispatch, useSelector } from 'react-redux'
import './Expense.css'
import { CSVLink } from "react-csv";
import { getExpenseData } from '../../store/slice/expense-slice'


const Expenses = ({ handleEdit }) => {

    const dispatch = useDispatch()
    const expense = useSelector(state => state.expenses.expenses)
    const userToken = useSelector(state => state.auth.userToken)


    const allExpenses = useSelector(state => state.expenses.expenses)

    let headers = [
        {
            label: 'Id', key: 'id'
        },
        {
            label: 'Amount', key: 'amount'
        },
        {
            label: 'Description', key: 'description'

        },
        {
            label: 'Category', key: 'category'

        },

    ]
    // const csvLink = {
    //     filename: 'expenses.csv',
    //     headers: headers,
    //     data: allExpenses
    // }

    useEffect(()=>{
        dispatch(getExpenseData())

    },[dispatch])

    return (
        <div className='expenses'>
            {
                userToken  ? (
                    expense.length != 0 ? <div>
                        <AllExpense handleEdit={handleEdit} />
                        {/* <CSVLink className='expensesDownload__link' {...csvLink}>Download expense csv</CSVLink>; */}
                    </div> : <h5 style={{ paddingLeft: '10px' }}>There is no expense yet!</h5>
                ) : (
                    <div>
                        <h5 style={{ marginLeft: '10px' }}>To use this application you need to login first!</h5>
                    </div>
                )
            }




        </div>
    )
}

export default Expenses