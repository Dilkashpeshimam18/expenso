import React, { useState, useEffect } from 'react'
import './HomeLeft.css'
import HomeOption from './HomeOption/HomeOption'
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom'
import axios from 'axios';

const HomeLeft = () => {
    const [name, setName] = useState('')
    const [photoUrl, setPhotoUrl] = useState('')

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

    useEffect(() => {
        getUserProfileData()
    }, [])
    return (
        <div className='homeLeft'>
            <div className='homeLeft__userProfile'>
                <Link style={{ textDecoration: 'none', color: 'black' }} to='/update-profile'>
                    <div >
                        <Avatar sx={{ width: 100, height: 105, marginLeft: '25px' }}
                            src={photoUrl} />
                        <div className='userProfile__name'>
                            {name != '' ? <h3 > {name}</h3> : <h3 style={{ marginLeft: '35px' }}>Hi, Guest</h3>}

                        </div>

                    </div>
                </Link>
            </div>
            <HomeOption /></div>
    )
}

export default HomeLeft