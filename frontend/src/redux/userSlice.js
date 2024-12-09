import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  netWorth: 0,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails(state, action) {
      state.name = action.payload.name;
      state.netWorth = action.payload.netWorth;
    },
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("authToken", action.payload);
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem("authToken");
    },
  },
});

export const { setUserDetails, setToken, logout } = userSlice.actions;
export default userSlice.reducer;
