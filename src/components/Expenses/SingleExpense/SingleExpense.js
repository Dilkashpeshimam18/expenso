import React from 'react'
import './SingleExpense.css'
import { themeActions } from '../../../store/slice/theme-slice'
import { useDispatch, useSelector } from 'react-redux'
import { deleteExpenseData,getExpenseData } from '../../../store/slice/expense-slice'
import EditIcon from '../../assets/edit.png'
import DeleteIcon from '../../assets/delete.png'
import PremiumIcon from '../../assets/premium.png'

const SingleExpense = ({ id, amount, name, category, handleEdit }) => {
    const dispatch = useDispatch()
    const theme = useSelector(state => state.theme.theme)
    const userToken = useSelector(state => state.auth.userToken)

    const handlePremium = () => {
        dispatch(themeActions.activatePremium())
    }
   const handleDelete=async()=>{
    await dispatch(deleteExpenseData(id))
    dispatch(getExpenseData())
    
   }
    return (
        <div className='singleExpense'>
            <div className='singleExpense__container'>
                <div className='singleExpense__container1'>
                    <div className='singleExpense__subContainer'>
                        <p className='singleExpense__subTitle'>{name}</p>

                    </div>

                    <div className='singleExpense__subContainer'>
                        <p className='singleExpense__subAmmount'>Rs</p>
                        <p className='singleExpense__subAmmount'>{amount}</p>

                    </div>
                    {!userToken && <div className='singleExpense__buttonContainer'>
                        <img src={EditIcon} style={{ height: '25px', width: '25px', cursor: 'pointer', margin: '3px' }} onClick={() => alert('You need to login first!')}></img>
                        <img src={DeleteIcon} style={{ height: '25px', width: '25px', cursor: 'pointer', margin: '3px' }} onClick={() => alert('You need to login first!')}></img>
                        {amount > 10000 && <img style={{ height: '25px', width: '25px', cursor: 'pointer', margin: '3px' }} src={PremiumIcon} onClick={() => alert('You need to login first!')}></img>}
                    </div>}
                    {userToken && <div className='singleExpense__buttonContainer'>
                        <img src={EditIcon} style={{ height: '25px', width: '25px', cursor: 'pointer', margin: '3px' }} onClick={() => handleEdit(id)}></img>
                        <img src={DeleteIcon} style={{ height: '25px', width: '25px', cursor: 'pointer', margin: '3px' }} onClick={handleDelete }></img>
                        {amount > 10000 && <img style={{ height: '25px', width: '25px', cursor: 'pointer', margin: '3px' }} src={PremiumIcon} onClick={handlePremium}></img>}
                    </div>}

                </div>

                <div className='singleExpense__subCatContainer'>
                    <p className='singleExpense__subCategory'>{category}</p>

                </div>

            </div>
        </div>
    )
}

export default SingleExpense