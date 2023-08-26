import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const IncomeModal = ({ handleClose, open, income, handleIncome, handleChange, editIncome, total_income, handleEditIncome, editUserIncome }) => {
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                {editIncome ? <DialogTitle>Edit INCOME</DialogTitle>
                    : <DialogTitle>ADD INCOME</DialogTitle>
                }
                <DialogContent>
                    {editIncome ? <DialogContentText>
                        Edit your income.
                    </DialogContentText> : <DialogContentText>
                        Enter your income.
                    </DialogContentText>}
                    {editIncome ? <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Income"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={editIncome && income}
                        InputProps={{
                            inputProps: { min: 0 }
                        }}
                    /> : <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Income"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}

                        InputProps={{
                            inputProps: { min: 0 }
                        }}
                    />}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {editIncome ? <Button onClick={editUserIncome}>EDIT INCOME</Button> :
                        <Button onClick={handleIncome}>ADD INCOME</Button>

                    }
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default IncomeModal