import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../redux/api/authApi';
import { toast } from 'react-toastify';

const adminNavbar = () => {
    const { auth } = useSelector((state) => state.auth);
    const [logoutFn, { isSuccess }] = useLogoutMutation();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate()
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };
    useEffect(() => {
        if (isSuccess) {
            navigate("/login")
            toast("logout")
        }
    }, [isSuccess])


    return (
        <nav className="bg-gray-800  p-4 px-10 text-white">
            <div className="flex items-center justify-between">
                <div className="hidden md:flex items-center space-x-4">
                    <Link to="/" className="text-lg font-bold mr-10">
                        EventEase
                    </Link>
                </div>
                <div className="flex items-center">
                    <Link to="/eventsPage" className="hover:text-gray-300 mr-5">
                        EVENTS
                    </Link>

                    {/* User profile image and dropdown code goes here */}
                    <div className="hidden md:block ml-4 mr-5">
                        <button className="text-white" onClick={toggleDropdown}>
                            PROFILE
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-md px-5 p-2">
                                <div className="p-1 flex gap-3">
                                    <label className="text-sm text-gray-900 font-semibold">Name:</label>
                                    <div className="text-sm text-gray-600 ">{auth.fullName}</div>
                                </div>
                                <div className="p-1 flex gap-3">
                                    <label className="text-sm text-gray-900 font-semibold">Email:</label>
                                    <div className="text-xs text-gray-600">{auth.email}</div>
                                </div>

                                <div className="p-1 mt-2 ">
                                    <button className="text-black w-full bg-slate-400 rounded-lg py-1 hover:bg-slate-500 transition-all duration-200 hover:text-white" onClick={logoutFn}>
                                        Logout
                                    </button>
                                    {/* Add other links as needed */}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default adminNavbar;
