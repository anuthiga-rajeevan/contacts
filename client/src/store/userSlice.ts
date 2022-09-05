import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { User, LoadingStatus, ILoginUserData, IRegisterUserData } from './../types/types';
import { loginUser, registerUser } from './../service/user';
import { setAlert } from './alertSlice';

// Types
interface UserState {
  userInfo: User;
  getUserInfoStatus: LoadingStatus;
  loginStatus: LoadingStatus;
}

const initialState: UserState = {
  userInfo: { name: null, email: null, token: null },
  getUserInfoStatus: LoadingStatus.idle,
  loginStatus: LoadingStatus.idle,
};

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: ILoginUserData, { dispatch, rejectWithValue }) => {
    try {
      const loginResponse = await loginUser({ email, password });
      dispatch(setAlert({ msg: 'LoggedIn Successfully', type: 'success' }));
      return loginResponse;
    } catch (err: any) {
      const error = err.response?.data?.error || 'Something went wrong';
      dispatch(setAlert({ msg: error, type: 'error' }));
      return rejectWithValue(error);
    }
  },
);
export const register = createAsyncThunk(
  'user/register',
  async (
    { name, email, password, repeatPassword }: IRegisterUserData,
    { dispatch, rejectWithValue },
  ) => {
    try {
      const registerResponse = await registerUser({ name, email, password, repeatPassword });
      dispatch(setAlert({ msg: 'Registered Successfully', type: 'success' }));
      return registerResponse;
    } catch (err: any) {
      const error = err.response?.data?.error || 'Something went wrong';
      dispatch(setAlert({ msg: error, type: 'error' }));
      return rejectWithValue(error);
    }
  },
);

// Slice
const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    getUser(state) {
      const user = localStorage.getItem('user');
      state.userInfo = user ? JSON.parse(user) : { name: null, email: null, token: null };
      state.getUserInfoStatus = LoadingStatus.success;
    },
    logout(state) {
      state.loginStatus = LoadingStatus.idle;
      state.getUserInfoStatus = LoadingStatus.idle;
      state.userInfo = { name: null, email: null, token: null };
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(login.fulfilled, register.fulfilled), (state, action) => {
        state.loginStatus = LoadingStatus.success;
        state.userInfo = action.payload;
        localStorage.setItem('user', JSON.stringify(state.userInfo));
      })
      .addMatcher(isAnyOf(login.pending, register.pending), (state, action) => {
        state.getUserInfoStatus = LoadingStatus.idle;
        state.loginStatus = LoadingStatus.loading;
      })
      .addMatcher(isAnyOf(login.rejected, register.rejected), (state, action) => {
        state.loginStatus = LoadingStatus.failed;
        state.userInfo = { name: null, email: null, token: null };
        localStorage.clear();
      });
  },
});

export const { getUser, logout } = userSlice.actions;
export default userSlice.reducer;
