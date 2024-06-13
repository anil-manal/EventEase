import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/api/authApi";

const OrganizerNavbar = () => {


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
        <>
            <nav className={`bg-teal-500 p-4 px-10 text-white  `}>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-8 lg:gap-12">
                        <div className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
                            EventEase
                        </div>
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Search"
                                className="p-2 border rounded mr-2 md:w-[300px] lg:w-[500px]"
                            />
                            <button className="bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded  transition-colors">
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <Link to="/eventsPage" className="hover:text-gray-300">
                            Events
                        </Link>
                        <Link to="/org/create-event" className="hover:text-gray-300">
                            Create-Event
                        </Link>
                        <Link to='/org' className="hover:text-gray-300">Organnizer Events</Link>
                        {/* User profile image and dropdown code goes here */}
                        <div className="hidden sm:block ml-4 mr-5">
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


                        <Link to='/org/record' className="hover:text-gray-300">Records</Link>


                    </div>
                </div>
            </nav>
        </>
    );
};

export default OrganizerNavbar;
