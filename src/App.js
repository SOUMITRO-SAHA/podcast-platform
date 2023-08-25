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
import CreatePodcast from "./pages/CreatePodcast";
import PodcastDetails from "./pages/PodcastDetails";
import CreateAnEpisodePage from "./pages/CreateAnEpisodePage";

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
	}, [dispatch]);

	return (
		<div className='App'>
			<ToastContainer />
			<Routes>
				<Route path='/' element={<SignInSignUp />} />
				<Route element={<PrivateRoutes />}>
					<Route path='/profile' element={<Profile />} />
					<Route path='/podcasts' element={<Podcasts />} />
					<Route path='/create-podcast' element={<CreatePodcast />} />
					<Route path='/podcast/:podcastId' element={<PodcastDetails />} />
					<Route
						path='/podcast/:podcastId/create-episode'
						element={<CreateAnEpisodePage />}
					/>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
