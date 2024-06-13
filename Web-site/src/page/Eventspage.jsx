// EventsPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGetEventQuery } from '../redux/api/EventApi';

// EventCard component for displaying individual events
const EventCard = ({ event, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="bg-white group shadow-md rounded-md mt-7 p-4 mb-4 flex flex-col md:items-center md:flex-row"
    >
        {/* Left section containing the event image */}
        <div className="md:w-1/3 md:mr-4 mb-4 md:mb-0">
            <img
                src={`http://localhost:5000/${event.event_img}`}
                alt={event.event_title}
                className="w-full h-auto rounded-md group-hover:scale-110 transition-all duration-200"
            />
        </div>

        {/* Right section containing event details */}
        <div className="flex-1 mt-10 space-y-3">
            {/* Event title */}
            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl flex justify-center mb-7 p-4 mx-20 rounded-md shadow-md bg-gray-200 text-blue-900 font-bold animated-line"
            >
                {event.event_title}
            </motion.h2>

            {/* Event location */}
            <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-gray-700 mb-2 ml-20 text-lg"
            >
                <strong className="font-bold">Main Location:</strong> {event.event_location}
            </motion.p>

            {/* Event description */}
            <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-4 text-gray-700 ml-20 text-lg"
            >
                <strong className="font-bold">Main Description:</strong> {event.event_desc}
            </motion.p>

            {/* View Details button */}
            <div className="flex justify-start ml-20">
                <Link
                    to={`/details/${event._id}`}
                    className="text-lg px-8 py-2 rounded hover:bg-blue-800 cursor-pointer transition-all duration-300 bg-blue-900 text-white font-bold"
                >
                    View Details
                </Link>
            </div>
        </div>
    </motion.div >
);

// EventsPage component to display a list of events
const EventsPage = () => {
    // Fetching data using the useGetEventQuery hook
    const { data, isLoading, isError } = useGetEventQuery();

    // Handle loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Handle error state
    if (isError) {
        return <div>Error loading events</div>;
    }

    // Render the events if data is available
    return (
        <div className="p-4 mx-20 md:p-8">
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2 }}
                className="text-3xl text-center text-teal-500 font-bold mt-10 mb-10"
            >
                Upcoming Events
            </motion.h1>
            {data && data.result.map((event, index) => (
                <EventCard key={event._id} event={event} delay={index * 0.3} />
            ))}
        </div>
    );
};

export default EventsPage;
