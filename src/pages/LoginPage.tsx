import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { ILoginDto } from '../interfaces';
import { login } from '../utils';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../providers/ContextProvider';
import Popup from '../components/Popup';

const LoginPage = () => {

	const { setResponse } = useMyContext()
	const navigate = useNavigate()

	const loginSchema = z.object({
		username: z.string().min(1, 'Username is required'),
		password: z.string().min(4, { message: 'Password must be at least 4 characters long' }),
	});

	const { register, handleSubmit, formState: { errors } } = useForm<ILoginDto>({ resolver: zodResolver(loginSchema), mode: 'onChange' });

	const onSubmit = async (data: ILoginDto) => {
		await login(data)
			.then(() => {
				navigate('/admin/requests')
			})
			.catch(err => setResponse((prevState) => [...prevState, err.response.data.message]))
	}

	return (
		<div>

			<Popup />

			<div className="container mx-auto px-[20px] max-w-screen-lg">
				<div className="min-h-screen flex flex-col justify-center items-center py-16 gap-10 text-white font-bold">

					<div className='bg-white p-4 flex flex-col gap-3 rounded-lg w-[320px]'>
						<h2 className='text-mainOrange text-center text-xl font-medium'>Login</h2>
						<form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-3'>
							<div>
								<input className='w-full border-b-2 border-gray-400 text-black rounded-sm outline-none px-[5px] py-[2px] font-normal' placeholder='user name' type="text" {...register('username')} />
								{errors.username?.message && <p className='text-mainOrange font-medium text-[14px] ml-1'>{errors.username?.message}</p>}
							</div>
							<div>
								<input className='w-full border-b-2 border-gray-400 text-black rounded-sm outline-none px-[5px] py-[2px] font-normal' placeholder='password' {...register('password')} type="password" />
								{errors.password?.message && <p className='text-mainOrange font-medium text-[14px] ml-1'>{errors.password?.message}</p>}
							</div>
							<button type='submit' className='bg-mainOrange text-white rounded-md py-[2px] font-medium'>Submit</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginPage