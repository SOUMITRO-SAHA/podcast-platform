import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Components/Header";
import InputComponent from "../Components/Input";
import PodcastCard from "../Components/Podcast/PodcastCard";
import { db } from "../firebase";
import { setPodcasts } from "../redux/slices/podcastSlice";

const Podcasts = () => {
	const [search, setSearch] = useState("");
	const dispatch = useDispatch();
	const podcasts = useSelector((state) => state.podcasts.podcasts);
	// console.log(podcasts);

	// For Implement the Search Functionality we have to filter the podcast:
	const filteredResult = podcasts?.filter((item) => {
		if (!item) return true;

		let titleStr = item?.title.toLowerCase();
		let searchStr = search.toLowerCase();

		return titleStr.includes(searchStr);
	});

	useEffect(() => {
		const unsub = onSnapshot(
			query(collection(db, "podcasts")),
			(querySnapshot) => {
				const podcastsData = [];
				querySnapshot.forEach((doc) => {
					podcastsData.push({ id: doc.id, ...doc.data() });
				});
				dispatch(setPodcasts(podcastsData));
			},
			(error) => {
				console.log("Error fetching podcasts: " + error.message);
			}
		);

		return () => {
			unsub();
		};
	}, [dispatch]);

	const podcastCards = filteredResult?.map((item) => (
		<PodcastCard item={item} />
	));

	console.log(search);

	return (
		<main>
			<Header />

			<section className='text-center mt-8'>
				<h1 className='text-2xl'>Discover Podcasts</h1>

				{/* Search Bar */}
				<div className='my-6 flex justify-center'>
					<div className='w-[80%]'>
						<InputComponent placeholder='Search' setState={setSearch} />
					</div>
				</div>

				{/* We have to fetche all the podcasts here */}
				<div className='mt-6 flex gap-6 justify-center items-center'>
					{podcasts?.length > 0 ? podcastCards : <p>No Current Podcasts</p>}
				</div>
			</section>
		</main>
	);
};

export default Podcasts;
