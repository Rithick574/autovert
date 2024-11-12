import axios, { AxiosError, AxiosRequestConfig, Method } from "axios";

// Constants for API endpoints
export const URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const apiInstance = axios.create({
  baseURL: URL,
  withCredentials: true,
});

// Response interceptor
apiInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError) => {
    console.log(error.message);
    throw error;
  }
);

// Function to handle common requests
export const commonRequest = async (
  method: Method,
  route: string,
  body?: any,
  config: AxiosRequestConfig = {}
): Promise<any> => {
  const requestConfig: AxiosRequestConfig = {
    method,
    url: route,
    data: body,
    headers: config.headers,
    withCredentials: true,
  };

  try {
    return await apiInstance(requestConfig);
  } catch (error) {
    console.error("Error in commonRequest:", error);
    return error;
  }
};

//for handling common redux requests
export const commonReduxRequest = async (
  method: Method,
  route: string,
  rejectWithValue?: (error: AxiosError) => void,
  body?: any,
  config: AxiosRequestConfig = {}
): Promise<any> => {
  let requestConfig: AxiosRequestConfig = {
    method,
    url: route,
    data: body,
    headers: config.headers || {},
    withCredentials: true,
  };

  try {
    const response = await apiInstance(requestConfig);
    return response;
  } catch (error: any) {
    console.error("Request failed with error:", error);
    if (rejectWithValue) {
      return rejectWithValue(error);
    } else {
      throw error;
    }
  }
};
