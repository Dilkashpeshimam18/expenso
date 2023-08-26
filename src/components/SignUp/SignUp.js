import React, { useState } from 'react'
import './SignUp.css'
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()
    const isPasswordConfirmed = (password, confimPassword) => {
        if (password && confimPassword && password === confimPassword) return true;
        return false;
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            if (!isPasswordConfirmed(password, confirmPassword)) {
                alert('Password & confirm password should be same!')
            } else {
                if (email != '' && password != '' && confirmPassword != '') {
                    const data = {
                        name: name,
                        email: email,
                        password: password,
                        returnSecureToken: true

                    }

                    await axios.post('http://localhost:4000/auth/signup', data)
                    alert('Sign up successful!')
                    setName('')
                    setEmail('')
                    setPassword('')
                    setConfirmPassword('')
                    navigate('/login')

                }

            }

        } catch (err) {
            console.log(err)
            alert(err)
        }
    }
    return (
        <div className='signUp'>
            <h3 className='auth__title'>SignUp</h3>
            <div className='form__container'>
                <form onSubmit={handleSignUp} className='signUp__form'>
                    <div className='formInput__container'>
                        <TextField className='form-input' id="outlined-basic" label="Name" type='text' variant="outlined" value={name} onChange={(e) => setName(e.target.value)} required />

                    </div>
                    <div className='formInput__container'>
                        <TextField className='form-input' id="outlined-basic" label="Email" type='email' variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} required />

                    </div>
                    <div className='formInput__container'>
                        <TextField className='form-input' id="outlined-basic" label="Password" type='password' variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} required />

                    </div>
                    <div className='formInput__container'>
                        <TextField className='form-input' id="outlined-basic" label="Confirm Password" type='password' variant="outlined" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

                    </div>
                    <div className='signUpButton__container'>
                        <button type='submit' className='signUp-button'>SIGN UP</button>
                    </div>

                </form>
                <div className='subLinkContainer'>

                    <p className='subLink'>Already have an account? <Link className='subLink__title' to='/login'>Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default SignUp