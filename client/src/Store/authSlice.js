import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

export const signin = createAsyncThunk('auth/signin', async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/signin', { email, password });
      if (response.data.status === false) {
        return rejectWithValue(response.data.message);
      }
      return response.data; // Phản hồi nên bao gồm cả token nếu thành công
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Something went wrong');
    }
  });
  

export const signup = createAsyncThunk('auth/signup', async ({ username, email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/signup', { username, email, password });
    if (response.data.status === false) {
      return rejectWithValue(response.data.message);
    }
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Something went wrong');
  }
});

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async ({ email }, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/forgot-password', { email });
    if (response.data.status === false) {
      return rejectWithValue(response.data.message);
    }
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Something went wrong');
  }
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async ({ token, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`http://localhost:3000/auth/reset-password/${token}`, { password });
    if (response.data.status === false) {
      return rejectWithValue(response.data.message);
    }
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Something went wrong');
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:3000/auth/logout');
    if (response.data.status === false) {
      return rejectWithValue(response.data.message);
    }
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Something went wrong');
  }
});


export const verify = createAsyncThunk('auth/verify', async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.status === false) {
        return rejectWithValue(response.data.message);
      }
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Something went wrong');
    }
  });
  

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Signin
      .addCase(signin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Access Denied! Invalid Credentials';
      })
      // Signup
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Sign Up Failed';
      })
      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to send reset email';
      })
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to reset password';
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'succeeded';
        state.user = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to logout';
      })
      // Verify
      .addCase(verify.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(verify.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to verify';
      });
  },
});

export default authSlice.reducer;
