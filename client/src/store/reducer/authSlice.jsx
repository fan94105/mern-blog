import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return {
        isLogged: false,
        token: "",
        username: null,
        id: null,
      };
    }
    return {
      isLogged: true,
      token,
      username: JSON.parse(localStorage.getItem("username")),
      id: JSON.parse(localStorage.getItem("id")),
    };
  },
  reducers: {
    login: (state, action) => {
      state.isLogged = true;
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.id = action.payload.id;

      localStorage.setItem("token", state.token);
      localStorage.setItem("username", JSON.stringify(state.username));
      localStorage.setItem("id", JSON.stringify(state.id));
    },
    logout: (state) => {
      state.isLogged = false;
      state.token = null;
      state.username = null;
      state.id = null;

      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("id");
    },
  },
});

export const { login, logout } = authSlice.actions;
