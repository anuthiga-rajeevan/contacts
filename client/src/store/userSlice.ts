import { createSlice } from '@reduxjs/toolkit';
import { User, LoadingStatus } from './../types/types';

// Types
interface UserState {
  userInfo: User;
  getUserInfoStatus: LoadingStatus;
}

const initialState: UserState = {
  userInfo: { name: null, email: null, token: null },
  getUserInfoStatus: LoadingStatus.idle,
};

// Slice
const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    login(state, action) {
      state.userInfo = {
        name: action.payload.name,
        email: action.payload.email,
        token: action.payload.token,
      };
      localStorage.setItem('user', JSON.stringify(state.userInfo));
    },
    getUser(state) {
      const user = localStorage.getItem('user');
      state.userInfo = user ? JSON.parse(user) : { name: null, email: null, token: null };
      state.getUserInfoStatus = LoadingStatus.success;
    },
    logout(state) {
      state.userInfo = { name: null, email: null, token: null };
      localStorage.clear();
    },
  },
});

export const { login, getUser, logout } = userSlice.actions;
export default userSlice.reducer;
