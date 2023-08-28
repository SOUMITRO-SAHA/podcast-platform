import React from "react";
import { useSelector } from "react-redux";
import Header from "../Components/Header";
import PodcastCard from "../Components/Podcast/PodcastCard";

const Profile = () => {
	const user = useSelector((state) => state.user.user);
	const podcasts = useSelector((state) => state.podcasts.podcasts);
	return (
		<main>
			{/* Header */}
			<Header />

			{/* Other Section */}
			<section className='w-full my-8'>
				<div className='flex flex-col items-center justify-center gap-4'>
					<h3 className='text-2xl'>Profile</h3>
					{/* Profile Here */}
					<div className='bg-pg w-[200px] h-[300px] rounded'>
						{user?.profilePic && (
							<img
								src={user?.profilePic}
								alt={user?.name}
								className='w-[200px] h-[300px] rounded'
							/>
						)}
					</div>
				</div>

				<div className='mt-8'>
					<h3 className='text-2xl flex justify-center my-8'>Your Podcasts</h3>
					{/* Profile Here */}
					<div className='flex justify-center gap-6'>
						{podcasts?.map((item) => (
							<PodcastCard item={item} />
						))}
					</div>
				</div>
			</section>
		</main>
	);
};

export default Profile;
