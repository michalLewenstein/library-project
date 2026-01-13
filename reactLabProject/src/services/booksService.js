import axiosInstance from "./api";

//getallbooks
export const getAllBooks = async () => {
    try {
        const response = await axiosInstance.get('/book/getAll');
        return  response.data;
    }
    catch (err) {
        throw err;
    }
}

//getAllBySearch
export const getAllBySearch = async (search) =>{
    try{
        const response = await axiosInstance.get(`/book/getAllBySearch/${search}`);
        return response;
    }
    catch(err){
        throw err;
    }
}

//createBookCategoryId
export const createBookCategoryId = async (send)=>{
    try{
        const response = await axiosInstance.post(`/book/createBookCategoryId/${send.categoryId}`,send.newBook);
        return response.data;
    }
    catch(err){
        throw err;
    }
}
//createBookManager
export const createBookManager = async (data)=>{
    try{
        const response = await axiosInstance.post('/book/createBookManager',data,{
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        });
        return response.data;
    }
    catch(err){
        throw err;
    }
}
//updateBook
export const updateBook = async (book) =>{
    try{
        return await axiosInstance.put(`/book/updateBook/${book.id}`, book);
    }
    catch(err){
        throw err;
    }
}

//getAllChapters
export const getAllChapters = async(id) =>{
    try{
        const response = await axiosInstance.get(`/book/getAllChapters/${id}`);
        return response;
    }
    catch(err){
        throw err;
    }
}

//getBookById
export const getBookById = async(id) =>{
    try{
        const response = await axiosInstance.get(`/book/getBook/${id}`);
        return response.data;
    }
    catch(err){
        throw err;
    }
}

//deleteBook
export const deleteBook = async(id)=>{
    try{
        const response = await axiosInstance.delete(`/book/deleteBook/${id}`);
        return response;
    }
    catch(err){
        throw err;
    }
}

//getDailyBook
export const getDdailyBook = async()=>{
    try{
        const response = await axiosInstance.get('/book/getDailyBook');
        return response.data;
    }
    catch(err){
        throw err;
    }
}