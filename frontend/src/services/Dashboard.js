import { toast } from "react-toastify";
import store from "../redux/store.js";
import mainAxiosInstance from "./interceptor/api.js";
import { deleteUserInfo } from "../utils/storage.js";

export const DashApi = {
  networth: async () => {
    try {
      store.dispatch({ type: "setLoading", loading: true });

      const data = await mainAxiosInstance.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/transactions/networth`
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
  RecTxn: async () => {
    try {
      store.dispatch({ type: "setLoading", loading: true });

      const data = await mainAxiosInstance.get(
        `${
          import.meta.env.VITE_APP_BACKEND_URL
        }/transactions/recent-transactions`
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
  RecAssets: async () => {
    try {
      store.dispatch({ type: "setLoading", loading: true });

      const data = await mainAxiosInstance.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/transactions/recent-assets`
      );

      store.dispatch({ type: "setLoading", loading: false });

      // console.log(data?.data);

      // toast.success("login success");

      return data?.data;
    } catch (error) {
      console.error("Error Login to user:", error.response);
      console.log(error?.response?.data?.error);

      if (error?.response?.data?.error === "Invalid token") {
        deleteUserInfo();
      }

      store.dispatch({ type: "setLoading", loading: false });

      throw error.response;
    }
  },
  networthByDateRange: async () => {
    try {
      store.dispatch({ type: "setLoading", loading: true });

      const data = await mainAxiosInstance.get(
        `${
          import.meta.env.VITE_APP_BACKEND_URL
        }/transactions/networthByDateRange?startYear=2020&endYear=2024`
      );

      store.dispatch({ type: "setLoading", loading: false });

      // console.log(data?.data?.data);

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
