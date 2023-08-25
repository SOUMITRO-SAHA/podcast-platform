import React from "react";
import { BsPlay } from "react-icons/bs";
import { Link } from "react-router-dom";

const PodcastCard = ({ item }) => {
	return (
		<Link to={`/podcast/${item.id}`}>
			<div
				key={item.id}
				className='flex flex-col justify-center items-center gap-2 w-[230px] p-3 rounded bg-pg border border-slate-600'
			>
				<img
					src={item.image}
					alt={item.title}
					className='w-[200px] h-[200px] rounded object-cover'
				/>
				<div className='w-full flex justify-between items-center text-slate-400'>
					<h1>{item.title}</h1>
					<div>
						<BsPlay className='text-2xl' />
					</div>
				</div>
			</div>{" "}
		</Link>
	);
};

export default PodcastCard;
