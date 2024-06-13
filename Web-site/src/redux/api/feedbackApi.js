import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const feedbackApi = createApi({
    reducerPath: "feedbackApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v2/feedback" }),
    tagTypes: ["feedback"],
    endpoints: (builder) => {
        return {
            feedback: builder.mutation({
                query: feedbackData => {
                    return {
                        url: "/feedback",
                        method: "POST",
                        body: feedbackData
                    }
                },
                providesTags: ["feedback"]
            }),



        }
    }
})

export const { useFeedbackMutation } = feedbackApi
