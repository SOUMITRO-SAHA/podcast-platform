import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./slices/userSlice";
import { Provider } from "react-redux";

// Store
const store = configureStore({
	reducer: {
		user: useReducer,
	},
});

// Creating the Store Provider:
const StoreProvider = ({ children }) => (
	<Provider store={store}>{children}</Provider>
);

export default StoreProvider;
