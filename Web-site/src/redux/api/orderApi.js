import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v2/order" }),
    tagTypes: ["order"],
    endpoints: (builder) => {
        return {
            initiateOrder: builder.mutation({
                query: orderData => {
                    return {
                        url: "/initiate-order",
                        method: "POST",
                        body: orderData
                    }
                },
                // transformResponse:data

            }),
            placeOrder: builder.mutation({
                query: orderData => {
                    return {
                        url: "/place-order",
                        method: "POST",
                        body: orderData
                    }
                },
                invalidatesTags: ["order"]
            }),
            qrChecking: builder.mutation({
                query: order_id => {
                    return {
                        url: `/qrChecking/${order_id}`,
                        method: "POST"
                    }
                },
                invalidatesTags: ["order"],
                transformResponse: data => data.result
            }),
        }
    }
})

export const { useInitiateOrderMutation, usePlaceOrderMutation, useQrCheckingMutation } = orderApi
