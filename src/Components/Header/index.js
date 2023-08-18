import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";

const Header = () => {
	const location = useLocation();
	const currentPath = location.pathname;
	const [user] = useAuthState(auth);
	const { message } = useSelector((state) => state.status);

	const logOutHandler = async () => {
		try {
			await signOut(auth);
			toast.success("Successfully Log Out");
		} catch (error) {
			toast.error(error.message);
		}
	};

	const SignInSignOutElement = (
		<Link
			className={`${
				currentPath === "/" ? "active" : ""
			} hover:text-white hover:transition cursor-pointer bg-gray text-theme p-1.5 px-5 rounded-full  hover:bg-theme`}
			to='/'
		>
			{message}
		</Link>
	);
	const LogOutElement = (
		<Link
			className={`hover:text-white hover:transition cursor-pointer bg-gray text-theme p-1.5 px-5 rounded-full  hover:bg-theme`}
			to='/'
			onClick={logOutHandler}
		>
			Log Out
		</Link>
	);

	return (
		<nav className='container mx-auto max-w-7xl'>
			<div className='bg-blue absolute w-[800px] h-[150px] -top-[100px] blur-[120px] -z-10 md:left-[28%] md:-top-[120px]' />
			<div className='flex justify-center items-center gap-6 p-5 text-lg text-gray'>
				<Link
					className={`${
						currentPath === "/podcasts" ? "active" : ""
					} hover:text-white hover:transition cursor-pointer`}
					to='/podcasts'
				>
					Podcasts
				</Link>
				<Link
					className={`${
						currentPath === "/create-podcast" ? "active" : ""
					} hover:text-white hover:transition cursor-pointer`}
					to='/create-podcast'
				>
					Start A Podcast
				</Link>
				<Link
					className={`${
						currentPath === "/profile" ? "active" : ""
					} hover:text-white hover:transition cursor-pointer`}
					to='/profile'
				>
					Profile
				</Link>

				{/* Conditional Rendering */}
				{user ? LogOutElement : SignInSignOutElement}
			</div>
		</nav>
	);
};

export default Header;
