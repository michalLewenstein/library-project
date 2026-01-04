import { configureStore } from "@reduxjs/toolkit"
import userDetailsReducer from '../slices/userSlice'
import categoryRrducer from '../slices/categorySlice'
import bookReducer from '../slices/bookSlice'
import chapterReducer from '../slices/categorySlice'
import authorReducer from '../slices/authorSlice'
import responseReducer from '../slices/responseSlice'

export const store = configureStore({
    reducer: {
        //user=שם שקראנו לקטע של המשתמשים המאוחסנים בstor 
        //כותבים את השם שהגדרנו בתוספת reducer
        userDetails: userDetailsReducer,
        category: categoryRrducer,
        book: bookReducer,
        chapter: chapterReducer,
        author : authorReducer,
        response : responseReducer
    },
}) 