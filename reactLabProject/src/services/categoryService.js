import axios from "axios";

const axiosInstance=axios.create(
    {
        withCredentials:true
    }
    )


//getallcategory
export const getAllCategory = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/category/getAll');
        console.log('responseAxios', response);
        return response.data;
    }
    catch (err) {
        throw err;
    }
}


