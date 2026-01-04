//createauthor

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  getAllAuther } from "../services/authorService";


//getallauthor
export const getallauthor = createAsyncThunk ("aothorList/getallauthor", async()=>{
  try{
      const response = await getAllAuther();
      console.log("מה שחוזר מהלייס בסופר:999999999999999999999999999999 ", response);
      
      return response;
  }
  catch(err){
      return err;
  }
})

const initialState = {
    authorList:[],
    loading: false,
    error: null,
}

export const authorSlice = createSlice ({
    name: 'author',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
      builder
      
      //getallauthor
      .addCase(getallauthor.fulfilled,(state, action)=>{
        state.authorList = action.payload;
      })
      .addCase(getallauthor.pending,(state)=>{
        state.loading = true;
        state.error = null
      })
      .addCase(getallauthor.rejected,(state, action)=>{
        state.error = action.error.message;
      })
    }
})

export default authorSlice.reducer;