import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { logInUser, signUpUser, UpdateUser } from '../services/userServices'

//=====login
export const login = createAsyncThunk("user/login", async (newUser, { rejectWithValue }) => {
  try {
    const userData = await logInUser(newUser);
    return userData;
  }
  catch (err) {
    return rejectWithValue(err);
  }


})
//=====signup
export const signup = createAsyncThunk("user/signup", async (newUser, { rejectWithValue }) => {
  try {
    const userData = await signUpUser(newUser);
    console.log("userslice user:", userData);
    return userData;
  }
  catch (err) {
    return rejectWithValue(err);
  }
})

//updateUser
export const update = createAsyncThunk("user/update", async (newUser, { rejectWithValue }) => {
  try {
    const response = await UpdateUser(newUser);
    console.log(response);

    return response;
  }
  catch (err) {
    return rejectWithValue(err);
  }
})

const initialState = {
  user: null,
  isConected: false, 
  loading: false,
  error: null
}

export const userSlice = createSlice({
  //שם שנותנים לחתיכה זו כדי להשתמש בה בstor
  name: 'userDetails',
  initialState,
  reducers: {
    // logout: (state) => {
    //   state.isConected = false;
    //   state.user = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      //==========login
      //הפעולה הסתיימה
      .addCase(login.fulfilled, (state, actions) => {
        debugger;
        console.log(actions.payload.data);
        state.user = actions.payload.data;
        localStorage.setItem("user", JSON.stringify(actions.payload));
      })
      //אמצע הפעלה
      .addCase(login.pending, (state) => {
        //פותח מצב טעינה
        state.loading = true;
        //איפוס הודעת שגיאה במידה ונשארה ההודעה הקודמת
        state.error = null
      })
      //טיפול במצב בו הפעולה נכשלה
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //==========signup
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.data;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //updateUser
      .addCase(update.fulfilled, (state, action) => {
        localStorage.removeItem("user");
        debugger;
        state.user = action.payload;
        console.log(user);
        

      })
      .addCase(update.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(update.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  }
})

//ייצוא אקשנים-פעולות
//export const { logout } = userSlice.actions

//יצוא רדוסר
export default userSlice.reducer