import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const AudioPlayer = ({ audioSrc, image }) => {
	const [isPlaying, setIsPlaying] = useState(true);
	const [isMute, setIsMute] = useState(false);
	const [isVolumeBtnClicked, setIsVolumeBtnClicked] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(0.1);

	// Ref:
	const audioRef = useRef();

	// Custom Functions:
	const handleTimeUpdate = () => {
		const currentTime = audioRef.current.currentTime;
		setCurrentTime(currentTime);
	};

	const handleLoadedMetadata = () => {
		const duration = audioRef.current.duration;
		setDuration(duration);
	};

	const handleDuration = (e) => {
		const newTime = parseFloat(e.target.value);
		setCurrentTime(newTime);
		audioRef.current.currentTime = newTime;
	};

	const handleEnded = () => {
		setCurrentTime(0);
		setIsPlaying(false);
	};

	const handleVolume = (e) => {
		const newVolume = e.target.value;
		setVolume(newVolume);
		audioRef.current.volume = newVolume;
	};

	const togglePlay = () => {
		if (isPlaying) {
			setIsPlaying(false);
		} else {
			setIsPlaying(true);
		}
	};

	const toggleMute = () => {
		if (isMute) {
			setIsMute(false);
		} else {
			setIsMute(true);
		}
	};

	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};

	// Use Effects:
	useEffect(() => {
		const audio = audioRef.current;
		audio.addEventListener("timeupdate", handleTimeUpdate);
		audio.addEventListener("loadedmetadata", handleLoadedMetadata);
		audio.addEventListener("ended", handleEnded);

		return () => {
			audio.removeEventListener("timeupdate", handleTimeUpdate);
			audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
			audio.removeEventListener("ended", handleEnded);
		};
	}, []);

	useEffect(() => {
		if (isPlaying) {
			audioRef.current.play();
		} else {
			audioRef.current.pause();
		}
	}, [isPlaying]);

	useEffect(() => {
		if (!isMute) {
			audioRef.current.volume = volume;
		} else {
			audioRef.current.volume = 0;
		}
	}, [isMute]);

	return (
		<section className='bg-pg mt-6 relative'>
			<div className='p-3 flex gap-6 w-full'>
				{/* Image */}
				<img
					src={image}
					alt='Episod'
					className='h-16 w-16 rounded object-cover'
				/>
				{/* Play Bar Compoent */}
				<div className='flex items-center gap-3 w-[80%]'>
					<audio ref={audioRef} src={audioSrc} />
					{/* Buttons */}
					<div onClick={togglePlay}>
						{isPlaying ? <FaPlay /> : <FaPause />}{" "}
					</div>
					{/* Time Line */}
					<div className='flex gap-1 items-center w-full'>
						<p className='select-none flex-none'>{formatTime(currentTime)}</p>

						<input
							type='range'
							max={duration}
							value={currentTime}
							onChange={handleDuration}
							step={0.01}
							className='hue-rotate-[25deg] w-[80%] flex-none'
						/>

						<p className='select-none flex-none'>
							-{formatTime(duration - currentTime)}
						</p>
					</div>
				</div>

				{/* Additional Things */}
				<div className='flex items-center mr-6 text-xl'>
					<p className='flex items-center gap-3'>
						<span className='relative'>
							<FaVolumeUp
								onClick={() => setIsVolumeBtnClicked((prev) => !prev)}
							/>
							{isVolumeBtnClicked && (
								<div className='bg-black p-3 -rotate-90 absolute bottom-[106px] -right-16 rounded-lg'>
									<input
										type='range'
										value={volume}
										onChange={handleVolume}
										min={0}
										max={1}
										step={0.01}
									/>
								</div>
							)}
						</span>

						<FaVolumeMute
							className={isMute ? "text-red-500" : ""}
							onClick={toggleMute}
						/>
					</p>
				</div>
			</div>
		</section>
	);
};

export default AudioPlayer;
