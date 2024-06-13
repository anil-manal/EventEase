// AdminPage.js
import React, { useEffect } from 'react';
import { toast } from 'react-toastify'
import { useGetAllEventAdminQuery, useUpdateEventAdminMutation } from '../redux/api/adminApi';

const AdminPage = () => {

    const { data } = useGetAllEventAdminQuery()
    const [updateFn, { isSuccess, isError }] = useUpdateEventAdminMutation()

    useEffect(() => {
        if (isSuccess) {
            toast("Event Update Successfull")
        }
    }, [isSuccess])

    const handleStatusChange = (index, activeKey, event) => {

        updateFn({ ...event, active: activeKey })

    }
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <h2 className="text-3xl font-bold mb-8">All Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {data && data.result.map((event, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-2xl font-bold mb-4">{event.event_title}</h3>
                        <p><span className="font-bold">Guest:</span> {event.event_guest}</p>
                        <p><span className="font-bold">Date:</span> {event.event_date}</p>
                        <p><span className="font-bold">Time:</span> {event.event_time}</p>
                        <p><span className="font-bold">Location:</span> {event.event_location}</p>
                        <p><span className="font-bold">Event:</span> {event.active === true ? "Live" : "Not Live"}</p>
                        <div className="mt-4">
                            <select
                                value={event.active ? "active" : "not-active"}
                                onChange={(e) => handleStatusChange(index, e.target.value, event)}
                            >


                                <option value="">Select Option</option>
                                <option value="true">Active</option>
                                <option value="false">Not Active</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>


    );
};

export default AdminPage;
