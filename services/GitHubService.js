import axios from 'axios';
import Keys from "@/Keys";
import {AuthHeaders} from "@/util/AuthHeader";

// Create an axios instance
const userService = axios.create({
    baseURL: Keys.USER_SERVICE_API_URL,
    headers: AuthHeaders
});

// GitHub auth service
export const authorizeGithub = async (code) => {
    try {
        const response = await userService.get(`/api/github/auth?code=${code}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const GetGitHubToken = async () => {
    try {
        const response = await userService.get(`/api/github/token`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const GetGitHubRepository = async () => {
    try {
        const response = await userService.get(`/api/github/repo`);
        return response.data;
    } catch (error) {
        throw error;
    }
}