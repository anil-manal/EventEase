import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useInitiateOrderMutation, usePlaceOrderMutation } from '../redux/api/orderApi';
import { useSelector, useStore } from 'react-redux';
import { useSelectedEventDetailedQuery } from '../redux/api/EventApi';
import { toast } from 'react-toastify';

const PaymentPage = () => {
    const [initiateOrder, { isSuccess, data }] = useInitiateOrderMutation()
    const [placeOrder, { isSuccess: placeorderSucc }] = usePlaceOrderMutation()

    const [count, setCount] = useState(1)
    const [EventPrice, setEventPrice] = useState("")
    const { auth } = useSelector(state => state.auth)
    const { eventId } = useParams();
    const { data: eventData } = useSelectedEventDetailedQuery(eventId)
    const { user_id, fullName, email } = auth
    const booking_date = new Date().toISOString();
    // console.log(booking_date);

    useEffect(() => {
        if (placeorderSucc) {
            toast("Your Ticket has booked please checked you registered email box")
        }
    }, [placeorderSucc])

    useEffect(() => {
        if (eventData) {
            setEventPrice(eventData.result.event_price); // Update event price when eventData changes
        }
    }, [eventData]);

    useEffect(() => {
        if (isSuccess && eventData) {
            const { event_title } = eventData.result;

            const razor = window.Razorpay({
                key: import.meta.env.VITE_RAZORPAY_API_KEY,
                amount: 100 * 100,
                currency: "INR",
                order_id: data.id,
                prefill: {
                    contact: "8080328556"
                },
                handler: response => placeOrder({ ...response, event_title, price: EventPrice * count, event_id: eventId, user_name: fullName, email, user_id, tiket_count: count, booking_date })
            })
            razor.open()
        }
    }, [isSuccess])
    // console.log(EventPrice);
    return (
        <div className="min-h-screen flex flex-col lg:flex-row justify-center bg-white gap-20 items-stretch py-20">
            <div className="max-w-md w-full lg:w-1/2 p-8 bg-white rounded-lg ">
                <div className="flex flex-col items-center h-full justify-center"> {/* Center content */}
                    <h2 className="text-2xl font-semibold mb-4">Make a Payment</h2>
                    <div className="mb-4">
                        <img src="https://cdn.iconscout.com/icon/free/png-512/free-razorpay-1649771-1399875.png?f=webp&w=256" alt="RazerPay Logo" className="h-12 w-auto mx-auto" /> {/* Center RazerPay logo */}
                    </div>
                    <p className="text-gray-700 mb-6 text-center"> {/* Center text */}
                        You're about to make a secure payment using RazerPay. Please proceed with the payment to complete your transaction.
                    </p>
                    {/* Payment options */}
                    <div className="flex items-center justify-center space-x-4 mb-6">
                        <button onClick={e => initiateOrder({ amount: EventPrice * count })} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
                            Pay with RazerPay
                        </button>

                        <div className="flex justify-around items-center  p-4 rounded-md">
                            <button onClick={e => setCount(count + 1)} className="px-4 py-2 bg-blue-500 text-white rounded-l-md hover:bg-green-600">+1</button>
                            <button className="px-4 py-2 bg-white border border-gray-300">{count}</button>
                            <button onClick={e => count === 1 ? setCount(1) : setCount(count - 1)} className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-yellow-600">-1</button>
                        </div>



                    </div>
                    {/* Information about payment */}
                    <div className="text-sm text-gray-600 mb-6">
                        By proceeding with the payment, you agree to our <Link to="/terms" className="text-blue-500">terms and conditions</Link>.
                    </div>
                    {/* Back button */}
                    <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 flex items-center mb-4">
                        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.4142 12L11.7071 8.29289C11.3166 7.90237 10.6834 7.90237 10.2929 8.29289C9.90237 8.68342 9.90237 9.31658 10.2929 9.70711L12.5858 12L10.2929 14.2929C9.90237 14.6834 9.90237 15.3166 10.2929 15.7071C10.6834 16.0976 11.3166 16.0976 11.7071 15.7071L15.4142 12ZM8 12L8.70711 11.2929C8.31658 10.9024 8.31658 10.2692 8.70711 9.87868L15.7071 2.87868C16.0976 2.48816 16.7308 2.48816 17.1213 2.87868C17.5118 3.2692 17.5118 3.90237 17.1213 4.29289L10.1213 11.2929C9.7308 11.6834 9.09763 11.6834 8.70711 11.2929C8.31658 10.9024 8.31658 10.2692 8.70711 9.87868L8 9.17157V12Z" fill="currentColor" />
                        </svg>
                        Back to Home
                    </Link>
                    {/* Responsive note */}
                    <p className="text-xs text-gray-500 text-center">
                        Note: This page is designed to be responsive for different screen sizes.
                    </p>
                </div>
            </div>
            <div className="lg:w-[35%] hidden lg:flex justify-center ">
                <img src="https://img.freepik.com/free-vector/e-wallet-concept-illustration_114360-7561.jpg?w=740&t=st=1707458109~exp=1707458709~hmac=70e360b01c376abf618ef7eeda96bf1f808aca0d24806f6f480cea20cc20ee9b" alt="Vector Image" className="h-full object-fill rounded-lg" />
            </div>
        </div>
    );
};

export default PaymentPage;
