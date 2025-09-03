import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export const registerUser = createAsyncThunk("auth/register", async (formData) => {
  const res = await axios.post("http://localhost:5000/api/auth/register", formData, { withCredentials:true });
  return res.data?.data;
});

export const loginUser = createAsyncThunk("auth/login", async (formData) => {
  const res = await axios.post("http://localhost:5000/api/auth/login", formData, { withCredentials:true });
  return res.data?.data;
});

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const res = await axios.get("http://localhost:5000/api/auth/check-auth", { withCredentials:true });
  return res.data?.data;
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  const res = await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials:true });
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (s)=>{ s.isLoading=true; })
      .addCase(registerUser.fulfilled, (s)=>{ s.isLoading=false; })
      .addCase(registerUser.rejected, (s)=>{ s.isLoading=false; })

      .addCase(loginUser.pending, (s)=>{ s.isLoading=true; })
      .addCase(loginUser.fulfilled, (s, a)=>{ s.isLoading=false; s.isAuthenticated=true; s.user=a.payload; })
      .addCase(loginUser.rejected, (s)=>{ s.isLoading=false; s.isAuthenticated=false; s.user=null; })

      .addCase(checkAuth.pending, (s)=>{ s.isLoading=true; })
      .addCase(checkAuth.fulfilled, (s,a)=>{ s.isLoading=false; s.isAuthenticated=true; s.user=a.payload; })
      .addCase(checkAuth.rejected, (s)=>{ s.isLoading=false; s.isAuthenticated=false; s.user=null; })

      .addCase(logoutUser.fulfilled, (s)=>{ s.isAuthenticated=false; s.user=null; });
  },
});

export default authSlice.reducer;
