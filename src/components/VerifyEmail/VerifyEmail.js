import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import './VerifyEmail.css'
const VerifyEmail = () => {
    const userToken = useSelector(state => state.auth.userToken)

    const handleEmailVerify = async (e) => {
        e.preventDefault()
        try {
            const data = {
                requestType: 'VERIFY_EMAIL',
                idToken: userToken
            }

            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDKj1Lc9A0JYGLuOTbYEr8SD-7ChLkI1Ys', data, {
                headers: {
                    'Content-Type': 'application/json',

                }
            })
            if (response.status == 200) {
                alert('Check your email for verification link')
            }


        } catch (err) {
            console.log(err)
            alert(err)
        }
    }
    return (
        <div className='verifyEmail'>

            <p className='verify__Link' onClick={handleEmailVerify}>Verify Email</p>
        </div>
    )
}

export default VerifyEmail