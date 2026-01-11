import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { logInUser, UpdateUser } from '../services/userServices'

//=====login
export const login = createAsyncThunk(
  "user/login", 
  async (newUser, { rejectWithValue }) => {
  try {
    const userData = await logInUser(newUser);
    localStorage.setItem("user", JSON.stringify(userData));
    return userData;
  }
  catch (err) {
    return rejectWithValue(
      err.response?.data?.message || "שגיאת התחברות");
  }
})

//updateUser
export const update = createAsyncThunk(
  "user/update",
   async (newUser, { rejectWithValue }) => {
  try {
    return await UpdateUser(newUser);
  }
  catch (err) {
    return rejectWithValue(err.response?.data || "שגיאה בעדכון משתמש");
  }
})

const initialState = {
  user: null,
  isConnected: false,
  loading: false,
  error: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isConnected = false;
      state.error = null;
      localStorage.removeItem("user");
    },
    setUserFromStorage: (state, action) => {
      state.user = action.payload;
      state.isConnected = true;
    }
  },
  extraReducers: (builder) => {
    builder
      //login
      //finish
      .addCase(login.fulfilled, (state, actions) => {
        state.loading = false;
        state.isConnected = true;
        state.user = actions.payload;
      })
      //middle
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      //failed
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //updateUser
      .addCase(update.fulfilled, (state, action) => {
        debugger;
        state.user = action.payload;
      })
      .addCase(update.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(update.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
  }
})

export const { logout, setUserFromStorage } = userSlice.actions
export default userSlice.reducer