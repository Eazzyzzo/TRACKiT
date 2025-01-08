import axios from 'axios';

// Leverage environment variables for a more robust approach
const API_URL_DEV = process.env.REACT_APP_API_URL_DEV || 'http://localhost:5001/api';
const API_URL_PROD = process.env.REACT_APP_API_URL_PROD || 'https://vercel.com/israels-projects-d88997c7/trackit/ErUocxBG9MZTN5fnzaVJY7RGGsoE';

const baseUrl = process.env.NODE_ENV === 'production' ? API_URL_PROD : API_URL_DEV;

const API = axios.create({
  baseURL: baseUrl,
  withCredentials: true, // Ensure cookies are sent with requests
});

API.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    if (error.response?.status === 401 && error.response.data?.message === 'Invalid token') {
      console.log('Access token expired. Attempting to refresh...');
      try {
        const { data } = await API.post('/auth/refresh');

	console.log('New access token received:', data.accessToken);

        localStorage.setItem('accessToken', data.accessToken);
        error.config.headers.Authorization = `Bearer ${data.accessToken}`;
        return API.request(error.config);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
	//Redirect to login if refresh fails
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;
