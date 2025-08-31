import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    displayName: null,
    email: null,
    dateOfBirth: null,
    phoneNumber: null,
    avatarUrl: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserProfileInfo: (state, action) => {
            state.displayName = action.payload.displayName;
            state.email = action.payload.email;
            state.dateOfBirth = action.payload.dateOfBirth;
            state.phoneNumber = action.payload.phoneNumber;
            state.avatarUrl = action.payload.avatarUrl;
        },
        clearUserProfileInfo: (state) => {
            state.displayName = null;
            state.email = null;
            state.dateOfBirth = null;
            state.phoneNumber = null;
            state.avatarUrl = null;
        },
    },
});

export const { setUserProfileInfo, clearUserProfileInfo } = userSlice.actions;
export default userSlice.reducer;