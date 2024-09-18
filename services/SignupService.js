import axios from 'axios';
import Keys from "@/Keys";

// Create an axios instance -- NO NEED TO CHANGE THIS
const SignUpService = axios.create({
    baseURL: Keys.AUTH_SERVICE_API_URL
});

// login
export const SignupService = async (data) => {
    console.log(data);
    try {
        const response = await SignUpService.post(`/api/auth/signup`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}