import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://beta.bwalab.netapi/',
    timeout: 5000,
    headers: {
        'Authorization': "Token " + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

export default axiosInstance