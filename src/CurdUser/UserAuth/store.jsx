import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../UserAuth/userSlice';

const store = configureStore({

    reducer: {
        auth: authReducer
    }
});

export default store;