import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

import { IAddCredentialsDto, ILoginDto, IProduct, IRequest, IRequestResponse, IUser } from "../interfaces";

const enum QueryKeys {
	Users = "users",
	User = "user",
	Products = "products",
	Requests = "requests",
	PendingRequests = "pendingRequests",
	Profile = "profile",
	Scans = "scans"
}

const baseUlr = import.meta.env.VITE_APP_SERVER_URL;

export const useCreateUser = () => {
	const queryClient = useQueryClient();

	return useMutation(async (id: string) => {
		const res = await axios.post<IUser | { message: string }>(`${baseUlr}/users`, { id })
		return res.data;
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries(QueryKeys.Users)
		}
	})
}

export const useGetUser = (id?: string | null) => {
	return useQuery([id], async () => {
		const res = await axios.get<IUser>(`${baseUlr}/users/${id}`)
		return res.data;
	}, { enabled: id !== null && id !== undefined && typeof id === "string" })
}

export const useAddCredentials = () => {
	return useMutation(async ({ id, credentials }: { id: string, credentials: IAddCredentialsDto }) => {
		const res = await axios.put<IUser>(`${baseUlr}/users/${id}/credentials`, { data: credentials })
		return res.data;
	})
}

export const useAddScan = () => {
	const queryClient = useQueryClient();

	return useMutation(async (id: string) => {
		const res = await axios.put<IUser | { message: string }>(`${baseUlr}/users/${id}`)
		return res.data;
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries(QueryKeys.Scans)
		}
	})
}

export const useGetScansValue = () => {
	return useQuery([QueryKeys.Scans], async () => {
		const res = await axios.get<number>(`${baseUlr}/users/scans`)
		return res.data.toString().split("")
	})
}

export const useFetchUsers = () => {
	return useQuery([QueryKeys.Users], async () => {
		const response = await axios.get<IUser[]>(`${baseUlr}/users`);
		const sortedData = response.data.sort((a: IUser, b: IUser) => b.timesScanned - a.timesScanned).filter((user: IUser) => user.timesScanned > 0);
		return sortedData;
	})
}

export const useFetchProducts = () => {
	return useQuery([QueryKeys.Products], async () => {
		const response = await axios.get<IProduct[]>(`${baseUlr}/products`);
		return response.data;
	})
}

export const useCreateProduct = () => {
	const queryClient = useQueryClient();
	return useMutation(async (productDto: FormData) => {
		const response = await axios.post(`${baseUlr}/products`, productDto);
		return response.data;
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries([QueryKeys.Products, QueryKeys.Requests, QueryKeys.PendingRequests])
		}
	})
}

export const useDeleteProduct = () => {
	const queryClient = useQueryClient();

	return useMutation(async (id: string) => {
		const response = await axios.delete(`${baseUlr}/products/${id}`);
		return response.data;
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries([QueryKeys.Products, QueryKeys.Requests, QueryKeys.PendingRequests])
		}
	})
}

export const useCreateRequest = () => {
	const queryClient = useQueryClient();

	return useMutation(async ({ userId, productId }: { userId: string, productId: string }) => {
		const response = await axios.post<IRequest>(`${baseUlr}/requests/${userId}/${productId}`);
		return response.data;
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries([QueryKeys.Requests, QueryKeys.PendingRequests])
		}
	})
}

export const useGetAllRequests = (page?: number) => {
	return useQuery([QueryKeys.Requests], async () => {
		const response = await axios.get<IRequestResponse>(`${baseUlr}/requests`, {
			params: {
				page
			}
		});
		return response.data;
	})
}

export const useGetPendingRequests = (page?: number) => {
	return useQuery([QueryKeys.PendingRequests], async () => {
		const response = await axios.get<IRequestResponse>(`${baseUlr}/requests/pending`, {
			params: {
				page
			}
		});
		return response.data;
	})
}

export const useAllowRequest = () => {
	const queryClient = useQueryClient();

	return useMutation(async (id: string) => {
		const response = await axios.post(`${baseUlr}/requests/${id}/allow`);
		return response.data;
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries([QueryKeys.Requests, QueryKeys.PendingRequests])
		}
	})

}

export const useDenyRequest = () => {
	const queryClient = useQueryClient();

	return useMutation(async (id: string) => {
		const response = await axios.post(`${baseUlr}/requests/${id}/deny`);
		return response.data;
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries([QueryKeys.Requests, QueryKeys.PendingRequests])
		}
	})

}

export const useLogin = () => {
	const queryClient = useQueryClient();

	return useMutation(async (credentials: ILoginDto) => {
		const response = await axios.post(`${baseUlr}/auth/login`, credentials, { withCredentials: true });
		return response.data;
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries(QueryKeys.Profile)
		}
	})
}

export const useGetProfile = () => {
	return useQuery([QueryKeys.Profile], async () => {
		const response = await axios.get<IUser>(`${baseUlr}/auth/profile`, { withCredentials: true });
		return response.data;
	})
}