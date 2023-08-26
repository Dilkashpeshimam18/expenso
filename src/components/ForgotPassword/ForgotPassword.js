import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { authActions } from '../../store/slice/auth-slice';
import { useDispatch } from 'react-redux';

const ForgotPassword = () => {
    const [email, setEmail] = useState('')

    const handleForgetPassword = async (e) => {
        e.preventDefault()
        try {
            const data={
                email
            }
            const response = await axios.post('http://localhost:4000/password/forgotpassword ',data)
            console.log(response)
            if(response.status==202){
                alert(response.data.message)
            }

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='login'>

            <h3 className='auth__title'>Enter Email</h3>
            <div className='form__container'>
                <form onSubmit={handleForgetPassword} className='signUp__form'>
                    <div className='formInput__container'>
                        <TextField className='form-input' id="outlined-basic" label="Email" type='email' value={email} onChange={(e) => setEmail(e.target.value)} variant="outlined" required />

                    </div>


                    <div className='signUpButton__container'>
                        <button type='submit' className='signUp-button'>Submit</button>
                    </div>

                </form>
                <div className='subLinkContainer'>

                    <p className='subLink'>Don't have an account? <Link className='subLink__title' to='/sign-up'>Signup</Link></p>
                </div>

            </div>

        </div>
    )
}

export default ForgotPassword