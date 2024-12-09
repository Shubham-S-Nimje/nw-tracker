import { toast } from "react-toastify";
import store from "../redux/store.js";
import mainAxiosInstance from "./interceptor/api";
import { deleteUserInfo } from "../utils/storage.js";

export const AuthApi = {
  Login: async (payload) => {
    try {
      store.dispatch({ type: "setLoading", loading: true });

      const data = await mainAxiosInstance.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/auth/signin`,
        payload
      );

      store.dispatch({ type: "setLoading", loading: false });

      // console.log(data?.data);

      const authData = data?.data?.user;

      // console.log(authData);

      store.dispatch({ type: "setAuthData", authData });

      toast.success("login success");

      return data?.data;
    } catch (error) {
      console.error("Error Login to user:", error.response);

      if (error?.response?.data?.error === "Invalid token") {
        deleteUserInfo();
      }

      store.dispatch({ type: "setLoading", loading: false });

      throw error.response;
    }
  },
};
