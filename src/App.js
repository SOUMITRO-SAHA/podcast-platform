import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Podcasts from "./pages/Podcasts";
import PrivateRoutes from "./pages/PrivateRoutes";
import Profile from "./pages/Profile";
import SignInSignUp from "./pages/SignInSignUp";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/userSlice";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
			// If User Authenticated
			if (user) {
				const unsubscribeSnapshot = onSnapshot(
					doc(db, "users", user.uid),
					(userDoc) => {
						if (userDoc.exists()) {
							const userData = userDoc.data();
							dispatch(
								setUser({
									name: userData.name,
									email: userData.email,
									uid: userData.uid,
									profilePic: userData.profilePic,
								})
							);
						}
					},
					(error) => {
						console.log("Error: " + error);
						toast.error(error.message);
					}
				);

				return () => {
					unsubscribeSnapshot();
				};
			}
		});

		return () => {
			unsubscribeAuth();
		};
	}, []);
	return (
		<div className='App'>
			<ToastContainer />
			<Routes>
				<Route path='/' element={<SignInSignUp />} />
				<Route path='/profile' element={<Profile />} />
				<Route element={<PrivateRoutes />}>
					<Route path='/podcasts' element={<Podcasts />} />
					<Route path='/create-podcast' />
					<Route path='/podcast/:podcastId' />
					<Route path='/podcast/:podcastId/create-episode' />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
