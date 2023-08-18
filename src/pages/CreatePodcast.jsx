import React, { useState } from "react";
import Header from "../Components/Header";
import FileInput from "../Components/Input/FileInput";
import InputComponent from "../Components/Input";
import Button from "../Components/Button";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const CreatePodcast = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [loading, setLoading] = useState(false);
	const [bannerImage, setBannerImage] = useState();
	const navigate = useNavigate();

	const btnHandler = async () => {
		setLoading(true);
		if (title && description) {
			try {
				// 1. Upload the File to Firebase
				const bannerImageRef = ref(
					storage,
					`podcasts/${auth.currentUser.uid}/${Date.now()}`
				);
				const uploaded = await uploadBytes(bannerImageRef, bannerImage);
				console.log(uploaded);

				// This is the Image URL from Firebase
				const bannerImageUrl = await getDownloadURL(bannerImageRef);
				// 2. Create a new DOC in a new collection called podcase
				const podcastData = {
					title: title,
					description: description,
					image: bannerImageUrl,
					createdBy: auth.currentUser.uid,
				};

				const docRef = await addDoc(collection(db, "podcasts"), podcastData);
				// 3. Save this new podcase episodes states in out podcasts
				navigate(`/podcast/${docRef.id}`);
				setTitle("");
				setDescription("");
				setBannerImage(null);
				toast.success("Podcast Created successfully");
				setLoading(false);
			} catch (error) {
				toast.error(error.message);
				setLoading(false);
			}
		} else {
			setLoading(false);
			toast.warn("Please fill all the required fields");
		}
	};
	return (
		<>
			<Header />
			<section className='h-screen w-full'>
				<div className='flex flex-col justify-center items-center'>
					<div className='text-2xl my-10'>Create a Podcast</div>
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
							accept={"image/*"}
							id={"podcast-banner-img"}
							fileHandleFn={setBannerImage}
						/>
						<Button
							text={loading ? "Loading..." : "Create Podcast"}
							disabled={loading}
							onClick={btnHandler}
						/>
					</div>
				</div>
			</section>
		</>
	);
};

export default CreatePodcast;
