import React, { useState } from 'react'
import './HomeRight.css'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Expenses from '../../Expenses/Expenses';
import Divider from '@mui/material/Divider';
import HomeRightBottom from './HomeRightBottom/HomeRightBottom';
import ExpenseModal from '../../Expenses/ExpenseModal/ExpenseModal';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../../../store/slice/modal-slice';
import { expenseActions } from '../../../store/slice/expense-slice';

const HomeRight = () => {
    const [amount, setAmount] = useState(0)
    const [desc, setDesc] = useState('')
    const getInitialState = () => {
        const value = "Food";
        return value;
    };
    const [category, setCategory] = useState(getInitialState)
    const dispatch = useDispatch()
    const expense = useSelector(state => state.expenses.expenses)


    const handleCategory = (e) => {
        setCategory(e.target.value);
    };

    const handleEdit = (id) => {
        dispatch(modalActions.handleIsEdit())
        dispatch(modalActions.handleisNotNew())
        dispatch(modalActions.handleClickOpen())
        let editExp = expense.filter((expense) => {
            return expense._id == id
        })
        let ID = id
        dispatch(expenseActions.editExpense(ID))
        setAmount(editExp[0].amount)
        setCategory(editExp[0].category)
        setDesc(editExp[0].name)

    }
    return (
        <div className='homeRight'>
            <div className='homeRight__container'>
                <div className='homeRight__container1'>
                    <CalendarMonthIcon /> <h4>Your Transaction History</h4>
                </div>
                <Divider />
                <div className='homeRight__container2'>
                    <Expenses handleEdit={handleEdit} />

                </div>
                <Divider />
                <div className='homeRight__container3'>
                    <HomeRightBottom />
                    <ExpenseModal amount={amount} desc={desc} category={category} setAmount={setAmount} setCategory={setCategory} setDesc={setDesc} handleCategory={handleCategory} getInitialState={getInitialState} />
                </div>
            </div>
        </div>
    )
}

export default HomeRight