import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  authData: [],
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    set: (state, action) => {
      return { ...state, ...action.payload };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAuthData: (state, action) => {
      state.authData = action.payload;
    },
  },
});

export const { set, setLoading, setAuthData } = globalSlice.actions;

const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
  },
});

export default store;
