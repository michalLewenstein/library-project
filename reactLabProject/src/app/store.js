import { configureStore } from "@reduxjs/toolkit"
import userReducer from '../slices/userSlice'
import categoryRrducer from '../slices/categorySlice'
import bookReducer from '../slices/bookSlice'
import chapterReducer from '../slices/categorySlice'
import authorReducer from '../slices/authorSlice'
import responseReducer from '../slices/responseSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        category: categoryRrducer,
        book: bookReducer,
        chapter: chapterReducer,
        author : authorReducer,
        response : responseReducer
    },
}) 