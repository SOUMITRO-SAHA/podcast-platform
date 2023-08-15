import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
	const location = useLocation();
	const currentPath = location.pathname;

	return (
		<nav className='container mx-auto max-w-7xl'>
			<div className='bg-blue absolute w-[800px] h-[150px] -top-[100px] blur-[120px] -z-10 md:left-[28%] md:-top-[120px]' />
			<div className='flex justify-center items-center gap-6 p-5 text-lg text-gray'>
				<Link
					className={`${
						currentPath === "/" ? "active" : ""
					} hover:text-white hover:transition cursor-pointer`}
					to='/'
				>
					Sign Up
				</Link>
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
						currentPath === "/start-a-podcast" ? "active" : ""
					} hover:text-white hover:transition cursor-pointer`}
					to='/start-a-podcast'
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
			</div>
		</nav>
	);
};

export default Header;
