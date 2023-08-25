import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../Components/Header";
import { auth, db } from "../firebase";
import EpisodeCard from "../Components/Episode/EpisodeCard";
import AudioPlayer from "../Components/Podcast/AudioPlayer";

const PodcastDetails = () => {
	const { podcastId } = useParams();
	const [podcast, setPodcast] = useState({});
	const [episodes, setEpisodes] = useState({});
	const [playingFile, setPlayingFile] = useState("");
	const navigation = useNavigate();

	const getData = async () => {
		try {
			const docRef = doc(db, "podcasts", podcastId);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				setPodcast({
					id: podcastId,
					...docSnap.data(),
				});
			} else {
				console.log("No such document");
				toast.error("No such document!");

				// It should take back the user to the podcasts page:
				navigation("/podcasts");
			}
		} catch (error) {
			console.log(error.message);
			toast.error(error.message);
		}
	};

	const getEpisodes = async () => {
		const unsubscribe = onSnapshot(
			query(collection(db, "podcasts", podcastId, "episodes")),

			(querySnapshot) => {
				const episodesData = [];
				querySnapshot.forEach((doc) => {
					episodesData.push({ id: doc.id, ...doc.data() });
				});

				setEpisodes(episodesData);
			},
			(error) => {
				console.log("Error fetching episodes", error);
			}
		);

		return () => {
			unsubscribe();
		};
	};

	useEffect(() => {
		if (podcastId) {
			getData();
			getEpisodes();
		}
	}, []);

	const podcastDiv = (
		<>
			<section className='flex flex-col gap-6'>
				{/* Name + Create Btn*/}
				<div className='flex justify-between items-center'>
					{/* Name */}
					<div className='text-2xl'>{podcast.title}</div>

					{/* Create Btn */}
					{podcast.createdBy === auth.currentUser.uid && (
						<button
							className='bg-transparent p-3 border border-purple-gray rounded px-5 backdrop-blur-md transition hover:ring-1 hover:ring-blue'
							onClick={() => navigation(`/podcast/${podcastId}/create-episode`)}
						>
							Create Podcast
						</button>
					)}
				</div>
				{/* Image */}
				<div className='rounded w-full'>
					<img
						className='h-[250px] w-full rounded-xl object-cover'
						src={podcast.image}
						alt={podcast.title}
					/>
				</div>
				{/* Description */}
				<div className='text-purple-gray'>{podcast.description}</div>
				{/* Episods */}
				<div>
					<h3 className='text-2xl'>Episodes</h3>
					{episodes.length > 0 ? (
						episodes.map((item, idx) => (
							<EpisodeCard
								key={item.id}
								item={item}
								number={idx + 1}
								onClick={(file) => setPlayingFile(file)}
							/>
						))
					) : (
						<div>No Episods added</div>
					)}
				</div>
			</section>
		</>
	);

	return (
		<main className='container mx-auto max-w-7xl'>
			{/* Header Section */}
			<Header />

			{/* Other Part */}
			<div className='px-8 md:px-0 mt-6'>
				{podcast?.id ? podcastDiv : <div>Podcast Not Found</div>}
			</div>

			{/* Audio Player */}
			{playingFile && (
				<AudioPlayer audioSrc={playingFile} image={podcast.image} />
			)}
		</main>
	);
};

export default PodcastDetails;
