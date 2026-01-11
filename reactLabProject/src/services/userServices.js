import axiosInstance from "./api";

// login
export const logInUser = async (user) => {
  const response = await axiosInstance.post("/users/login", user);
  return response.data;
};

// signup
export const signUpUser = async (user) => {
  const response = await axiosInstance.post("/users/signup", user);
  return response.data;
};

// update user
export const updateUser = async (user) => {
  const response = await axiosInstance.put(`/users/updateUsers/${user.id}`, user);
  return response.data;
};
