import axiosInstance from "./api";

//getAllAuther
export const getAllAuther = async () =>{
  try{
    const response = await axiosInstance.get('/auther/getAll');    
    return response.data;
  }
  catch(err){
    throw err;
  }
}