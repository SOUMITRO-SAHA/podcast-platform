import React from "react";
import { useSelector } from "react-redux";
import Header from "../Components/Header";

const Profile = () => {
	const user = useSelector((state) => state.user.user);
	console.log(user);
	return (
		<main>
			{/* Header */}
			<Header />

			{/* Other Section */}
			<section>This is Profile Page working on this page</section>
		</main>
	);
};

export default Profile;
