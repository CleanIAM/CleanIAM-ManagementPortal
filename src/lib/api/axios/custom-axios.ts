import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Error } from '../generated/cleanIAM.schemas';

// Create the axios instance
const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || 'https://localhost:5000',
	headers: {
		'Content-Type': 'application/json'
	}
});

// Create a function to handle axios requests that is compatible with orval
export const customAxiosRequest = async <T>(
	config: AxiosRequestConfig
): Promise<{ data: T; status: number; headers: any }> => {
	try {
		const response: AxiosResponse<T> = await axiosInstance(config);

		return {
			data: response.data,
			status: response.status,
			headers: response.headers
		};
	} catch (error) {
		const axiosError = error as AxiosError;

		throw (
			(axiosError.response?.data as Error) || {
				message: axiosError.message,
				code: axiosError.code
			}
		);
	}
};

export default axiosInstance;
