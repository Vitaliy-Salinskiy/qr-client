import { useState } from 'react';
import { useDropzone } from 'react-dropzone'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'

import { useMyContext } from '../providers/ContextProvider';
import Popup from './Popup';
import { IProductDto } from '../interfaces';
import { createProduct } from '../utils';

interface CreateProductsProps {
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateProducts = ({ setIsLoading }: CreateProductsProps) => {

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
			setIsLoading(true);
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
		<div className='flex flex-col'>

			{response && <Popup />}

			<div className='appContainer flex flex-col gap-5 pb-10'>

				<div className='flex justify-center items-center gap-2 bg-white rounded-2xl sm:rounded-md text-black border-dashed border-4 border-gray-500 relative'>
					<div {...getRootProps({ className: "w-full h-full flex flex-col gap-[25px] justify-center border-dashed border-[3px] cursor-pointer border-white rounded-xl h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex justify-center items-center text-white p-2 sm:p-5 overflow-y-auto" })}>
						<input {...getInputProps()} />
						{selectedFileUrl ? (
							<>
								<div className='h-[200px] w-[200px] md:w-[300px] md:h-[300px] border-[5px] border-dashed rounded-xl flex justify-center items-center border-red-500 p-2'>
									<img src={selectedFileUrl} alt="Selected file" className='max-h-[200px] max-w-[200px] object-cover' />
								</div>
								<p className='w-[240px] sm:w-[400px] text-center text-[18px] font-bold sm:text-3xl text-gray-500'>Your selected photo</p>
							</>
						) : isDragActive ? (
							<>
								<p className='w-[240px] sm:w-[400px] text-center font-medium text-[26px] sm:text-5xl text-gray-500'>Select a photo or drag it here</p>
								<p className='w-[240px] sm:w-[400px] text-center text-[14px] font-medium sm:text-xl text-gray-500'>Drop the file here ...</p>
							</>
						) : (
							<>
								<p className='w-[240px] sm:w-[400px] text-center font-medium text-[26px] sm:text-5xl text-gray-500'>Select a photo or drag it here</p>
								<p className='w-[240px] sm:w-[400px] text-center text-[14px] font-medium sm:text-xl text-gray-500'>Only *.jpeg, *.jpg, *.webp and *.png images will be accepted</p>
							</>
						)}
					</div>

					{error && <p className='text-white font-medium text-lg'>{error}</p>}
				</div>

				<form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
					<div className='w-full'>
						{/* <label htmlFor='name' className='text-white text-lg cursor-pointer'>Name</label> */}
						<input placeholder='Name' {...register("name")} id='name' type="text" className='product-input' />
						{errors.name?.message && <p className='font-medium text-[14px] mt-2 text-white ml-2'>{errors.name?.message}</p>}
					</div>
					<div className='w-full flex-col gap-3'>
						{/* <label htmlFor='price' className='text-white text-lg cursor-pointer'>Price</label> */}
						<input placeholder='Price' {...register("price")} type="number" className='product-input' id='price' min={1} max={125} />
						{errors.price?.message && <p className='font-medium text-[14px] mt-2 text-white ml-2'>{errors.price?.message}</p>}
					</div>
					<button className='bg-white text-red-500 font-bold px-4 py-2 rounded shadow'>Create Product</button>
				</form>

			</div>
		</div>
	)
}

export default CreateProducts