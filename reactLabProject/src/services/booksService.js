import axios from "axios";

const axiosInstance=axios.create(
{
    withCredentials:true
}
)
//getallbooks

export const getAllBooks = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/book/getAll');
        return  response.data;
    }
    catch (err) {
        throw err;
    }
}

//getAllBySearch

export const getAllBySearch = async (search) =>{
    try{
        const response = await axios.get(`http://localhost:8080/api/book/getAllBySearch/${search}`);
        return response;
    }
    catch(err){
        throw err;
    }
}

//createBookCategoryId

export const createBookCategoryId = async (send)=>{
    try{
        const response = await axios.post(`http://localhost:8080/api/book/createBookCategoryId/${send.categoryId}`,send.newBook);
        return response.data;
    }
    catch(err){
        throw err;
    }
}
//createBookManager

export const createBookManager = async (data)=>{
    try{
        const response = await axios.post('http://localhost:8080/api/book/createBookManager',data,{
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
        return await axios.put(`http://localhost:8080/api/book/updateBook/${book.id}`, book);
    }
    catch(err){
        throw err;
    }
}

//getAllChapters
export const getAllChapters = async(id) =>{
    try{
        const response = await axios.get(`http://localhost:8080/api/book/getAllChapters/${id}`);
        return response;
    }
    catch(err){
        throw err;
    }
}


//getBookById
export const getBookById = async(id) =>{
    try{
        const response = await axios.get(`http://localhost:8080/api/book/getBook/${id}`);
        return response.data;
    }
    catch(err){
        throw err;
    }
}

//deleteBook
export const deleteBook = async(id)=>{
    try{
        const response = await axios.delete(`http://localhost:8080/api/book/deleteBook/${id}`);
        return response;
    }
    catch(err){
        throw err;
    }
}

//getDailyBook
export const getDdailyBook = async()=>{
    try{
        const response = await axios.get('http://localhost:8080/api/book/getDailyBook');
        return response.data;
    }
    catch(err){
        throw err;
    }
}