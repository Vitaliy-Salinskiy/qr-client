import axios from "axios";

import { ILoginDto, IUser } from "../interfaces";

const baseUlr = import.meta.env.VITE_APP_SERVER_URL;

export const createUser = async (id: string): Promise<any> => {
	const res = await axios.post(`${baseUlr}/users`, { id: id })
	return res.data;
}

export const getUser = async (id: string): Promise<any> => {
	const res = await axios.get(`${baseUlr}/users/${id}`)
	return res.data;
}

export const addCredentials = async (id: string, credentials: any): Promise<any> => {
	const res = await axios.put(`${baseUlr}/users/${id}/credentials`, { data: credentials })
	return res.data;
}

export const addScan = async (id: string): Promise<any> => {
	const res = await axios.put(`${baseUlr}/users/${id}`)
	return res.data;
}

export const getScansValue = async (): Promise<string[]> => {
	const res = await axios.get(`${baseUlr}/users/scans`)
	return res.data.toString().split("")
}

export const fetchData = async () => {
	const response = await axios.get(`${baseUlr}/users`);
	const sortedData = response.data.sort((a: IUser, b: IUser) => b.timesScanned - a.timesScanned).filter((user: IUser) => user.timesScanned > 0);
	return sortedData;
}

export const getProducts = async () => {
	const response = await axios.get(`${baseUlr}/products`);
	return response.data;
}

export const createRequest = async (userId: string, requestsId: string) => {
	const response = await axios.post(`${baseUlr}/requests/${userId}/${requestsId}`);
	return response.data;
}

export const getRequests = async () => {
	const response = await axios.get(`${baseUlr}/requests`);
	return response.data;
}

export const allowRequest = async (id: string) => {
	const response = await axios.post(`${baseUlr}/requests/${id}/allow`);
	return response.data;
}

export const denyRequest = async (id: string) => {
	const response = await axios.post(`${baseUlr}/requests/${id}/deny`);
	return response.data;
}

export const login = async (credentials: ILoginDto) => {
	const response = await axios.post(`${baseUlr}/auth/login`, credentials);
	return response.data;
}

export const createProduct = async (product: FormData) => {
	const response = await axios.post(`${baseUlr}/products`, product);
	return response.data;
}

export const deleteProduct = async (id: string) => {
	const response = await axios.delete(`${baseUlr}/products/${id}`);
	return response.data;
}