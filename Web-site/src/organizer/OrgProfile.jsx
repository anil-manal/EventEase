import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useGetOrgCreatedEventQuery } from '../redux/api/orgApi';

const OrgProfile = () => {
    const { auth } = useSelector((state) => state.auth);
    const { data: events } = useGetOrgCreatedEventQuery(auth.user_id);



    return (
        <div>



            {/* userBooked Events */}
            <div className="mt-8 mx-4 my-10 shadow-2xl px-10">
                {/* <h2 className="text-3xl font-bold mb-4 text-center">Your Created Events</h2> */}
                <h1 className="text-4xl text-teal-500 font-bold text-center mb-8">Your Created Event</h1>

                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-10">
                    {events && events.map((event, index) => (
                        <div key={index} className="bg-cream-light rounded-lg overflow-hidden shadow-md hover:shadow-lg">
                            <div className="p-4 flex flex-col justify-center items-center">
                                <h3 className="text-2xl mb-4 font-bold">{event.event_title}</h3>
                                <p className="text-gray-600 mb-2"><strong>Event Guest:</strong> {event.event_guest}</p>
                                <p className="text-gray-600 mb-2"><strong>Event Date:</strong> {event.event_date}</p>
                                <p className="text-gray-600 mb-2"><strong>Event Time:</strong> {event.event_time}</p>
                                <p className="text-gray-600 mb-2"><strong>Event Price:</strong> {event.event_price}</p>
                                <p className="text-gray-600 mb-2"><strong>Event:</strong> {event.active ? "Live" : "Not Live"}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default OrgProfile;
