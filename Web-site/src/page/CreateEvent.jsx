// src/components/EventForm.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useAddEventMutation } from '../redux/api/userApi';
import { useLogoutMutation } from '../redux/api/authApi';

const EventForm = () => {

    const [addEventFn, { isSuccess, isError, error }] = useAddEventMutation();
    const [eventData, setEventData] = useState({});
    const [logoutFn] = useLogoutMutation();


    const handleAdd = (e) => {
        const { name, value, files, type } = e.target;

        if (type === 'file') {
            setEventData({ ...eventData, [name]: files[0] });
        } else {
            setEventData({ ...eventData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const fd = new FormData();
        fd.append('event_title', eventData.event_title);
        fd.append('event_desc', eventData.event_desc);
        fd.append('event_time', eventData.event_time);
        fd.append('event_date', eventData.event_date);
        fd.append('event_price', eventData.event_price);
        fd.append('event_img', eventData.event_img);
        fd.append('event_guest', eventData.event_guest);
        fd.append('event_location', eventData.event_location);

        addEventFn(fd);

    };
    useEffect(() => {
        if (isSuccess) {
            toast("EVENT CREATED")
        }
    }, [isSuccess])
    useEffect(() => {
        if (isError) {
            if (error.status === 400) {
                logoutFn()
                toast("Logout")
            }
        }
    }, [isError])

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto mt-16 max-w-full px-4 sm:px-8 md:px-12 lg:px-20"
        >
            <h1 className="text-4xl text-teal-500 font-bold text-center mb-8">Create Event</h1>

            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">


                <div className="mb-6 flex flex-wrap">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="w-full sm:w-1/2 pr-2 mb-4 sm:mb-0"
                    >
                        <label htmlFor="eventTitle" className="block text-gray-700 text-lg font-bold mb-2">
                            Event Title
                        </label>
                        <input
                            type="text"
                            id="eventTitle"
                            onChange={handleAdd}
                            name="event_title"
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter Event Title"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="w-full sm:w-1/2 pl-2"
                    >
                        <label htmlFor="eventGuests" className="block text-gray-700 text-lg font-bold mb-2">
                            Event Guests
                        </label>
                        <input
                            type="text"
                            id="eventGuests"
                            onChange={handleAdd}
                            name="event_guest"
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter Number of Guests"
                        />
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-6"
                >
                    <label htmlFor="event_Desc" className="block text-gray-700 text-lg font-bold mb-2">
                        Event Description
                    </label>
                    <input
                        type="text"
                        id="event_Desc"
                        name="event_desc"
                        onChange={handleAdd}
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter Event Description"
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-6"
                >
                    <label htmlFor="eventImage" className="block text-gray-700 text-lg font-bold mb-2">
                        Event Image URL
                    </label>
                    <input
                        type="file"
                        id="eventImage"
                        onChange={handleAdd}
                        accept="image/*"
                        name="event_img"
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter Event Image URL"
                    />
                </motion.div>

                <div className="mb-6 flex flex-wrap">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="w-full sm:w-1/2 pr-2 mb-4 sm:mb-0"
                    >
                        <label htmlFor="eventDate" className="block text-gray-700 text-lg font-bold mb-2">
                            Event Date
                        </label>
                        <input
                            type="date"
                            id="eventDate"
                            onChange={handleAdd}
                            name="event_date"
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        className="w-full sm:w-1/2 pl-2"
                    >
                        <label htmlFor="eventTime" className="block text-gray-700 text-lg font-bold mb-2">
                            Event Time
                        </label>
                        <input
                            type="time"
                            id="eventTime"
                            onChange={handleAdd}
                            name="event_time"
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mb-6"
                >
                    <label htmlFor="eventlocation" className="block text-gray-700 text-lg font-bold mb-2">
                        Event Location
                    </label>
                    <input
                        type="text"
                        id="eventlocation"
                        onChange={handleAdd}
                        name="event_location"
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter Event Price"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="mb-6"
                >
                    <label htmlFor="eventPrice" className="block text-gray-700 text-lg font-bold mb-2">
                        Event Price
                    </label>
                    <input
                        type="number"
                        id="eventPrice"
                        onChange={handleAdd}
                        name="event_price"
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter Event Price"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mb-6 flex w-full justify-center mt-10"
                >
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-blue-900 hover:bg-blue-800 w-[300px] text-xl text-white font-bold py-4 px-4 rounded transition-all duration-300 focus:outline-none focus:shadow-outline"
                    >
                        Create Event
                    </button>
                </motion.div>
            </form>
        </motion.div >
    );
};

export default EventForm;
