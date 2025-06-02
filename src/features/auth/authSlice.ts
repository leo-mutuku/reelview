import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from './types';
// Load initial state from sessionStorage if available
const loadAuthFromStorage = (): AuthState => {
  try {
    const token = sessionStorage.getItem('token');
    const user = sessionStorage.getItem('user');
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    if (token && user && isAuthenticated) {
      return {
        user: JSON.parse(user),
        token,
        isAuthenticated: JSON.parse(isAuthenticated), 
      };
    }
  } catch (error) {
    console.error('Error loading auth from storage:', error);
  }
  return {
    user: null,
    token: null,
    isAuthenticated: false,
  };
};
const initialState: AuthState = loadAuthFromStorage();
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      // Persist to sessionStorage
      sessionStorage.setItem('token', action.payload.token);
      sessionStorage.setItem('user', JSON.stringify(action.payload.user));
      sessionStorage.setItem('isAuthenticated', JSON.stringify(true)); 
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      
      // Clear from sessionStorage
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('isAuthenticated');
    },
    clearAuth: (state) => {
      // Same as logout but can be used for token expiration
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('isAuthenticated');
    },
  },
});
export const { setCredentials, logout, clearAuth } = authSlice.actions;
export default authSlice.reducer;
