import React, { useEffect } from 'react'
import './HomeSub.css'
import AddIcon from '../../../../assets/plus.png'
import { useSelector } from 'react-redux'
import ModeEditIcon from '@mui/icons-material/ModeEdit';


const HomeSub = ({ title, remaining, amount, handleClickOpen, handleEditIncome }) => {
    const userToken = useSelector(state => state.auth.userToken)

    return (
        <div className='homeSub'>
            <div className='homeSub__container1'>
                <p className='homeSub__title' >{title}</p>
                {!remaining && userToken && (
                    amount && amount > 0 ?
                        <ModeEditIcon sx={{ height: '20px', width: '20px', cursor: 'pointer', marginRight: '5px', marginTop: '12px', color: 'rgb(25, 118, 210)' }} onClick={handleEditIncome} /> :
                        <img style={{ height: '20px', width: '20px', cursor: 'pointer', marginRight: '5px', marginTop: '12px' }} onClick={handleClickOpen} src={AddIcon} />)}

            </div>
            <div className='homeSub__container2'>

                <p className='homeSub__amount' >Rs

                    <span> {amount}</span>
                </p>

            </div>
        </div>
    )
}

export default HomeSub