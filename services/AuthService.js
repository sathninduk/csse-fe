import axios from 'axios';
import Keys from "@/Keys";

// Create an axios instance -- NO NEED TO CHANGE THIS
const authService = axios.create({
    baseURL: Keys.AUTH_SERVICE_API_URL
});

// login
export const LoginService = async (data) => {
    console.log(data);
    try {
        const response = await authService.post(`/api/auth/signin`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// status
export const StatusService = async () => {
    try {
        const response = await authService.get(`/api/auth/status`);
        return response.data;
    } catch (error) {
        throw error;
    }
}