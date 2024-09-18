import axios from 'axios';
import Keys from "@/Keys";
import {AuthHeaders} from "@/util/AuthHeader";

// Create an axios instance -- NO NEED TO CHANGE THIS
const UserProfileService = axios.create({
    baseURL: Keys.USER_SERVICE_API_URL,
    headers: AuthHeaders
});

// get all webpages // TODO: Change this function accordingly
export const GetUserData = async () => {
    try {
        const response = await UserProfileService.get(`https://visitor.dpacks.net/api/pros/Users/GetData`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const UpdateUser = async (data) => {
    try {
        console.log(data);
        const response = await UserProfileService.put(`https://visitor.dpacks.net/api/pros/Users/Update`,data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

