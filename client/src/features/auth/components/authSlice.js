import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  userRole: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reducer สำหรับการตั้งค่าสถานะการล็อกอิน
    setAuthStatus: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userRole = action.payload.userRole;
      state.isLoading = false;
    },
    // Reducer สำหรับการล็อกอิน
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.userRole = action.payload.role;
      state.isLoading = false;
    },
    // Reducer สำหรับการล็อกเอาต์
    logout: (state) => {
      state.isAuthenticated = false;
      state.userRole = null;
      state.isLoading = false;
      localStorage.removeItem('token');
    },
    // Reducer สำหรับตั้งค่า isLoading
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
});

// export actions ที่สร้างโดย createSlice โดยอัตโนมัติ
export const { setAuthStatus, loginSuccess, logout, setLoading } = authSlice.actions;

// export reducer เพื่อนำไปใช้ใน store.js
export default authSlice.reducer;