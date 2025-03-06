import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {

    email: Cookies.get("email") || null,
}

const authSlice = createSlice({

    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.email = action.payload.email;
            Cookies.set("email", action.payload.email, { expires: 1 });
        },
        logout: (state) => {
            state.email = null;
            Cookies.remove("email");
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
