import { useState } from 'react';
import { useDropzone } from 'react-dropzone'
import { Link } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'

import { useMyContext } from '../providers/ContextProvider';
import Popup from '../components/Popup';
import { IProductDto } from '../interfaces';
import { createProduct } from '../utils';

const CreateProducts = () => {

	const productSchema = z.object({
		name: z.string().min(2, "Name must contain at least 2 character").max(30, "Name can't exceed 30 characters").transform(str => str.trim()),
		price: z.string().transform(parseFloat).refine(value => !isNaN(value) && Number.isInteger(value) && value >= 1 && value <= 125, {
			message: "Price must be an integer between 1 and 125",
		}),
	});

	const { response, setResponse } = useMyContext();
	const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
	const [error, setError] = useState<string>();
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop: (acceptedFiles) => {
			setError('')
			if (acceptedFiles[0]) {
				const fileUrl = URL.createObjectURL(acceptedFiles[0])
				setSelectedFileUrl(fileUrl)
				setSelectedFile(acceptedFiles[0])
			}
		},
		maxFiles: 1,
		accept: {
			'image/png': [],
			'image/jpeg': [],
			'image/jpg': [],
			'image/webp': [],
		}
	});

	const { register, handleSubmit, formState: { errors }, reset } = useForm<IProductDto>({ resolver: zodResolver(productSchema), mode: 'onChange' })

	const onSubmit = (data: IProductDto) => {
		setError('')
		if (!selectedFile) {
			setError("Please select a file")
		}
		if (data && selectedFile) {
			const formData = new FormData();
			formData.append('image', selectedFile);
			formData.append('name', data.name);
			formData.append('price', data.price.toString());

			createProduct(formData)
				.then(() => {
					setResponse('Product created successfully')
					setSelectedFile(null)
					setSelectedFileUrl(null)
					reset();
				}).catch(() => {
					setResponse('Something went wrong, please try again later')
				})
		}
	}

	return (
		<div className='bg-red-500 flex flex-col'>

			{response && <Popup />}

			<div className='appContainer py-2 mt-5'>
				<Link to='/' className="outline-none text-[14px] font-bold text-center leading-[110%] bg-white text-red-500  p-2 rounded-xl top-0 left-0 cursor-pointer"> Back to QR-page</Link>
			</div>

			<h1 className='w-full bg-white py-5 px-2 text-center text-[50px] leading-[110%] font-bold text-red-500 mt-5 mb-20'>Create Product</h1>

			<div className='appContainer flex flex-col gap-5 pb-10'>

				<div className='flex flex-col gap-2'>

					<div {...getRootProps({ className: "w-full border-dashed border-[3px] cursor-pointer border-white rounded-xl h-[400px] lg:h-[600px] flex justify-center items-center text-white p-5 overflow-y-auto" })}>
						<input {...getInputProps()} />

						{selectedFileUrl ? (
							<img src={selectedFileUrl} alt="Selected file" className=' h-full w-full object-cover rounded-md' />
						) : isDragActive ? (
							<p>Drop the file here ...</p>
						) : (
							<p className='w-[275px] text-center'>Only *.jpeg, *.jpg, *.webp and *.png images will be accepted</p>
						)}
					</div>

					{error && <p className='text-white font-medium text-lg'>{error}</p>}
				</div>

				<form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
					<div className='w-full'>
						<label htmlFor='name' className='text-white text-lg cursor-pointer'>Name</label>
						<input {...register("name")} id='name' type="text" className='product-input' />
						{errors.name?.message && <p className='text-white font-medium text-[14px] mt-2'>{errors.name?.message}</p>}
					</div>
					<div className='w-full flex-col gap-3'>
						<label htmlFor='price' className='text-white text-lg cursor-pointer'>Price</label>
						<input {...register("price")} type="number" className='product-input' id='price' min={1} max={125} />
						{errors.price?.message && <p className='text-white font-medium text-[14px] mt-2'>{errors.price?.message}</p>}
					</div>
					<button className='bg-white text-red-500 font-bold px-4 py-2 rounded shadow'>Create Product</button>
				</form>

			</div>
		</div>
	)
}

export default CreateProducts