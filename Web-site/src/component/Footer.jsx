import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return <>
        <footer className="bg-teal-500 p-8 text-white">
            <div className="flex justify-between">
                <div>
                    <h3 className="text-xl font-bold mb-4">Stay Connected</h3>
                    <p className="text-gray-300">Follow us on social media for the latest updates and announcements.</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-1">Contact Information</h3>
                    <p className=" text-lg font-bold mb-4 text-center hover:text-gray-300 transition-all duration-200  ">
                        <Link to="/feedback" className='border-b-2'>Go to Feedback Page</Link>
                    </p>
                    <p className="text-gray-300">Email: info@yourwebsite.com</p>
                    <p className="text-gray-300">Phone: +1 (123) 456-7890</p>
                </div>
            </div>
            <div className="mt-8">
                <p className="text-gray-300 text-center">© 2024 Your Website. All rights reserved.</p>
            </div>
        </footer>
    </>
}

export default Footer