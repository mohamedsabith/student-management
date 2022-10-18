import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

//Auth Route
export const signUpUserApi = (userData) => API.post('/auth/signup', userData);
export const signInUserApi = (userData) => API.post('/auth/signin', userData);
export const forgotPassowordApi = (userMail) => API.post('/auth/forgotPassword', userMail);
export const resetPasswordApi = (userData) => API.post('/auth/resetPassword', userData)

//Student Route
export const createStudentApi = (studentData) => API.post('/student/studentAdd', studentData);