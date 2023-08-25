import React, { useState } from "react";
import Header from "../Components/Header";
import Button from "../Components/Button";
import FileInput from "../Components/Input/FileInput";
import InputComponent from "../Components/Input";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const CreateAnEpisodePage = () => {
	const { podcastId } = useParams();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [loading, setLoading] = useState(false);
	const [audio, setAudio] = useState();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const btnHandler = async () => {
		setLoading(true);
		if ((title, description, audio)) {
			try {
				const audioRef = ref(
					storage,
					`podcast-episodes/${auth.currentUser.uid}/@{Date.now()}`
				);

				await uploadBytes(audioRef, audio);

				const audioURL = await getDownloadURL(audioRef);
				const episodeData = {
					title,
					description,
					audioFile: audioURL,
				};

				await addDoc(
					collection(db, "podcasts", podcastId, "episodes"),
					episodeData
				);

				setLoading(false);
				navigate(`podcast/${podcastId}`);
			} catch (error) {
				toast.error(error.message);
				setLoading(false);
			}
		} else {
			setLoading(false);
			toast.error("All the Fields are required");
		}
	};

	return (
		<main>
			{/* Headers */}
			<Header />

			{/* Other Part */}
			<section className='h-screen w-full'>
				<div className='flex flex-col justify-center items-center'>
					<div className='text-2xl my-10'>Create a Episode</div>
					{/* Input Section */}
					<div className='w-[80%] md:w-[60%] lg:w-[40%] flex flex-col justify-center gap-8'>
						<InputComponent
							state={title}
							setState={setTitle}
							placeholder='Title'
							type='text'
							required='required'
						/>
						<InputComponent
							state={description}
							setState={setDescription}
							placeholder='Description'
							type='text'
							required='required'
						/>
						<FileInput
							accept={"audio/*"}
							id={"podcast-banner-img"}
							fileHandleFn={setAudio}
							placeholder='Add Audio'
						/>
						<Button
							text={loading ? "Loading..." : "Create Episode"}
							disabled={loading}
							onClick={btnHandler}
						/>
					</div>
				</div>
			</section>
		</main>
	);
};

export default CreateAnEpisodePage;
