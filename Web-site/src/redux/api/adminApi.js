import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v2/admin" }),
    tagTypes: ["admin"],
    endpoints: (builder) => {
        return {
            getAllEventAdmin: builder.query({
                query: () => {
                    return {
                        url: "/admin-getAllEvent",
                        method: "GET"
                    }
                },
                providesTags: ["admin"],

            }),
            updateEventAdmin: builder.mutation({
                query: eventData => {
                    return {
                        url: `/admin-updateEvent/${eventData._id}`,
                        method: "PUT",
                        body: eventData
                    }
                },
                invalidatesTags: ["admin"],

            }),


        }
    }
})

export const { useGetAllEventAdminQuery, useUpdateEventAdminMutation } = adminApi
