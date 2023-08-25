import React from "react";
import Button from "../Button";
import { BsFillPlayFill } from "react-icons/bs";

const EpisodeCard = ({ item, number, onClick }) => {
	return (
		<section className='flex flex-col gap-3 my-6'>
			<div className='flex gap-3 text-xl'>
				<div>{number} .</div>
				<div>{item.title}</div>
			</div>
			<div className='object-fill text-purple-gray'>{item.description}</div>
			<div className='mt-6 w-[150px]'>
				<Button
					icon={<BsFillPlayFill />}
					text={"Play"}
					onClick={() => onClick(item.audioFile)}
				/>
			</div>
		</section>
	);
};

export default EpisodeCard;
