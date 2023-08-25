import React from "react";

const Button = ({ text, onClick, disabled, className, icon }) => {
	return (
		<div
			onClick={onClick}
			disabled={disabled}
			className={`${className} bg-theme border-2 border-white p-3 rounded text-center text-xl text-white hover:bg-white hover:text-theme hover:transition hover:backdrop:blur-2xl font-normal cursor-pointer flex justify-center items-center gap-3`}
		>
			<span>{text}</span>
			<span className='text-3xl'>{icon && icon}</span>
		</div>
	);
};

export default Button;
