import React, { useEffect,useState } from 'react'
import './HomeRightBottom.css'
import WalletIcon from '../../../assets/wallet.png'
import { modalActions } from '../../../../store/slice/modal-slice'
import { useDispatch, useSelector } from 'react-redux'
const HomeRightBottom = () => {
    const userToken = useSelector(state => state.auth.userToken)
    const theme = useSelector(state => state.theme.theme)
    const [userIncome,setUserIncome]=useState(() => {
        return  localStorage.getItem('userIncome') 
    })
    const dispatch = useDispatch()
    let income;
    const handleOpen = () => {
        dispatch(modalActions.handleClickOpen())
        dispatch(modalActions.handleAddNew())
    }

const handleAlert=()=>{
    const income=Number(localStorage.getItem('userIncome'))
    setUserIncome(income)
    alert('You need to add your income first.')

}
useEffect(()=>{
    const interval = setInterval(() => {
        income=Number(localStorage.getItem('userIncome'))
        setUserIncome(income)
      }, 2000);

      return () => clearInterval(interval);
},[])

    return (
        <div className='homeRightBottom'>
            <div className='homeRightBottom__container1' >
                {theme != 'dark' && <img className='homeBottom__icon' src={WalletIcon} />}

                <p className='homeRightBottom__text'>Missing Transaction?</p>

            </div>
            {
                userToken ? (
                    <div className='homeRightBottom__container2'>
                        {
                            Number(userIncome) > 0 ?
                                <button onClick={handleOpen} className='homeRightBottom__button'>ADD NEW</button> :
                                <button onClick={handleAlert} className='homeRightBottom__button'>ADD NEW</button>
                        }

                    </div>
                ) : (
                    < div className='homeRightBottom__container2'>
                        <button onClick={() => {console.log(userIncome)
                        alert('You need to login first!')
                       
                    }} className='homeRightBottom__button'>ADD NEW</button>

                    </div>
                )
            }


        </div >
    )
}

export default HomeRightBottom