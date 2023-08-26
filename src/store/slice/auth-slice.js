import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const initialAuthState = {
    isAuthenticated: localStorage.getItem('token') != null ? true : false,
    userToken: localStorage.getItem('token') || null,
    userEmail: localStorage.getItem('email') || null,
    name: '',
    photoUrl: '',
    emailVerified: null,
    isPremiumUser:localStorage.getItem('isPremiumUser') || null
}


const AuthSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.userToken = action.payload.token
            // state.userEmail = action.payload.email
            state.isAuthenticated = true
        },
        logout(state, action) {
            state.userToken = null
            state.userEmail = null
            state.isAuthenticated = false
        },
        isEmailVerify(state, action) {
            state.emailVerified = action.payload
        },
        isPremiumUser(state,action){
            state.isPremiumUser=action.payload
        }

    }
})

export const checkPremiumUser=()=>{
    return async(dispatch)=>{
        const isPremium=async()=>{
            const token = localStorage.getItem('token')

            let reqInstance = await axios.create({
                headers: {
                    Authorization: token
                }
            })

            const premium=await reqInstance.get('http://localhost:4000/purchase/checkpremium')
            const isPremium=premium.data.isPremium
            if(isPremium==true){
                localStorage.setItem('isPremiumUser', true)
                dispatch(authActions.isPremiumUser(true))
            }else{
                localStorage.removeItem('isPremiumUser')
                dispatch(authActions.isPremiumUser(false))

            }

        }


        try{

           await isPremium()

        }catch(err){
            console.log(err)
        }
    }

}

export const authActions = AuthSlice.actions
export default AuthSlice.reducer