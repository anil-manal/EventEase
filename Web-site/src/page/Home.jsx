// Home.js
import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link, useNavigate } from 'react-router-dom';
import { useGetDisplayEventQuery } from '../redux/api/EventApi';


const HeroSection = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true });
    const navigate = useNavigate()
    useEffect(() => {
        if (inView) {
            controls.start({ opacity: 1, x: 0 });
        }
    }, [controls, inView]);



    return (
        <motion.section
            className="relative p-8 overflow-hidden mt-10 bg-white"
            initial={{ opacity: 0, x: -100 }}
            animate={controls}
            transition={{ duration: 3 }}
            ref={ref}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                <motion.div
                    className="md:order-1"
                    initial={{ opacity: 0, x: -100 }}
                    animate={controls}
                    transition={{ duration: 3 }}
                >
                    <img
                        src="https://img.freepik.com/free-vector/students-having-fun-illustration_335657-446.jpg?w=996&t=st=1704432867~exp=1704433467~hmac=69cc6f6f2ec96e3278d5188e192fdddd99c4e3e109179214846351e2d977fb7c"
                        alt="Victor Image"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
                <motion.div
                    className="md:order-2 px-4 md:px-8"
                    initial={{ opacity: 0, x: 100 }}
                    animate={controls}
                    transition={{ duration: 3 }}
                >
                    <motion.h2 className="text-4xl font-bold mb-4 text-teal-800"
                        initial={{ opacity: 0, x: -100 }}
                        animate={controls}
                        transition={{ duration: 3, delay: 1 }}
                    >
                        Empowering Events, Inspiring Moments
                    </motion.h2>
                    <motion.p className="text-lg mb-6 text-gray-700"
                        initial={{ opacity: 0, x: -100 }}
                        animate={controls}
                        transition={{ duration: 3, delay: 1.3 }}
                    >
                        Welcome to an immersive experience where innovation, creativity, and community converge.
                    </motion.p>
                    <motion.p className="text-gray-700"
                        initial={{ opacity: 0, x: -100 }}
                        animate={controls}
                        transition={{ duration: 3, delay: 1.5 }}
                    >
                        Join us in creating unforgettable memories. Explore, connect, and be part of something extraordinary.
                    </motion.p>
                    <motion.button className="mt-4 bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-800 transition-colors"
                        initial={{ opacity: 0, x: -100 }}
                        animate={controls}
                        transition={{ duration: 3, delay: 1.7 }}
                        onClick={e => navigate("/event/create-event")}
                    >
                        Create Event
                    </motion.button>

                </motion.div>
            </div>
        </motion.section>
    );
};

const EventCard = ({ event_img, event_title, event_date, event_location, event_desc, _id }) => {
    // Function to truncate the description after a certain number of lines
    const truncateDescription = (text, maxLines) => {
        const lines = text.split('\n');
        if (lines.length > maxLines) {
            return lines.slice(0, maxLines).join(' ') + '...';
        }
        return text;
    };

    return (
        <div className="flex-1 p-4 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 h-[500px]">
            <div className="relative overflow-hidden h-[200px] mb-4">
                <img src={`http://localhost:5000/${event_img}`} alt="Event" className="w-full h-full object-cover rounded-md" />
            </div>
            <div className="bg-gray-100 p-4 rounded-md h-[250px] flex flex-col justify-between">
                <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-blue-900">{event_title}</h3>
                    <p className="text-gray-600 mb-2">{event_date}</p>
                    <p className="text-gray-600 mb-2">{event_location}</p>
                    <p className="text-sm text-gray-700 overflow-hidden line-clamp-3">
                        {event_desc}
                    </p>
                </div>
                <Link to={`/details/${_id}`} className=" text-white py-2 px-4 rounded bg-blue-900 hover:bg-blue-800 transition-colors">View Details</Link>
            </div>
        </div>
    );
};

const UpcomingEvents = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true });
    const { data } = useGetDisplayEventQuery(6)

    useEffect(() => {
        if (inView) {
            controls.start({ opacity: 1, y: 0 });
        }
    }, [controls, inView]);

    return (
        <motion.section
            className="p-8 mt-7 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 2 }}
            ref={ref}
        >
            <motion.h2 className="text-4xl font-extrabold mb-12  text-teal-600"
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                transition={{ duration: 2, delay: 2 }}
            >
                Discover the Upcoming Events
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data && data.result.map((event, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 2, delay: index * 0.4 }}
                    >
                        <EventCard {...event} />
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

const Carousel = () => {
    const { data } = useGetDisplayEventQuery(4)

    const carouselSettings = {
        centerMode: true,
        centerPadding: "20%",
        slidesToShow: 1,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
        dots: true, // Add this to show navigation dots
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],

    };

    return <>
        <div className="w-full mt-5 py-10 bg-slate-200">
            <Slider {...carouselSettings}>
                {data && data.result.map((item, index) => (
                    <div key={index} className="px-24">
                        <Link to={`/details/${item._id}`} className="flex justify-center items-center">
                            <img
                                src={`http://localhost:5000/${item.event_img}`}
                                alt={item.event_title}
                                className="w-full h-80 ease-linear object-cover rounded-md"
                            />
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    </>
}

const Home = () => {



    return (
        <div className="bg-gray-100 min-h-screen overflow-hidden">

            <Carousel />
            <HeroSection />

            {/* Upcoming Events */}
            <UpcomingEvents />


        </div>
    );
};

export default Home;






