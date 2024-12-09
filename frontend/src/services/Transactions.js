import { toast } from "react-toastify";
import store from "../redux/store.js";
import mainAxiosInstance from "./interceptor/api.js";
import { deleteUserInfo } from "../utils/storage.js";

export const TxnApi = {
  alltxn: async () => {
    try {
      store.dispatch({ type: "setLoading", loading: true });

      const data = await mainAxiosInstance.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/transactions/all-transactions`
      );

      store.dispatch({ type: "setLoading", loading: false });

      // console.log(data?.data);

      // toast.success("login success");

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
