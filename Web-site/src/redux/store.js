import { configureStore } from "@reduxjs/toolkit";
import { EventApi } from "./api/EventApi";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import userSlice from "./userSlice";
import { adminApi } from "./api/adminApi";
import { feedbackApi } from "./api/feedbackApi";
import { orderApi } from "./api/orderApi";
import { orgApi } from "./api/orgApi";


const reduxStore = configureStore({
    reducer: {
        [EventApi.reducerPath]: EventApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [feedbackApi.reducerPath]: feedbackApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [orgApi.reducerPath]: orgApi.reducer,
        auth: userSlice
    },

    middleware: def => [
        ...def(),
        EventApi.middleware,
        userApi.middleware,
        authApi.middleware,
        adminApi.middleware,
        feedbackApi.middleware,
        orgApi.middleware,
        orderApi.middleware
    ]
})

export default reduxStore