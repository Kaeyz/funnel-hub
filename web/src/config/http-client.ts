import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const instance = axios.create({
  baseURL: apiUrl,
});

interface BaseRequest<B = object, P = object> {
  path: string;
  method: AxiosRequestConfig["method"];
  headers?: AxiosRequestConfig["headers"];
  body?: B;
  query?: P;
  withCredentials?: boolean;
}

type BaseResponse<D> = {
  code: string;
  message: string;
  data: D;
};

interface SuccessRes<S> {
  resType: "success";
  resData: BaseResponse<S>;
}

interface ErrorRes<E> {
  resType: "error";
  resData: BaseResponse<E>;
}

export type ApiResponse<S, E> = SuccessRes<S> | ErrorRes<E>;

export const requestHandler = async <S, E = object, B = object, Q = object>(
  config: BaseRequest<B, Q>
): Promise<ApiResponse<S, E>> => {
  try {
    const response: AxiosResponse<BaseResponse<S>> = await instance<BaseResponse<S>>({
      params: config?.query,
      data: config?.body,
      url: config?.path,
      method: config?.method,
      headers: config?.headers,
      withCredentials: config?.withCredentials,
    });
    return { resType: "success", resData: response.data };
  } catch (e: unknown) {
    const response = { resType: "error", resData: {} as BaseResponse<E> };
    if (e instanceof AxiosError) {
      response.resData = e?.response?.data as BaseResponse<E>;
    }
    return response as ErrorRes<E>;
  }
};
