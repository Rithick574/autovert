import { createSlice } from "@reduxjs/toolkit";
import { getUserData, logout,register,registerGoogle,adminLogin } from "../actions/user.actions";

const initialState = {
  loading: false as boolean,
  user: null as any | null,
  error: null as any | null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder

      //logout states
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = null;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload;
      })

      //register
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload;
      })

      //adminlogin
      .addCase(adminLogin.pending,(state)=>{
        state.loading = true
      })
      .addCase(adminLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload;
      })
      .addCase(adminLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload;
      })

      // getUserData
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserData.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload && payload.data) {
          state.user = payload.data;
        } else {
          state.user = null;
        }
        state.error = null;
      })
      .addCase(getUserData.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        if (payload && typeof payload === "object" && "message" in payload) {
          state.error =
            payload.message === "Authentication required. no user provided"
              ? null
              : payload;
        } else {
          state.error = payload;
        }
      });
  },
});
export const { updateError } = userSlice.actions;
export default userSlice.reducer;
