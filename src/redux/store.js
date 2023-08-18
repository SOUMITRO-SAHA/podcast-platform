import { combineReducers, configureStore } from "@reduxjs/toolkit";
import useReducer from "./slices/userSlice";
import { Provider } from "react-redux";
import statusReducer from "./slices/statusSlice";

// Root Reducer
const RootReducer = combineReducers({
	user: useReducer,
	status: statusReducer,
});

// Store
const store = configureStore({
	reducer: RootReducer,
});

// Creating the Store Provider:
const StoreProvider = ({ children }) => (
	<Provider store={store}>{children}</Provider>
);

export default StoreProvider;
