import axios from "axios";

import { IAdmin, ILoginDto, IProduct, IRequest, IUser } from "../interfaces";

const baseUlr = import.meta.env.VITE_APP_SERVER_URL;

export const createUser = async (id: string): Promise<IUser> => {
	const res = await axios.post<IUser>(`${baseUlr}/users`, { id: id })
	return res.data;
}

export const getUser = async (id: string): Promise<IUser> => {
	const res = await axios.get<IUser>(`${baseUlr}/users/${id}`)
	return res.data;
}

export const addCredentials = async (id: string, credentials: any): Promise<IUser> => {
	const res = await axios.put<IUser>(`${baseUlr}/users/${id}/credentials`, { data: credentials })
	return res.data;
}

export const addScan = async (id: string) => {
	const res = await axios.put(`${baseUlr}/users/${id}`)
	return res.data;
}

export const getScansValue = async (): Promise<string[]> => {
	const res = await axios.get<number>(`${baseUlr}/users/scans`)
	return res.data.toString().split("")
}

export const fetchData = async (): Promise<IUser[]> => {
	const response = await axios.get<IUser[]>(`${baseUlr}/users`);
	const sortedData = response.data.sort((a: IUser, b: IUser) => b.timesScanned - a.timesScanned).filter((user: IUser) => user.timesScanned > 0);
	return sortedData;
}

export const getProducts = async (): Promise<IProduct[]> => {
	const response = await axios.get<IProduct[]>(`${baseUlr}/products`);
	return response.data;
}

export const createProduct = async (product: FormData): Promise<IProduct> => {
	const response = await axios.post<IProduct>(`${baseUlr}/products`, product);
	return response.data;
}

export const deleteProduct = async (id: string): Promise<string> => {
	const response = await axios.delete<string>(`${baseUlr}/products/${id}`);
	return response.data;
}

export const createRequest = async (userId: string, requestsId: string): Promise<IRequest> => {
	const response = await axios.post<IRequest>(`${baseUlr}/requests/${userId}/${requestsId}`);
	return response.data;
}

export const getAllRequests = async (requiredPage?: number) => {
	const response = await axios.get(`${baseUlr}/requests`, {
		params: {
			page: requiredPage
		}
	});
	return response.data;
}

export const getPendingRequests = async (requiredPage?: number) => {
	const response = await axios.get(`${baseUlr}/requests/pending`, {
		params: {
			page: requiredPage
		}
	});
	return response.data;
}

export const allowRequest = async (id: string): Promise<{ message: string }> => {
	const response = await axios.post<{ message: string }>(`${baseUlr}/requests/${id}/allow`);
	return response.data;
}

export const denyRequest = async (id: string) => {
	const response = await axios.post<{ message: string }>(`${baseUlr}/requests/${id}/deny`);
	return response.data;
}

export const login = async (credentials: ILoginDto): Promise<{ token: string }> => {
	const response = await axios.post<{ token: string }>(`${baseUlr}/auth/login`, credentials, { withCredentials: true });
	return response.data;
}

export const getProfile = async (): Promise<IAdmin> => {
	const response = await axios.get<IAdmin>(`${baseUlr}/auth/profile`, { withCredentials: true });
	return response.data;
}