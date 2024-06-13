import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const orgApi = createApi({
    reducerPath: "orgApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v2/org" }),
    tagTypes: ["user"],
    endpoints: (builder) => {
        return {

            getOrgCreatedEvent: builder.query({
                query: id => {
                    return {
                        url: `/getUserCreatedEvents/${id}`,
                        method: "GET"
                    }
                },
                providesTags: ["Event"],
                transformResponse: data => data.result,
                transformErrorResponse: (err, { response }) => {
                    if (response.status === 401) {
                        return 401
                    }
                    return err

                },
            }),

            getAllBookedEvents: builder.query({
                query: id => {
                    return {
                        url: `/getUserBookedEvents/${id}`,
                        method: "GET"
                    }
                },
                providesTags: ["Event"],
                transformResponse: data => data.result
            })


        }
    }
})

export const { useGetOrgCreatedEventQuery, useLazyGetAllBookedEventsQuery, useGetAllBookedEventsQuery } = orgApi
