import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {createChapter} from '../services/chapterService'

//createchapter
export const createchapter = createAsyncThunk("createchapter/chapter",async (newChapter)=>{
        try{
            const response = await createChapter(newChapter);
            console.log("הצליח בסלייס");
            
            console.log("response",response);
            return response;
        }
        catch(err){
            return err;
        }
     })

const initialState = {
    chapter : null,
    loading: false,
    error: null,
}

export const chapterSlice = createSlice({
    name: 'chapter',
    initialState, 
    reducers:{},
    extraReducers: (builder) =>{
        builder
        //createchapter
        .addCase(createchapter.fulfilled, (state, action)=>{
            state.chapter = action.payload;
        })
        .addCase(createchapter.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(createchapter.rejected,(state, action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
    }
})
export default chapterSlice.reducer;

