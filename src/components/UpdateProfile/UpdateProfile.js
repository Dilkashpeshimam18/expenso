import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './UpdateProfile.css'

const UpdateProfile = ({ setIsUpdated }) => {
    const userToken = useSelector(state => state.auth.userToken)
    const [name, setName] = useState('')
    const [photoUrl, setPhotoUrl] = useState('')
    const navigate = useNavigate()

    const getUserProfileData = async () => {
        try {
            const token = localStorage.getItem('token')
            let reqInstance = await axios.create({
                headers: {
                    Authorization: token
                }
            })
            const response = await reqInstance.get('http://localhost:4000/user/userInfo')
            setName(response.data.data.name)
            setPhotoUrl(response.data.data.photoUrl)

        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            let reqInstance = await axios.create({
                headers: {
                    Authorization: token
                }
            })
            const data = {
                name,
                photoUrl
            }
            const response = await reqInstance.post('http://localhost:4000/user/update-userInfo', data).then(() => {
                setName('')
                setPhotoUrl('')
                alert('Profile updated!')
                setIsUpdated(false)
                getUserProfileData()
            })

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUserProfileData()

    }, [])
    return (
        <div className='updateProfile'>
            <h2 className='auth__title'>Update Profile</h2>
            <div className='updateProfile__container'>
                <form onSubmit={handleUpdateProfile}>
                    <div className='formInput__container'>
                        <TextField className='form-input' id="outlined-basic" label="Full name" type='text' variant="outlined" value={name} onChange={(e) => setName(e.target.value)} required />

                    </div>
                    <div className='formInput__container'>
                        <TextField className='form-input' id="outlined-basic" label="Photo Url" type='text' variant="outlined" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} required />

                    </div>
                    <div className='updateButton__container'>
                        <button type='submit' className='update-button'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfile