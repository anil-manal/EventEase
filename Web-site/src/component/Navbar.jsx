import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const { auth } = useSelector(state => state.auth)
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
                        {
                            auth && auth.type === "organizer" && <Link to="/org/qr-scanner">Scanner</Link>
                        }

                        <Link to="/eventsPage" className="hover:text-gray-300">
                            Events
                        </Link>

                        {
                            !auth ? (
                                <Link to="/login" className="hover:text-gray-300">
                                    Login
                                </Link>
                            ) : auth && auth.type === "user" ? (
                                <Link to='/user-profile' className="hover:text-gray-300">Profile</Link>
                            ) : auth && auth.type === "admin" ? (
                                <Link to='/admin' className="hover:text-gray-300">Profile</Link>
                            ) : (
                                <Link to='/org' className="hover:text-gray-300">Profile</Link>
                            )
                        }


                        {
                            !auth ? <Link to="/register" className="hover:text-gray-300">
                                Register
                            </Link> : <Link to='/feedback' className="hover:text-gray-300">Feedback</Link>
                        }

                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
