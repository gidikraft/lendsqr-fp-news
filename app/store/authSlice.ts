import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './Store';
import { UserDetails } from '@/types';

interface initialAppState {
  isAuthenticated: boolean;
  userData: UserDetails;
}

const initialUserData = {
  email: '',
  firstname: '',
  lastname: '',
  phonenumber: '',
  accessToken: null,
};

const initialState: initialAppState = {
  isAuthenticated: false,
  userData: initialUserData,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: state => {
      state.isAuthenticated = true;
    },
    logout: state => {
      state.isAuthenticated = false;
    },
    setUserDetails: (state, { payload }) => {
      state.userData = payload;
    },
  },
});

export const { login, logout, setUserDetails } = authSlice.actions;

export const authSelector = (state: RootState) => state.auth.isAuthenticated;

export default authSlice.reducer;
