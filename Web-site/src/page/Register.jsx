
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRegistrationMutation } from '../redux/api/authApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [userData, setUserData] = useState({})
    const [CPassword, setCPassword] = useState('')
    const [registerfn, { isSuccess, isError }] = useRegistrationMutation()
    const navigate = useNavigate()

    const handleData = e => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    }
    const handleSubmit = e => {
        const { CPassword: CP } = CPassword

        if (userData.password === CP) {
            registerfn(userData)
        }
        else {
            toast("Password and Comform Password is not Match")
        }
    }
    useEffect(() => {
        if (isSuccess) {
            toast("REGISTION SUCCESSFULLY")
            navigate("/login")
        }
        if (isError) {
            toast.error("Please fill all data OR email is already register")
        }
    }, [isSuccess, isError])



    return (
        <motion.div
            className="py-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}

        >
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-6xl ">
                <div
                    className="hidden lg:block w-2/3 bg-cover "
                    style={{ backgroundImage: "url('https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7865.jpg?size=626&ext=jpg&ga=GA1.1.997146591.1675829529&semt=sph')" }}>
                </div>

                <motion.div className="w-full p-8 lg:w-1/2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <motion.h2 className="text-3xl font-semibold text-teal-500 text-center" whileHover={{ scale: 1.1 }}>
                        EventEase
                    </motion.h2>
                    <motion.p className="text-xl  text-teal-500 text-center" whileHover={{ scale: 1.1 }}>
                        Welcome!
                    </motion.p>
                    <motion.a
                        href="#"
                        className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="px-4 py-3">
                            {/* Replace the following SVG code with your actual SVG */}
                            <img src='https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png' className="h-6 w-6" viewBox="0 0 40 40">

                            </img>
                        </div>
                        <motion.h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold" whileHover={{ scale: 1.1 }}>
                            Sign up with Google
                        </motion.h1>
                    </motion.a>
                    <motion.div className="mt-4 flex items-center justify-between">
                        <motion.span className="border-b w-1/5 lg:w-1/4"></motion.span>
                        <motion.a href="#" className="text-xs text-center text-gray-500 uppercase" whileHover={{ scale: 1.1 }}>
                            or Register with email
                        </motion.a>
                        <motion.span className="border-b w-1/5 lg:w-1/4"></motion.span>
                    </motion.div>

                    <motion.div className="mt-4">
                        <motion.label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            whileHover={{ scale: 1.1 }}

                        >
                            Full Name
                        </motion.label>
                        <motion.input
                            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                            type="text"
                            onChange={handleData}
                            name='fullName'
                            required

                        />
                    </motion.div>

                    <motion.div className="mt-4">

                        <motion.label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            whileHover={{ scale: 1.1 }}
                        >
                            Email Address
                        </motion.label>
                        <motion.input
                            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                            type="email"
                            onChange={handleData}
                            name='email'
                            required
                        />
                    </motion.div>

                    <motion.div className="mt-4">
                        <motion.div className="flex justify-between">
                            <motion.label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                whileHover={{ scale: 1.1 }}
                            >
                                Password
                            </motion.label>

                        </motion.div>
                        <motion.input
                            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                            type="password"
                            name='password'
                            onChange={handleData}
                            required
                        />
                    </motion.div>

                    <motion.div className="mt-4">
                        <motion.div className="flex justify-between">
                            <motion.label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                whileHover={{ scale: 1.1 }}
                            >
                                Conform Password
                            </motion.label>

                        </motion.div>
                        <motion.input
                            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                            type="password"
                            name='CPassword'
                            required
                            onChange={e => setCPassword({ [e.target.name]: e.target.value })}
                        />
                        <motion.div className="mt-4">
                            <motion.label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                whileHover={{ scale: 1.1 }}
                            >
                                Conform Password
                            </motion.label>
                            <motion.div className="flex items-center">

                                <input
                                    type="radio"
                                    id="user"
                                    name="type"
                                    value="user"
                                    className="mr-2"
                                    onChange={handleData}
                                />
                                <label htmlFor="user">User</label>
                                <input
                                    type="radio"
                                    id="organizer"
                                    name="type"
                                    value="organizer"
                                    className="ml-4 mr-2"
                                    onChange={handleData}
                                />
                                <label htmlFor="organizer">Organizer</label>
                            </motion.div>
                        </motion.div>

                        <motion.div className="mt-8">
                            <motion.button
                                className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 w-full rounded "
                                whileHover={{ scale: 1.05 }}
                                onClick={handleSubmit}
                            >
                                Register
                            </motion.button>
                        </motion.div>

                    </motion.div>
                </motion.div>

            </div>
        </motion.div>
    );
};

export default Register;
