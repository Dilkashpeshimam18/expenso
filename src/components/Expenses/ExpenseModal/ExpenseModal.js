import React, { useEffect } from 'react'
import './ExpenseModal.css'
import { useDispatch, useSelector } from 'react-redux'
import { expenseActions } from '../../../store/slice/expense-slice'
import { modalActions } from '../../../store/slice/modal-slice'
import { updateExpenseData, postExpenseData, getExpenseData } from '../../../store/slice/expense-slice'
import { getUserIncome } from '../../../store/slice/income-slice'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ExpenseModal = ({ amount, desc, category, setAmount, setDesc, setCategory, handleCategory, getInitialState }) => {

    const isEdit = useSelector(state => state.expenses.isEdit)
    const expId = useSelector(state => state.expenses.expenseId)
    const open = useSelector(state => state.modal.open)
    const dispatch = useDispatch()
    const expense = useSelector(state => state.expenses.expenses)
    const isNew = useSelector(state => state.modal.addNew)
    const isEditModal = useSelector(state => state.modal.isEdit)

    const handleAddExpenseForm = async(e) => {
        e.preventDefault();
       try{
        if (isEdit == true) {
            const data = {
                amount: amount,
                description: desc,
                category: category
            }
            let editexp = {
                id: expId,
                expense: data
            }
            await dispatch(updateExpenseData(editexp))

            setAmount(0)
            setDesc('')
            setCategory(getInitialState)

            dispatch(expenseActions.isNotEditExpense())
            dispatch(getExpenseData())
            dispatch(getUserIncome())



        } else {
            const data = {
                amount: amount,
                description: desc,
                category: category,
            }
           await dispatch(postExpenseData(data))
            setAmount(0)
            setDesc('')
            setCategory(getInitialState)
            dispatch(getExpenseData())
            dispatch(getUserIncome())


        }
       }catch(err){
        console.log(err)
       }
   }

    useEffect(() => {
        if (isNew == true) {
            setAmount(0)
            setDesc('')
            setCategory(getInitialState)
        }

    }, [isNew])


    return (
        <div>
            <Dialog open={open} onClose={() => dispatch(modalActions.handleClose())}>
                {isEditModal ? <DialogTitle>Update Expense</DialogTitle> : <DialogTitle>Add Expense</DialogTitle>}

                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="amount"
                        label="Amount"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={amount}
                        InputProps={{
                            inputProps: { min: 0 }
                        }}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <FormControl style={{ marginTop: '22px' }} fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            onChange={handleCategory}
                        >
                            <MenuItem value="Food">Food</MenuItem>
                            <MenuItem value="Entertainment">Entertainment</MenuItem>
                            <MenuItem value="Daily Need">Daily Need</MenuItem>
                            <MenuItem value="Clothing">Clothing</MenuItem>
                            <MenuItem value="Accessories">Accessories</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>


                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => dispatch(modalActions.handleClose())}>CANCEL</Button>
                    {isEditModal ? <Button onClick={handleAddExpenseForm}>Update</Button> : <Button onClick={handleAddExpenseForm}>ADD</Button>}

                </DialogActions>
            </Dialog>

        </div>
    )
}

export default ExpenseModal