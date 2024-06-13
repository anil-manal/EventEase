// Details.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useSelectedEventDetailedQuery } from '../redux/api/EventApi';
import { Link, useParams } from 'react-router-dom';

const Details = () => {
    const { eventId } = useParams();
    const { data } = useSelectedEventDetailedQuery(eventId)



    return (
        <div className="container mx-auto p-8">
            {
                data &&
                <motion.div
                    className="grid grid-cols-1 gap-20 md:grid-cols-2 items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                    {/* Event Image */}
                    <div>
                        <img
                            src={`http://localhost:5000/${data.result.event_img}`}
                            alt="Event"
                            className="w-full h-auto rounded-md shadow-md"
                        />
                    </div>

                    {/* Event Details */}
                    <motion.div className="animated-details space-y-3">
                        <motion.h1
                            className="text-2xl flex justify-center mb-10 box-border p-5 rounded-md shadow-md bg-gray-200 font-bold text-blue-900 animated-line"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut', delay: 0.1 }}
                        >
                            {data.result.event_title}
                        </motion.h1>
                        <motion.p
                            className="text-lg mb-2 animated-line-delay-1"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut', delay: 0.2 }}
                        >
                            <strong>Main Guest:</strong> {data.result.event_guest}
                        </motion.p>
                        <motion.p
                            className="text-lg mb-2 animated-line-delay-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut', delay: 0.4 }}
                        >
                            <strong>Date:</strong> {data.result.event_date}
                        </motion.p>
                        <motion.p
                            className="text-lg mb-2 animated-line-delay-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut', delay: 0.6 }}
                        >
                            <strong>Timing:</strong> {data.result.event_time}
                        </motion.p>
                        <motion.p
                            className="text-lg mb-2 animated-line-delay-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut', delay: 0.8 }}
                        >
                            <strong>Description:</strong> {data.result.event_desc}
                        </motion.p>
                        <motion.p
                            className="text-lg mb-2 animated-line-delay-5"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut', delay: 1 }}
                        >
                            <strong>Organizer:</strong> xyz
                        </motion.p>
                        <motion.p
                            className="text-lg mb-2 animated-line-delay-6"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut', delay: 1.2 }}
                        >
                            <strong>Location:</strong> {data.result.event_location}
                        </motion.p>
                        <motion.p
                            className="text-lg mb-2 animated-line-delay-7"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut', delay: 1.4 }}
                        >
                            <strong>Price:</strong> {data.result.event_price}
                        </motion.p>

                        {/* Payment Button */}
                        {/* // Assuming the existing code for Details component */}

                        <motion.div

                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut', delay: 1.6 }}
                        >
                            <Link

                                type="submit"
                                to={`/event/payment-event/${data.result._id}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-white flex justify-center  bg-blue-900 p-5 rounded-md border-none w-full cursor-pointer text-xl font-bold"
                                style={{ transitionProperty: 'background-color, color, transform' }}

                            >
                                Payment
                            </Link>
                        </motion.div>

                    </motion.div>
                </motion.div>
            }
        </div >
    );
};

export default Details;
