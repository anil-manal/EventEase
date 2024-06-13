import React, { useEffect, useState } from 'react';
// import { useGetUserBookedEvevtsQuery, useGetUserCreatedEvevtsQuery } from '../redux/api/userApi';
import { useLogoutMutation } from '../redux/api/authApi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetOrgCreatedEventQuery, useLazyGetAllBookedEventsQuery } from '../redux/api/orgApi';

// Sample event data
// const events = [
//     { id: 1, name: 'Event 1' },
//     { id: 2, name: 'Event 2' },
// ];

// Sample order data


const OrgProfile = () => {
    const { auth } = useSelector((state) => state.auth);
    const [logoutFn] = useLogoutMutation();
    const { data: events, isSuccess, isError, error } = useGetOrgCreatedEventQuery(auth.user_id);
    const [getBookedOrderFn, { data: orders }] = useLazyGetAllBookedEventsQuery();

    useEffect(() => {
        if (isError) {
            if (error.status === 400) {
                logoutFn();
                toast("Logout");
            }
        }
    }, [isError]);

    const handleEventChange = (eventId) => {
        // console.log(eventId);
        getBookedOrderFn(eventId);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl text-teal-500 font-bold text-center mb-8">Event Order Details</h1>

            <select
                className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
                onChange={(e) => handleEventChange(e.target.value)}
            >
                <option value="" disabled selected>Select an event</option>
                {events && events.map((event) => (
                    <option key={event.id} value={event._id}>
                        {event.event_title}
                    </option>
                ))}
            </select>


            <div>
                {orders && orders.map((order) => (
                    <div key={order.id} className="border border-gray-300 rounded-md p-4 mb-4">
                        <h2 className="text-lg font-bold mb-2">Order #{order.id}</h2>
                        <p>User: {order.user_name}</p>
                        <p>Ticket Quantity: {order.tiket_count}</p>
                        <p>Booking Date: {new Date(order.booking_date).toLocaleDateString('en-IN')}</p>
                        <p>Price: ₹ {order.price}</p>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default OrgProfile;
