import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v2/auth", credentials: "include" }),
    tagTypes: ["auth"],
    endpoints: (builder) => {
        return {
            login: builder.mutation({
                query: userData => {
                    return {
                        url: "/login",
                        method: "POST",
                        body: userData
                    }
                },

                providesTags: ["auth"],
                transformResponse: (data) => {
                    localStorage.setItem("auth", JSON.stringify(data.result))
                    return data.result
                }
            }),

            registration: builder.mutation({
                query: userData => {
                    return {
                        url: "/register",
                        method: "POST",
                        body: userData
                    }
                },
                providesTags: ["auth"]
            }),
            logout: builder.mutation({
                query: () => {
                    return {
                        url: "/logout",
                        method: "POST",
                    }
                },
                providesTags: ["auth"],
                transformResponse: (data) => {
                    data
                    localStorage.removeItem("auth")
                }
            }),



        }
    }
})

export const { useRegistrationMutation, useLogoutMutation, useLoginMutation } = authApi
