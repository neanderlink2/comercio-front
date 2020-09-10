import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { ConfigInterface } from 'swr';
import { HttpMethods } from '../models/Requests/RequestsMethods';

export const URL_BASE_API = "https://localhost:5001/api/v1";
const api = axios.create({ baseURL: URL_BASE_API });
api.interceptors.request.use(config => {
    const userToken = JSON.parse(localStorage.getItem("@app/userToken") ?? "");
    if (!userToken) {
        return config;
    }

    config.headers.Authorization = `Bearer ${userToken}`;
    return config;
});

async function dataFetcher<TResponse = any>(url: string, method: HttpMethods = "get") {
    try {
        const response = await api.request({ method, url });
        return response.data as TResponse;
    } catch (error) {
        console.error("ERRO NA REQUISIÇÃO: ", error);
        throw error;
    }
}

export const swrConfiguration: ConfigInterface = {
    fetcher: dataFetcher,
    errorRetryCount: 3,
    revalidateOnFocus: true,
    shouldRetryOnError: true
}

export function formatError(error: AxiosError) {
    if (error.response) {
        if (error.response.status === 400) {
            if (error.response.data.errors) {
                toast.error('Não foi possivel realizar a operação');
            } else {
                for (const key of Object.keys(error.response.data)) {
                    for (const errorMessage of error.response.data[key]) {
                        toast.error(errorMessage);
                    }
                }
            }
            return error.response.data;
        }
        if (error.response.status === 401) {
            return;
        }
        if (error.response.status === 404) {
            return;
        }
    }

    toast.error('Não foi possivel realizar a operação');
    return ['Internal server error'];
}

export default api;