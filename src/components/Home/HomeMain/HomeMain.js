import React, { useState, useEffect } from 'react'
import HomeLineGraph from './Home/HomeLineGraph/HomeLineGraph'
import HomeSub from './Home/HomeSub/HomeSub'
import IncomeModal from './Home/IncomeModal/IncomeModal'
import { useSelector, useDispatch } from 'react-redux'
import './HomeMain.css'
import HomePieChart from './Home/HomePieChart/HomePieChart'
import HomeBar from './Home/HomeBar/HomeBar'
import { addIncome, getUserIncome, updateUserIncome } from '../../../store/slice/income-slice'
import Leaderboard from './Home/HomeLeaderboard/Leaderboard'
import ExpenseYearlyGrid from '../../Expenses/ExpenseDataGrid/ExpenseYearlyGrid'
import ExpenseMonthlyGrid from '../../Expenses/ExpenseDataGrid/ExpenseMonthlyGrid'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios'
import { expenseActions } from '../../../store/slice/expense-slice'

const HomeMain = () => {
    const [remaining, setRemaining] = useState(true)
    const [open, setOpen] = useState(false);
    const [editIncome, setEditIncome] = useState(false)
    const [income, setIncome] = useState(() => {
        return 0 || localStorage.getItem('userIncome')
    })
    const [userIncome, setUserIncome] = useState(() => {
        return localStorage.getItem('userIncome') || 0
    })
    const getInitialState = () => {
        const value = "Monthly";
        return value;
    };
    const [category, setCategory] = useState(getInitialState)
    const isSelected = useSelector(state => state.dashboard.isSelected)
    const allExpenses = useSelector(state => state.expenses.expenses)
    const dispatch = useDispatch()
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalexpense, setTotalExpense] = useState(0)
    const [remainingBalance, setRemainingBalance] = useState(0)

    const total_expense = useSelector(state => state.income.userExpenses)
    const remaining_balance = useSelector(state => state.income.userBalance)
    const yearlyExpenseData = useSelector(state => state.expenses.yearlyExpense)
    const addExpense=expenseActions.addExpense()
    const theme = useSelector(state => state.theme.theme)

    const initialRowState = () => {
        const value = 5;
        return value;
    }
    const [rowPerPage, setRowPerPage] = useState(initialRowState)

    let map = new Map()
    let map2 = new Map()

    for (let exp of allExpenses) {
        let category = exp?.category
        let amount = Number(exp?.amount)
        map.set(category, map.get(category) + amount || amount)
    }

    let allKeys = [...map.keys()]
    let allValues = [...map.values()]
    let barData = {
        labels: allKeys,
        datasets: [{
            barThickness: 45,
            label: 'Total Expense By Category',
            data: allValues,
            // backgroundColor: ['rgb(1, 140, 140)', '#3bc4d4',]
            backgroundColor: [
                // 'rgb(255, 99, 132)',
                'rgb(255, 205, 86)',
                'rgb(54, 162, 235)',
                'rgb(255, 99, 132)'],
        }]
    }

    for (let exp of allExpenses) {
        let desc = exp?.name?.toLowerCase()
        let amount = Number(exp?.amount)
        map2.set(desc, map2.get(desc) + amount || amount)
    }

    let allDescKey = [...map2.keys()]
    let allDescValue = [...map2.values()]
    let totalexp = localStorage.getItem('totalExpense') || 0
    let totalExpense = totalexp

    totalExpense = allExpenses.reduce((curr, expense) => {
        return curr + Number(expense?.amount)
    }, 0)

    let balance = localStorage.getItem('remainingBalance') || 0
    let remainingAmount = balance;

    // remainingAmount = Income?.income - totalExpense;



    let lineData = {
        labels: allDescKey,
        datasets: [{
            barThickness: 40,
            label: 'All Expense',
            data: allDescValue,
            backgroundColor: ['rgb(1, 140, 140)', '#3bc4d4',],
            animations: {
                y: {
                    duration: 2000,
                    delay: 500
                }
            },
            tension: 0.5
        }]
    }

    let pieData = {
        labels: ['Income', 'Expense', 'Balance'],
        datasets: [{
            barThickness: 40,
            label: 'Income vs Expense vs Balance',
            data: [userIncome, totalExpense, remainingBalance],
            backgroundColor: [
                'rgb(1, 140, 140)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
        }]
    }


    const handleClickOpen = () => {
        setOpen(true);

    };
    const handleEditIncome = () => {
        setOpen(true);
        setEditIncome(true)
    }

    const handleClose = () => {
        setOpen(false);
        let Income = localStorage.getItem('userIncome')

        setUserIncome(Income)
    };

    const handleChange = (e) => {
        setIncome(e.target.value)
    }

    const handleCategory = (e) => {
        setCategory(e.target.value);
    };

    const handleRowPerPage = (e) => {
        setRowPerPage(e.target.value)
    }

    const getUserBalance = async () => {
        try {
            const token = localStorage.getItem('token')

            let reqInstance = await axios.create({
                headers: {
                    Authorization: token
                }
            })

            let response = await reqInstance.get('http://localhost:4000/user/get-userDetail')
            let data = response.data.data

            setTotalIncome(data.total_income)
            setTotalExpense(data.total_expense)
            setRemainingBalance(data.remaining_balance)

            localStorage.setItem('userIncome', data.total_income)
            localStorage.setItem('userExpenses', data.total_expense)
            localStorage.setItem('userBalance', data.remaining_balance)

        } catch (err) {
            console.log(err)
        }

    }
    const handleAddIncome = async () => {
        try {
            totalExpense = allExpenses.reduce((curr, expense) => {
                return curr + Number(expense.amount)
            }, 0)

            if (income != null) {
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
                getUserBalance()
                alert('Added income!')

            }

            localStorage.setItem('userIncome', income)

            localStorage.setItem('totalExpense', totalExpense)

            remainingAmount = income - totalExpense;
            localStorage.setItem('remainingBalance', remainingAmount)
            handleClose()
            

        } catch (err) {
            console.log(err)
        }

    }


    const editUserIncome = async () => {
        try {
            // dispatch(updateUserIncome(income))

            const token = localStorage.getItem('token')

            let reqInstance = await axios.create({
                headers: {
                    Authorization: token
                }
            })

            const newIncome = {
                income
            }

            const response = await reqInstance.post('http://localhost:4000/income/edit-income', newIncome)

            getUserBalance()
            localStorage.setItem('userIncome', JSON.stringify(Number(income)))

            totalExpense = allExpenses.reduce((curr, expense) => {
                return curr + Number(expense.amount)
            }, 0)
            remainingAmount = income - totalExpense;
            localStorage.setItem('remainingBalance', remainingAmount)
            alert('Income updated!')
            dispatch(getUserIncome())

            handleClose()
        } catch (err) {
            console.log(err)
        }

    }

    const handleDownloadExpense = async () => {
        try {
            const token = localStorage.getItem('token')

            let reqInstance = await axios.create({
                headers: {
                    Authorization: token
                }
            })
            const response = await reqInstance.get('http://localhost:4000/expense/download-expense')
            if (response.status == 200) {
                var a = document.createElement('a')
                a.href = response.data.fileUrl
                a.download = 'myexpense.csv'
                a.click()
            }
        } catch (err) {
            console.log(err)
        }
    }
  
    useEffect(() => {
        getUserBalance()
    }, [addExpense])

    return (
        <div className='homeMain'>
            <div className='home__subContainer'>

                <HomeSub title='Income' amount={totalIncome} handleClickOpen={handleClickOpen} handleEditIncome={handleEditIncome} />
                <HomeSub title='Expense' remaining={remaining} amount={totalExpense} />
                <HomeSub title='Remaining' remaining={remaining} amount={remainingBalance} />
            </div>
            {isSelected == 'Dashboard' &&
                <>
                    <div className='home__graphContainer'>
                        <HomeLineGraph chartData={lineData} />
                    </div>
                    <div className='home__chartContainer'>
                        <HomePieChart chartData={pieData} />
                        <HomeBar chartData={barData} />
                    </div>
                </>
            }
            {
                isSelected == 'Bar' &&
                <div className='home__barContainer'>
                    <HomeBar chartData={barData} />
                </div>
            }
            {
                isSelected == 'Line' &&
                <div className='home__graphContainer'>
                    <HomeLineGraph chartData={lineData} />
                </div>
            }
            {
                isSelected == 'Pie' &&
                <div className='home__graphContainer'>
                    <HomePieChart chartData={pieData} />
                </div>
            }
            {
                isSelected == 'Leaderboard' &&
                <div className='home__graphContainer'>
                    <Leaderboard />
                </div>
            }
            {
                isSelected == 'Expenses' &&
                <div className='home__graphContainer'>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label"> Expenses</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            onChange={handleCategory}
                            className={`${theme=='dark'&&'select__dark'}`}
                            variant="outlined"
                          
                        >

                            <MenuItem value="Monthly">Monthly</MenuItem>
                            <MenuItem value="Yearly">Yearly</MenuItem>

                        </Select>
                    </FormControl>
                    {
                        category == 'Monthly' ?
                            <>
                                <FormControl sx={{ marginLeft: "10px" }}>
                                    <InputLabel id="demo-simple-select-label"> Row</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={rowPerPage}
                                        label="Row"
                                        onChange={handleRowPerPage}
                                        className={`${theme=='dark'&&'select__dark'}`}

                                    >

                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={10}>10</MenuItem>
                                        <MenuItem value={25}>25</MenuItem>
                                        <MenuItem value={50}>50</MenuItem>


                                    </Select>
                                </FormControl>

                                <button className='download__expenseBtn' onClick={handleDownloadExpense}>Download Expense</button>
                                <ExpenseMonthlyGrid rowPerPage={rowPerPage} />
                            </>
                            :
                            <ExpenseYearlyGrid />
                    }

                </div>
            }

            <IncomeModal income={income} total_income={totalIncome} handleClose={handleClose} editIncome={editIncome} open={open} handleIncome={handleAddIncome} handleChange={handleChange} editUserIncome={editUserIncome} />
        </div>
    )
}

export default HomeMain