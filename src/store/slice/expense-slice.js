import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialExpenseState = {
    expenses: [],
    isEdit: false,
    isfetching: false,
    userIncome: localStorage.getItem('userIncome') || 0,

}


const ExpenseSlice = createSlice({
    name: 'expenses',
    initialState: initialExpenseState,
    reducers: {
        addExpense(state, action) {
            if (Array.isArray(action.payload)) {
                state.expenses = action.payload
            } else {
                state.expenses.push(action.payload)

            }

        },
        deleteExpense(state, action) {
            let filterExp = state.expenses.filter((exp) => {
                return exp.id != action.payload
            })
            state.expenses = filterExp
        },
        editExpense(state, action) {
            state.isEdit = true
            state.expenseId = action.payload
        },
        isNotEditExpense(state) {
            state.isEdit = false
            state.expenseId = null
        },
        setIsFetching(state, action) {
            state.isfetching = action.payload
        },
        handleAddIncome(state, action) {
            state.userIncome = action.payload
        },


    }
})




export const getExpenseData = () => {
    return async (dispatch, state) => {
        const getRequest = async () => {
            const token = localStorage.getItem('token')

            let reqInstance = await axios.create({
                headers: {
                    Authorization: token
                }
            })
            const response = await reqInstance.get('http://localhost:4000/expense/get-expense')
            const data = response.data.userExpense

            dispatch(expenseActions.addExpense(data))

        }
        try {
            if (localStorage.getItem('token')) {
                await getRequest()

            }
        } catch (err) {
            console.log(err)
        }

    }
}
export const postExpenseData = (expense) => {
    return async (state, dispatch) => {

        const postRequest = async () => {
            var email = localStorage.getItem('email')
            const token = localStorage.getItem('token')

            let reqInstance = await axios.create({
                headers: {
                    Authorization: token
                }
            })

            const d = new Date();
            let month = d.toLocaleString('default', { month: 'long' });;
            const response = await reqInstance.post('http://localhost:4000/expense/add-expense', expense)

            const data = {
                expense: Number(expense.amount),
                month: month
            }
            await reqInstance.post('http://localhost:4000/expense/add-yealyexpense', data)

        }

        try {
            await postRequest().then(() => {
                getExpenseData()
                alert('Added Successfully!')
            })

        } catch (err) {
            console.log(err)
        }

    }

}

export const updateExpenseData = (data) => {
    return async () => {

        const putRequest = async () => {
            const token = localStorage.getItem('token')

            let reqInstance = await axios.create({
                headers: {
                    Authorization: token
                }
            })
            const response = await reqInstance.put(`http://localhost:4000/expense/update-expense/${data.id}`, data.expense)
        }

        try {
            await putRequest().then(() => {
                getExpenseData()
                alert('Updated Successfully!')
            })

        } catch (err) {
            console.log(err)
        }
    }
}

export const deleteExpenseData = (id) => {
    return async () => {
        const deleteRequest = async () => {

            const token = localStorage.getItem('token')

            let reqInstance = await axios.create({
                headers: {
                    Authorization: token
                }
            })

            const response = await reqInstance.delete(`http://localhost:4000/expense/delete-expense/${id}`)

        }
        try {
            await deleteRequest().then(() => {
                getExpenseData()
                alert('Deleted successfully!')

           })
        } catch (err) {
            console.log(err)
            alert(err)
       
        }
    }
}



export const expenseActions = ExpenseSlice.actions
export default ExpenseSlice.reducer