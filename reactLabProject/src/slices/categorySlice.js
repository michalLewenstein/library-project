import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCategory } from '../services/categoryService';
//===========getallcategory
export const getallcategory = createAsyncThunk("categoryList/getallcategory", async () => {
  try {
    const categories = await getAllCategory();
    return categories;
  }
  catch (err) {
    return err;
  }
})


const initialState = {
  categoryList: [],
  selectedCategory_id: null,
  categoryById: null,//קטגוריה לבחירה לכתיבת ספר בהמשכים
  loading: false,
  error: null
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelectedCategory: ((state, action) => {
      state.selectedCategory_id = action.payload;
    }),

  },
  extraReducers: (builder) => {
    builder
      //==============getallcategory
      .addCase(getallcategory.fulfilled, (state, actions) => {
        state.categoryList = actions.payload;
      })
      .addCase(getallcategory.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(getallcategory.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.error.message;
      })

  }
})
//ייצוא פעולות אקשנס
export const { setSelectedCategory,setSelectedCategory_id } = categorySlice.actions
//ייצוא רדוסר
export default categorySlice.reducer