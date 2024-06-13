import React, { useEffect, useState } from 'react';
import { useGetUserBookedEvevtsQuery } from '../redux/api/userApi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useLogoutMutation } from '../redux/api/authApi';

const Profile = () => {
    const { auth } = useSelector((state) => state.auth);
    const { data: BookedEvent, isError, isSuccess, error } = useGetUserBookedEvevtsQuery(auth.user_id);
    const [logoutFn] = useLogoutMutation();

    useEffect(() => {
        if (isError) {
            if (error.status === 400) {
                logoutFn();
                toast("Logout");
            }
        }
    }, [isError]);

    return (
        <div>



            {/* userBooked Events */}
            <div className="mt-8 mx-4 my-10 shadow-2xl px-10">
                {/* <h2 className="text-3xl font-bold mb-4 text-center">Your Created Events</h2> */}
                <h1 className="text-4xl text-teal-500 font-bold text-center mb-8">Your Booked Event</h1>

                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-10">
                    {BookedEvent && BookedEvent.map((event, index) => (
                        <div key={index} className="bg-cream-light rounded-lg overflow-hidden shadow-md hover:shadow-lg">
                            <div className="p-4 flex flex-col justify-center">
                                <h3 className="text-2xl mb-4 font-bold">{event.event_title}</h3>
                                <p className="text-gray-600 mb-2"><strong>Booking User:</strong> {event.user_name}</p>
                                <p className="text-gray-600 mb-2"><strong>Booking Date:</strong> {event.booking_date}</p>
                                <p className="text-gray-600 mb-2"><strong>Ticket Count:</strong> {event.tiket_count}</p>
                                <p className="text-gray-600 mb-2"><strong>Order Id:</strong> {event.order_id}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Profile;
