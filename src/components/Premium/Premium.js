import React from 'react'
import './Premium.css'
import axios from 'axios';
import { authActions } from '../../store/slice/auth-slice'
import { useDispatch, useSelector } from 'react-redux'

const Premium = () => {
    const dispatch = useDispatch()
    const isPremiumUser = useSelector(state => state.auth.isPremiumUser)


    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    const displayRazorpay = async (e) => {
        e.preventDefault()
        try {

            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
            if (!res) {
                alert("Razorpay SDK failed to load. Are you online?");
                return;
            }

            const token = localStorage.getItem('token')

            let reqInstance = await axios.create({
                headers: {
                    Authorization: token
                }
            })
            const order = await reqInstance.get('http://localhost:4000/purchase/premiummembership')

            const options = {
                key: order.data.key_id,
                order_id: order.data.order.id,
                handler: async (response) => {
                    const data = {
                        orderId: options.order_id,
                        paymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,

                    }

                    const res = await reqInstance.post('http://localhost:4000/purchase/updatetransactionstatus', data)
                    alert('Congrats! You are premium user now.')
                    localStorage.setItem('isPremiumUser', true)
                    dispatch(authActions.isPremiumUser(true))


                },
                prefill: {
                    name: "Expenso",
                    email: "expenso@gmail.com",
                },
            }

            const payment = new window.Razorpay(options)
            payment.open()
            payment.on('payment.failed', async (res) => {
                const orderId = res.error.metadata.order_id
                const data = {
                    status: 'failed',
                    orderId: orderId
                }
                const response = await reqInstance.post('http://localhost:4000/purchase/updatetransactionstatus', data)

                alert('Something went wrong!')
            })
        } catch (err) {
            console.log(err)

        }
    }
    return (
        <div className='premium'>

            {isPremiumUser == true ? <button className='header__authBtn'>Premium </button> :
                <button onClick={displayRazorpay} className='header__authBtn'>Buy Premium</button>

            }
        </div>
    )
}

export default Premium