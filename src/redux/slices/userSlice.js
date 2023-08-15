const { createSlice } = require("@reduxjs/toolkit");

// Initial State:
const initialState = {
	user: null,
};

// Creating Slice
const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		clearUser: (state, action) => {
			state.user = null;
		},
	},
});

// Creating the Actions
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
