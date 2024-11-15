import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config, handleError } from "../../common/configurations";
import { URL } from "../../common/api";
import { ILogin, IGoogleAuth } from "../../constants/types/IAuth";

interface UserCredentials {
  email: string;
  password: string;
}

//logout
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${URL}/auth`, config);
      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);

//register
export const register = createAsyncThunk(
  "user/loginUser",
  async (userCredentials: UserCredentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${URL}/auth/register`,
        userCredentials,
        config
      );
      console.log("🚀 ~ file: userActions.tsx:35 ~ data:", data);
      return data.data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);

//getUserData
export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/auth`, config);
      return data;
    } catch (error: any) {
      console.error("error in the getuserData", error);
      return handleError(error, rejectWithValue);
    }
  }
);

//gooogle authentication
export const registerGoogle = createAsyncThunk(
  "user/googleOAuth",
  async (userCredentials: IGoogleAuth, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${URL}/auth`,userCredentials, config)
        
      console.log('google auth data',data.data);
      return data.data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const LoginAction=createAsyncThunk(
  "admin/login",
  async(credendials:ILogin,{rejectWithValue})=>{
    try {
      const { data } = await axios.post(`${URL}/auth`,credendials, config);
      console.log("🚀 ~ file: user.actions.ts:88 ~ async ~ data:", data)
      return data.data;
    } catch (error:any) {
      return handleError(error, rejectWithValue);
    }
  }
)