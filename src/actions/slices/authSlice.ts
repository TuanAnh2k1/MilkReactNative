import {createSlice} from '@reduxjs/toolkit';

interface IAuthState {
  token?: string;
  isFirstOpen?: boolean;
  fcmToken?: string;
  language: string;
}

const initialState: IAuthState = {
  isFirstOpen: true,
  language: 'jp',
};

const loginRequest = () => {};

const setToken = (state: any, {payload}: any) => {
  state.token = payload?.access_token || '';
};
const setStatusOpen = (state: any, {isFirstOpen}: any) => {
  state.isFirstOpen = isFirstOpen || '';
};

const clearToken = (state: any) => {
  state.token = '';
};

const setFcmToken = (state: any, {payload}: any) => {
  state.fcmToken = payload || '';
};

const setLanguage = (state: any, {payload}: any) => {
  state.language = payload.param || 'jp';
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest,
    setLanguage,
    setStatusOpen,
    setToken,
    clearToken,
    setFcmToken,
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
