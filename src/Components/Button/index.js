import React from "react";

const Button = ({ text, onClick, disabled }) => {
	return (
		<div
			onClick={onClick}
			disabled={disabled}
			className='bg-theme border-2 border-white p-3 rounded text-center text-xl text-white hover:bg-white hover:text-theme hover:transition hover:backdrop:blur-2xl font-normal cursor-pointer'
		>
			{text}
		</div>
	);
};

export default Button;
