import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../Components/Button";
import Header from "../Components/Header";
import InputComponent from "../Components/Input";
import { auth, db } from "../firebase";
import { setSignInStatus } from "../redux/slices/statusSlice";
import { setUser } from "../redux/slices/userSlice";

const SignInSignUp = () => {
	const [isSignIn, setIsSignIn] = useState(false);
	const [email, setEmail] = useState("");
	const [fullName, setFullName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const message = isSignIn ? "Sign In" : "Sign Up";

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const signUpHandler = async () => {
		// Setting the Loading State:
		setLoading(true);
		if (password === confirmPassword && password.length >= 6) {
			try {
				const userCredential = await createUserWithEmailAndPassword(
					auth,
					email,
					password
				);
				const user = userCredential.user;
				console.log("User", user);

				// Save the User into the Store:
				await setDoc(doc(db, "user", user.uid), {
					name: fullName,
					email: user.email,
					uid: user.uid,
				});

				// Now Store the User into the Redux:
				dispatch(
					setUser({
						name: fullName,
						email: user.email,
						uid: user.uid,
					})
				);

				dispatch(setSignInStatus());
				// Let the User Know that He/She is Successfully Signed in
				toast.success("Signed in successfully");

				// Also Updating the Loading State:
				setLoading(false);

				// Now Navigate to the Profile Page:
				navigate("/profile");
			} catch (error) {
				console.log(error.message);
				toast.error(error.message);
				// If any Error Occers the Update the Loading State:
				setLoading(false);
			}
		} else {
			if (password === confirmPassword) {
				toast.error(
					"Please make sure your password and confirm password are same."
				);
			}
			if (password.length < 6) {
				toast.error("The password must be at least 6 characters");
			}

			// Also Updating the Loading State:
			setLoading(false);
		}
	};
	const signInHandler = async () => {
		setLoading(true);
		if (email && password) {
			try {
				const userCredential = await signInWithEmailAndPassword(
					auth,
					email,
					password
				);

				const user = userCredential.user;
				if (!user) {
					throw new Error("Something went wrong, While trying to sign in");
				}
				// Get the User into the Store:
				const userDoc = await getDoc(doc(db, "users", user.uid));
				const userData = userDoc.data();
				// Todo: UserData is not comming. Debug Later.
				console.log("User Data", userData);

				// Now Store the User into the Redux:
				dispatch(
					setUser({
						name: userData?.name,
						email: user.email,
						uid: user.uid,
						profilePic: userData?.profilePic,
					})
				);
				// Also Updating the Loading State:
				setLoading(false);

				// Let the User Know that He/She is Successfully Logged In
				toast.success("Successfully Logged In");
				// Now Navigate to the Profile Page:
				navigate("/podcasts");
			} catch (error) {
				toast.error(error.message);
				// If any Error Occers the Update the Loading State:
				setLoading(false);
			}
		} else {
			// Also Updating the Loading State:
			setLoading(false);

			// Let the User Know that He/She is Successfully Logged In
			toast.error("Please enter your email and Password");
		}
	};
	const btnSubmitHandler = isSignIn ? signInHandler : signUpHandler;

	return (
		<main>
			<Header />
			<div className='flex flex-col justify-center items-center mt-16'>
				<div className='text-2xl text-center my-6 text-white'>{message}</div>
				{/* Input Sections */}

				<div className='w-[80%] md:w-[60%] flex flex-col justify-center gap-5'>
					{!isSignIn && (
						<InputComponent
							state={fullName}
							setState={setFullName}
							placeholder='Full Name'
							type='text'
							required='required'
						/>
					)}

					<InputComponent
						state={email}
						setState={setEmail}
						type='email'
						placeholder='Email'
						required='required'
					/>
					<InputComponent
						state={password}
						setState={setPassword}
						type='password'
						placeholder='Password'
						required='required'
					/>
					{!isSignIn && (
						<InputComponent
							state={confirmPassword}
							setState={setConfirmPassword}
							placeholder='Confirm Password'
							type='password'
							required='required'
						/>
					)}

					<Button
						text={loading ? "Loading..." : message}
						disabled={loading}
						onClick={btnSubmitHandler}
					/>

					<div className='text-purple-gray justify-center flex gap-3'>
						<span>Already have an account?</span>
						<button
							className='underline cursor-pointer text-white'
							onClick={() => setIsSignIn((prev) => !prev)}
						>
							{isSignIn ? "Sign Up" : "Sign In"}
						</button>
					</div>
				</div>
			</div>
		</main>
	);
};

export default SignInSignUp;
