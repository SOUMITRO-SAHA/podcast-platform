import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isSignedIn: false,
	message: "Sign Up",
};

const statusSlice = createSlice({
	name: "status",
	initialState,
	reducers: {
		setSignInStatus: (state) => {
			state.isSignedIn = true;
			state.message = "Sign In";
		},
		setSignOutStatus: (state) => {
			state.isSignedIn = initialState.isSignedIn;
			state.message = initialState.message;
		},
	},
});

export const { setSignInStatus } = statusSlice.actions;
export default statusSlice.reducer;
