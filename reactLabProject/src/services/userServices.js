import axiosInstance from "./api";

//logIn
export const logInUser = async (user) => {
    try {
        const response = await axiosInstance.post('/users/logIN', user);
        return response.data;
    } catch (err) {
        throw err;
    }
};

//signup
export const signUpUser = async (user) => {
    try {
        const response = await axiosInstance.post('/users/signup', user)
        return response.data;
    }
    catch (err) {
       throw err.response;
    }
}

//UpdateUser
export const UpdateUser = async(newUser)=>{    
    try{
        const response = await axiosInstance.put(`/users/updateUsers/${newUser.id}`,newUser);
        return response.data;
    }
    catch(err){
        throw err;
    }
}