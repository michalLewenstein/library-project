import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createResponse, deleteResponse, getAllResponse } from "../services/responseService";

//createresponse
export const createresponse = createAsyncThunk("response/createresponse", async (newResponse) => {
  try {
    const response = await createResponse(newResponse);
    console.log(response);
    return response;

  }
  catch (err) {
    return err;
  }
})

//getallresponse
export const getallresponse = createAsyncThunk("responseList/getallresponse", async (bookId) => {
  try {
    const response = await getAllResponse(bookId);
    console.log(response);
    return response;

  }
  catch (err) {
    return err;
  }
})

//deleteresponse
export const deleteresponse = createAsyncThunk("response/deleteresponse", async (responseId) => {
  try {
    const response = await deleteResponse(responseId);
    console.log(response);

    return response;
  }
  catch (err) {
    return err;
  }
})

const initialState = {
  response: null,
  responseList: [],
  loading: false,
  error: null,
}

export const responseSlice = createSlice({
  name: 'response',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //createresponse
      .addCase(createresponse.fulfilled, (state, action) => {
        state.response = action.payload;
      })
      .addCase(createresponse.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(createresponse.rejected, (state, action) => {
        state.error = action.error.message;
      })
      //getallresponse
      .addCase(getallresponse.fulfilled, (state, action) => {
        state.responseList = action.payload;
      })
      .addCase(getallresponse.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(getallresponse.rejected, (state, action) => {
        state.error = action.error.message;
      })
      //deleteresponse
      .addCase(deleteresponse.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.responseList = state.responseList.filter(res => res.id !== action.meta.arg);
      })
      .addCase(deleteresponse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteresponse.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
  }
})

export default responseSlice.reducer;