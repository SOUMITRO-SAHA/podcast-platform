import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const AudioPlayer = ({ audioSrc, image }) => {
	const [duration, setDuration] = useState("");
	const [volume, setVolume] = useState(1);
	const [isMute, setIsMute] = useState(false);
	const [isVolumeBtnClicked, setIsVolumeBtnClicked] = useState(false);
	const [isPlaying, setIsPlaying] = useState(true);
	const audioRef = useRef();

	const handleDuration = (e) => {
		e.preventDefault();
	};

	useEffect(() => {
		if (isPlaying) {
			audioRef.play();
		}
	}, [isPlaying]);

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
					{isPlaying ? (
						<FaPlay onClick={() => setIsPlaying((prev) => !prev)} />
					) : (
						<FaPause onClick={() => setIsPlaying((prev) => !prev)} />
					)}
					{/* Time Line */}
					<div className='flex gap-3 items-center w-full'>
						<p className='select-none'>0:00</p>

						<input
							type='range'
							onChange={handleDuration}
							className='hue-rotate-[25deg] w-[80%] '
						/>

						<p className='select-none'>-20:00</p>
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
									<input type='range' />
								</div>
							)}
						</span>

						<FaVolumeMute onClick={() => setIsMute((prev) => !prev)} />
					</p>
				</div>
			</div>
		</section>
	);
};

export default AudioPlayer;
