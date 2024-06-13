import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const EventApi = createApi({
    reducerPath: "EventApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1/events", credentials: "include" }),
    tagTypes: ["Event"],
    endpoints: (builder) => {
        return {



            // get all event code 
            getEvent: builder.query({
                query: eventData => {
                    return {
                        url: "/",
                        method: "GET"
                    }
                },
                providesTags: ["Event"]
            }),

            // detailed page code
            selectedEventDetailed: builder.query({
                query: eventid => {
                    return {
                        url: `/events/${eventid}`,
                        method: "GET"
                    }
                },
                providesTags: ["Event"]
            }),

            // diaplay event in slider and upcomming events
            getDisplayEvent: builder.query({
                query: (displayNo) => {
                    return {
                        url: `/display-event/${displayNo}`,
                        method: "GET",
                    }
                },
                providesTags: ["Event"]
            }),



        }
    }
})

export const {
    useGetEventQuery,
    useSelectedEventDetailedQuery,
    useGetDisplayEventQuery
} = EventApi
