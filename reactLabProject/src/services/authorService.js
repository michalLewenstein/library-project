import axios from "axios";
const axiosInstance=axios.create(
  {
      withCredentials:true
  }
  )

//getAllAuther
export const getAllAuther = async () =>{
  try{
    const response = await axios.get('http://localhost:8080/api/auther/getAll');    
    return response.data;
  }
  catch(err){
    throw err;
  }
}