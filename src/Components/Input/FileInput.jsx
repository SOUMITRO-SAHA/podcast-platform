import React, { useState } from "react";
import { FcCheckmark } from "react-icons/fc";

const FileInput = ({ accept, id, fileHandleFn }) => {
	const [file, setFile] = useState("");

	const onChange = (e) => {
		setFile(e.target.files[0].name);
		fileHandleFn(e.target.files[0]);
	};

	const onFileSelecteElement = (
		<div className='flex justify-between items-center'>
			<span>{file}</span>
			<FcCheckmark className='text-xl' />
		</div>
	);

	return (
		<>
			<label
				htmlFor={id}
				className='border-[3px] border-dashed p-3 rounded border-purple-gray text-purple-gray cursor-pointer'
			>
				{file ? onFileSelecteElement : "Add Image"}
			</label>
			<input
				type='file'
				accept={accept}
				id={id}
				onChange={onChange}
				className='hidden'
			/>
		</>
	);
};

export default FileInput;
