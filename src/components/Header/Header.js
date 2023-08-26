import React, { useEffect } from 'react'
import './Header.css'
import Logout from '../Logout/Logout'
import ProfileModal from '../ProfileModal/ProfileModal'
import VerifyEmail from '../VerifyEmail/VerifyEmail'
import { useSelector, useDispatch } from 'react-redux'
import { themeActions } from '../../store/slice/theme-slice'
import DarkModeToggle from "react-dark-mode-toggle";



import { Link } from 'react-router-dom'
import Premium from '../Premium/Premium'
const Header = ({ open, setOpen, isUpdated }) => {
    const userToken = useSelector(state => state.auth.userToken)
    const isVerify = useSelector(state => state.auth.emailVerified)
    const dispatch = useDispatch()
    const handleToggle = () => {
        dispatch(themeActions.toggleTheme())
    }
    const theme = useSelector(state => state.theme.theme)

    return (
        <div className='header'>
            <div className='header__container'>
                <div className='header__left'>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to='/'><h2 className='header__title'>Expenso</h2></Link>
                </div>
                <div className='header__right'>
                    {
                        userToken  ? (
                            <>
                                <div className='header__rightSub'>


                                    <DarkModeToggle
                                        onChange={handleToggle}
                                        checked={theme == 'dark'}
                                        size={50}
                                    />
                                </div>
                                {open == true && <ProfileModal open={open} setOpen={setOpen} />}
                                {isVerify == false && <div className='header__rightSubLink'>
                                    <VerifyEmail />


                                </div>}

                                <div className='header__rightSubLink'>

                           
                                    <Premium />
                                    <Logout />

                                </div>



                            </>

                        ) : (
                            <div className='header__rightSubLink'>
                                <Link to='/login'><button className='header__authBtn'>Login</button></Link>

                            </div>
                        )
                    }
                    {/* {userToken != null && <div className='header__rightSub'>


                        <DarkModeToggle
                            onChange={handleToggle}
                            checked={theme == 'dark'}

                            size={60}
                        />


                    </div>} */}
                    {/* 
                    {userToken == null && <div className='header__rightSubLink'>
                        <Link to='/login'><button className='header__authBtn'>Login</button></Link>

                    </div>} */}

                    {/* {userToken && <>
                        {open == true && <ProfileModal open={open} setOpen={setOpen} />}
                        {isVerify == false && <div className='header__rightSubLink'>
                            <VerifyEmail />


                        </div>}

                        <div className='header__rightSubLink'>
                            <Logout />

                        </div>

                    </>


                    } */}
                </div>
            </div>

        </div>
    )
}

export default Header