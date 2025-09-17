// oauthSlice.js
import { createSlice } from '@reduxjs/toolkit';


const oauthSignupSlice = createSlice({
    name: 'oauthSignup',
    initialState: {
        email: '',
        name: '',
        status: '',
        isExistingUser: false,
        requiredFields: [],
    },
    reducers: {
        setOAuthSignupData(state, action) {
            return { ...state, ...action.payload };
        },
        clearOAuthSignupData(state) {
            return {
                email: '',
                name: '',
                status: '',
                isExistingUser: false,
                requiredFields: [],
            };
        },
    },
});

export const { setOAuthSignupData, clearOAuthSignupData } = oauthSignupSlice.actions;
export default oauthSignupSlice.reducer;


