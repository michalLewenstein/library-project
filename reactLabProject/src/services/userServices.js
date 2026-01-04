import axios from 'axios';

const axiosInstance=axios.create(
    {
        withCredentials:true
    }
    )
//logIn
export const logInUser = async (user) => {
    try {
        const response = await axios.post('http://localhost:8080/api/users/logIN', user);
        return response;
    } catch (err) {
        throw err;
    }
};

//signup
export const signUpUser = async (user) => {
    try {
        const response = await axios.post('http://localhost:8080/api/users/signup', user)
        console.log('responseAxios', response);
        return response;
    }
    catch (err) {
        console.log('err', err);
       throw err.response;
    }
}

//UpdateUser
export const UpdateUser = async(newUser)=>{
    console.log("newUser for update", newUser);
    
    try{
        const response = await axios.put(`http://localhost:8080/api/users/updateUsers/${newUser.id}`,newUser);
        console.log("response", response);
        return response.data;
    }
    catch(err){
        throw err;
    }
}