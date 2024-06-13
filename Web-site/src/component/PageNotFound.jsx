import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PageNotFound = () => {
    const variants = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <div className="flex h-screen px-48 gap-10">
            {/* Left side with vector image */}
            <motion.div className="flex-1 p-6 hidden lg:flex items-center justify-center" initial="hidden" animate="visible" variants={{ ...variants, x: 100 }} transition={{ duration: 1 }}>
                {/* Increase the size of the image for a larger appearance and remove background color */}
                <img
                    src="https://img.freepik.com/free-vector/flat-404-error-template_23-2147746980.jpg?size=800&ext=jpg&ga=GA1.1.1426322990.1706441094&semt=ais"
                    className="w-full max-h-96"
                    alt="Vector Image"
                />
            </motion.div>

            {/* Right side with text content */}
            <motion.div className="flex-1 flex flex-col items-center justify-center p-6" initial="hidden" animate="visible" variants={{ ...variants, x: -100 }} transition={{ duration: 1, delay: 0.5 }}>
                <h1 className="text-5xl font-bold text-red-700 mb-10">PAGE NOT FOUND</h1>
                <p className="text-gray-700 text-center mb-4">
                    Oops! It seems like an error has occurred. The page you are trying to access may have been moved, deleted, or it never existed in the first place.
                </p>
                <p className="text-gray-700 text-center mb-4">
                    Don't worry; you can navigate back to the home page using the button below. If the issue persists, please contact support for assistance.
                </p>

                {/* Button to go back to the home page */}
                <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600">
                    Go to Home
                </Link>
            </motion.div>
        </div>
    );
};

export default PageNotFound;
