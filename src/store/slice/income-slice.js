import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialIncomeState = {
    userIncome: localStorage.getItem('userIncome') || 0,
    userExpenses: localStorage.getItem('userExpenses') || 0,
    userBalance: localStorage.getItem('userBalance') || 0
}

const IncomeSlice = createSlice({
    name: 'income',
    initialState: initialIncomeState,
    reducers: {
        handlAddDetails(state, action) {
            state.userIncome = action.payload.total_income
            state.userExpenses = action.payload.total_expense
            state.userBalance = action.payload.remaining_balance
        }
    }
})


export const addIncome = (income) => {
    return async (state) => {
        const addInc = async () => {

            const token = localStorage.getItem('token')

            let reqInstance = await axios.create({
                headers: {
                    Authorization: token
                }
            })

            const data = {
                income: income
            }

            let response = await reqInstance.post('http://localhost:4000/income/add-income', data)
        }
        try {
            await addInc().then(() => {
                getUserIncome()
                alert('Added income!')

            })
        } catch (err) {
            console.log(err)
        }

    }
}

export const getUserIncome = () => {
    return async (state, dispatch) => {
        const getIncome = async () => {
            const token = localStorage.getItem('token')

            let reqInstance = await axios.create({
                headers: {
                    Authorization: token
                }
            })

            let response = await reqInstance.get('http://localhost:4000/user/get-userDetail')
            let data = response.data.data
            const details = {
                total_income: data.total_income,
                total_expense: data.total_expense,
                remaining_balance: data.remaining_balance
            }

            dispatch(incomeAction.handlAddDetails(details))
            localStorage.setItem('userIncome', data.total_income)
            localStorage.setItem('userExpenses', data.total_expense)
            localStorage.setItem('userBalance', data.remaining_balance)

        }

        try {
            await getIncome()

        } catch (err) {
            console.log(err)
        }
    }
}


export const updateUserIncome = (data) => {
    return async (dispatch) => {
        const updateIncome = async () => {
            const token = localStorage.getItem('token')

            let reqInstance = await axios.create({
                headers: {
                    Authorization: token
                }
            })

            console.log(data)
            const newIncome = {
                income: data
            }

            const response = await reqInstance.post('http://localhost:4000/income/edit-income', newIncome)


            localStorage.setItem('userIncome', JSON.stringify(Number(data)))

            // dispatch(expenseActions.handleAddIncome(data))
        }

        try {
            await updateIncome().then(() => {
                getUserIncome()
                alert('Updated income!')
            })

        } catch (err) {
            console.log(err)
        }
    }
}

export const incomeAction = IncomeSlice.actions
export default IncomeSlice.reducer
