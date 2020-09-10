import { AxiosError } from "axios";
import useSWR, { mutate } from "swr";

type FetchReturn<TResponse, TErrorResponse = any> = {
    response: TResponse,
    error?: AxiosError<TErrorResponse>,
    isLoading: boolean,
    reload: () => void,
}

export function useFetch<TResponse = any, TErrorResponse = any>(url: string): FetchReturn<TResponse, TErrorResponse> {
    const { data, error } = useSWR<TResponse, AxiosError<TErrorResponse>>(url);

    return {
        error,
        response: data as TResponse,
        isLoading: !data && error?.response?.status !== 404,
        reload: () => mutate(url)
    };
}