import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useFeedbackMutation } from '../redux/api/feedbackApi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Feedback = () => {
    const [feedbackfn, { isSuccess }] = useFeedbackMutation();
    const { auth } = useSelector(state => state.auth);
    const [feedbackData, setFeedbackData] = useState({});

    console.log(feedbackData);

    const handleData = e => {
        const { value, name } = e.target;
        setFeedbackData({ ...feedbackData, [name]: value, user_id: auth.user_id });
    };

    useEffect(() => {
        if (isSuccess) {
            setFeedbackData({}); // Clear all fields
            toast("Your Feedback has successfully been sent");
        }
    }, [isSuccess]);

    return (
        <motion.div
            className="py-16 bg-gray-100"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
        >
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                <motion.div className="flex flex-col justify-center w-full lg:w-1/3 p-8 bg-teal-500 hover:bg-teal-600 text-white" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
                    <p className="ml-6 text-lg uppercase tracking-loose">REVIEW</p>
                    <p className="text-3xl md:text-5xl my-4 leading-relaxed md:leading-snug">Leave us a feedback!</p>
                    <p className="text-sm md:text-base leading-snug">
                        Please provide your valuable feedback and something something ...
                    </p>
                </motion.div>
                {/* Left Section - Contact Form */}
                <motion.div className="w-full p-8 lg:w-2/3 " initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="text-3xl font-semibold text-center mb-4" whileHover={{ scale: 1.1 }}>
                        Feedback
                    </h2>

                    <div className="mt-12 p-6 bg-white shadow-md rounded-lg">
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Your Name
                                </label>
                                <input
                                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                    type="text"
                                    onChange={handleData}
                                    name='fullName'
                                    value={feedbackData.fullName || ''} // handle undefined case

                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Your Email
                                </label>
                                <input
                                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                    type="email"
                                    onChange={handleData}
                                    name='email'
                                    value={feedbackData.email || ''} // handle undefined case

                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Message
                                </label>
                                <textarea
                                    className="resize-none bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                    rows="3"
                                    onChange={handleData}
                                    name='message'
                                    value={feedbackData.message || ''} // handle undefined case

                                ></textarea>
                            </div>

                            <button
                                className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                whileHover={{ scale: 1.05 }}
                                onClick={() => feedbackfn(feedbackData)}
                                type='button' // Change to 'button' type
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Feedback;
