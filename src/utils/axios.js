
import axios from "axios";


export const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("access_token") || sessionStorage.getItem("access_token")
  }
})


// Axios response interceptor to handle token refresh
Axios.interceptors.response.use(
  response => response, // If response is successful, just return it
  async error => {
    const originalRequest = error.config;

    // Check if the error is due to an expired access token
    if (error.response && error.response.status === 400 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the access token
        const newAccessToken = await getAccessToken();

        // Update the Authorization header and retry the original request
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return Axios(originalRequest);
      } catch (refreshError) {
        // If refreshing fails, redirect to login or handle as needed
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


const getAccessToken = async () => {

  const refreshToken = localStorage.getItem("refresh_token") || sessionStorage.getItem("refresh_token")
  const body = {
    refresh_token: refreshToken
  }
  try {
    const resp = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/refresh`, body)
    const { access_token } = resp.data;
    localStorage.setItem("access_token", access_token)
    sessionStorage.setItem("access_token", access_token)
    return access_token
  } catch (err) {
    throw new Error("unable to refresh access token")
  }
}