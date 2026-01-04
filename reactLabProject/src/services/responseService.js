import axios from "axios";

const axiosInstance=axios.create(
    {
        withCredentials:true
    }
    )
//createResponse
export const createResponse = async (newResponse)=>{
    try{
        const response = await axios.post('http://localhost:8080/api/response/createResponse', newResponse);
        console.log(response.data);
        return response.data;
        
    }
    catch(err){
        throw err;
    }
}

//getAllResponse

export const getAllResponse = async (bookId)=>{
    try{
        const response = await axios.get(`http://localhost:8080/api/book/getallresponse/${bookId}`);
        console.log("מה שחוזר מרשימת הספרים מהסרסיס",response.data);
        return response.data;
        
    }
    catch(err){
        throw err;
    }
}

//deleteResponse
export const deleteResponse = async(id)=>{
    try{
        const response = await axios.delete(`http://localhost:8080/api/response/deleteResponse/${id}`);
        console.log(response);
        
        return response;
    }
    catch(err){
        throw err;
    }
}