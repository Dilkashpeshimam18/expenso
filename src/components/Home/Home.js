import React,{ useEffect } from 'react'
import './Home.css'
import Expenses from '../Expenses/Expenses'
import { useSelector,useDispatch } from 'react-redux'
import HomeLeft from './HomeLeft/HomeLeft'
import HomeMain from './HomeMain/HomeMain'
import HomeRight from './HomeRight/HomeRight'
import { checkPremiumUser } from '../../store/slice/auth-slice.js'

const Home = () => {
    const userToken = useSelector(state => state.auth.userToken)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkPremiumUser())
    }, [])

    return (
        <div className='home'>
            <HomeLeft />
            <HomeMain />
            <HomeRight />


        </div>
    )
}

export default Home