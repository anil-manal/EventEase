import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v2/user", credentials: "include" }),
    tagTypes: ["user"],
    endpoints: (builder) => {
        return {


            // create new event code
            addEvent: builder.mutation({
                query: eventData => {
                    return {
                        url: "/create-event",
                        method: "POST",
                        body: eventData
                    }
                },
                invalidatesTags: ["Event"],
                transformErrorResponse: (err, { response }) => {
                    if (response.status === 401) {
                        return 401
                    }
                    return err

                },
            }),


            getUserBookedEvevts: builder.query({
                query: id => {
                    return {
                        url: `/getUserBookedEvents/${id}`,
                        method: "GET"
                    }
                },
                providesTags: ["Event"],
                transformResponse: data => data.result
            }),

            generateQrCode: builder.mutation({
                query: userData => {
                    return {
                        url: `/generateQrCode/${userData._id}`,
                        method: "POST",
                        body: userData
                    }
                },
                providesTags: ["Event"],
            }),
            updateUserCreatedEvevts: builder.mutation({
                query: eventData => {
                    return {
                        url: `/getUserCreatedEvents/${eventData._id}`,
                        method: "PUT",
                        body: eventData
                    }
                },
                invalidatesTags: ["Event"]
            }),
            deleteUserCreatedEvevts: builder.mutation({
                query: id => {
                    return {
                        url: `/deleteUserCreatedEvents/${id}`,
                        method: "DELETE"
                    }
                },
                invalidatesTags: ["Event"]
            }),


        }
    }
})

export const { useAddEventMutation, useGetUserBookedEvevtsQuery, useGenerateQrCodeMutation, useUpdateUserCreatedEvevtsMutation, useDeleteUserCreatedEvevtsMutation } = userApi
