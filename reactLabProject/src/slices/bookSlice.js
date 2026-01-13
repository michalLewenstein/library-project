import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createBookCategoryId, createBookManager, deleteBook, getAllBooks, getAllBySearch, getAllChapters, getBookById, getDdailyBook, updateBook } from '../services/booksService';


//getallbooks
export const getallbooks = createAsyncThunk("book/getallbooks", async () => {
    try {
        const books = await getAllBooks();
        return books;
    }
    catch (err) {
        throw err;
    }
})

//getbookbyid
export const getbookbyid = createAsyncThunk("book/getbookbyid", async (id) => {
    try {
        const books = await getBookById(id);
        return books;
    }
    catch (err) {
        throw err;
    }
})

//deletebook
export const deletebook = createAsyncThunk("book/deletebook", async (bookId) => {
    try {
        const response = await deleteBook(bookId);
        return response;
    }
    catch (err) {
        throw err;
    }
})

//getallbooksbysearch
export const getallbooksbysearch = createAsyncThunk("book/getallbooksbysearch",
    async (search) => {
        try {
            const bookList = await getAllBySearch(search);
            return bookList.data;
        }
        catch (err) {
            throw err;
        }
    })

//createbookcategoryId
export const createbookcategoryId = createAsyncThunk("book/createbookcategoryId", async (send) => {
    try {
        const response = await createBookCategoryId(send);
        return response;
    }
    catch (err) {
        throw err;
    }
})
//createbookmanager
export const createbookmanager = createAsyncThunk("bookManager/createbookmanager", async ({ book, urlImage }) => {
    try {
        const formData = new FormData();
        formData.append(
            'book',

            new Blob([JSON.stringify(book)], { type: 'application/json' })
        );
        formData.append('image', urlImage);
        const response = await createBookManager(formData);
        return response;
    }
    catch (err) {
        throw err;
    }
})

//updatebook
export const updatebook = createAsyncThunk(
    "book/updatebook", async (book) => {
        try {
            const response = await updateBook(book);
            return response;
        }
        catch (err) {
            throw err;
        }
    })

//getallchapters
export const getallchapters = createAsyncThunk(
    "book/getallchapters", async (id) => {
        try {
            const response = await getAllChapters(id);
            return response.data;
        }
        catch (err) {
            throw err;
        }
    })

//getdailybook
export const getdailybook = createAsyncThunk("book/getdailybook", async () => {
    try {
        return await getDdailyBook();
    }
    catch (err) {
        throw err;
    }
})

const initialState = {
    booksList: [],
    selectedBook: null,
    loading: false,
    error: null,
    bookListSearch: {
        bookListTitle: [],
        bookListAuthor: []
    },
    book: null,
    chapters: [],
    bookManager: null,
    dailyBook: null
}

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        setSelectedBook: ((state, action) => {
            state.selectedBook = action.payload;
            localStorage.setItem("selectedBook", JSON.stringify(action.payload));
        }),
        removeBookFromList: (state, action) => {
            const bookId = action.payload;
            state.bookListSearch.bookListTitle = state.bookListSearch.bookListTitle.filter(
                (book) => book.id !== bookId
            );
            state.bookListSearch.bookListAuthor = state.bookListSearch.bookListAuthor.filter(
                (book) => book.id !== bookId
            );
        },
    },
    extraReducers: (builder) => {
        builder
            //getallbooks
            .addCase(getallbooks.fulfilled, (state, action) => {
                state.loading = false;
                state.booksList = action.payload;
            })
            .addCase(getallbooks.pending, (state) => {
                state.loading = true;
            })
            .addCase(getallbooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //getallbooksbysearch
            .addCase(getallbooksbysearch.fulfilled, (state, action) => {
                state.bookListSearch = action.payload;

            })
            .addCase(getallbooksbysearch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.bookListSearch = [];
            })
            //createbook
            .addCase(createbookcategoryId.fulfilled, (state, action) => {
                state.book = action.payload;

            })
            .addCase(createbookcategoryId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.bookListSearch = [];
            })
            //updatebook
            .addCase(updatebook.fulfilled, (state, action) => {
                state.book = action.payload;

            })
            .addCase(updatebook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //createbookmanager
            .addCase(createbookmanager.fulfilled, (state, action) => {
                state.bookManager = action.payload;

            })
            .addCase(createbookmanager.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //getallchapters
            .addCase(getallchapters.fulfilled, (state, action) => {
                state.chapters = action.payload;
            })
            .addCase(getallchapters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //deletebook
            .addCase(deletebook.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.booksList = state.booksList.filter(book => book.id !== action.meta.arg);
            })
            .addCase(deletebook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //getbookbyid
            .addCase(getbookbyid.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.book = action.payload;
            })
            .addCase(getbookbyid.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            //getdailybook
            .addCase(getdailybook.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.dailyBook = action.payload;
            })
            .addCase(getdailybook.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
    }
})
export const { setSelectedBook, removeBookFromList } = bookSlice.actions
export default bookSlice.reducer

