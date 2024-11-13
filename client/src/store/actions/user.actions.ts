import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config, handleError } from "../../common/configurations";
import { URL } from "../../common/api";
import { ILogin, IGoogleAuth } from "../../types/IAuth";

interface UserCredentials {
  email: string;
  password: string;
}

//logout
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${URL}/auth/logout`, config);
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
      console.log(data, "data reached in the getuserdata");
      return data;
    } catch (error: any) {
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.message ===
          "Authentication required. no user provided"
      ) {
        return null;
      }
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
    console.log(credendials,"credential in teh adminLogin");
    
    try {
      const { data } = await axios.post(`${URL}/auth/login`,credendials, config);
      return data.data;
    } catch (error:any) {
      return handleError(error, rejectWithValue);
    }
  }
)