import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: null,
    message: null,
};

const verifySlice = createSlice({
    name: "verify",
    initialState,
    reducers: {
        setVerifyInformation: (state, action) => {
            state.email = action.payload.email;
            state.message = action.payload.message;
        },
        clearVerifyInformation: (state) => {
            state.email = null;
            state.message = null;
        }
    },
});

export const { setVerifyInformation, clearVerifyInformation } = verifySlice.actions;
export default verifySlice.reducer;