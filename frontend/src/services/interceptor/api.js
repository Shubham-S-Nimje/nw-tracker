import axios from "axios";
import LocalStorageRepository from "../../utils/storage";
const baseURL = import.meta.env.VITE_APP_BACKEND_URL;

const mainAxiosInstance = axios.create({
  baseURL,
  timeout: 15000,
  timeoutErrorMessage: "Server not responding.",
});

const onRequest = (config) => {
  const { method, url, data } = config;
  const accessToken = LocalStorageRepository.get("access_token");

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  if (data instanceof FormData) {
    config.headers[
      "Content-Type"
    ] = `multipart/form-data; boundary=${data._boundary}`;
  }

  return config;
};

mainAxiosInstance.interceptors.request.use(onRequest);

export default mainAxiosInstance;
