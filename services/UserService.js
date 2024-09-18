import axios from 'axios';
import Keys from "@/Keys";

// Create an axios instance
const userService = axios.create({
    baseURL: Keys.USER_SERVICE_API_URL
});

// get all users
export const getUsers = async (count, page, key, val) => {
    try {
        const response = await userService.get(`/api/user/users/${count}/${page}?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


// get all users count
export const getUsersCount = async (key, val) => {
    try {
        const response = await userService.get(`/api/user/users/count?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all users by status
export const getUsersByStatus = async (count, page, status, key, val) => {

    // convert status array to string with commas
    let statusString = status.join(',');

    console.log(statusString);

    try {
        const response = await userService.get(`/api/user/users/status/${count}/${page}?status=${statusString}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all users by status count
export const getUsersByStatusCount = async (status, key, val) => {

    // convert status array to string with commas
    let statusString = status.join(',');

    console.log(statusString);

    try {
        const response = await userService.get(`/api/user/users/status/count?status=${statusString}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getUsersByDatetime = async (count, page, start, end, key, val) => {

    console.log(start);

    try {
        const response = await userService.get(`/api/user/users/datetime/${count}/${page}?start=${start}&end=${end}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getUsersByDatetimeCount = async (start, end, key, val) => {
    try {
        const response = await userService.get(`/api/user/users/datetime/count?start=${start}&end=${end}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// export const getUserById = async (id) => {
//     try {
//         const response = await webpagesService.get(`/api/user/user/${id}`);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// }

export const deleteUser = async (id) => {
    try {
        const response = await userService.delete(`/api/user/users/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteUsersBulk = async (ids) => {
    let idsString = ids.join(',');

    try {
        const response = await userService.delete(`/api/user/users/bulk/${idsString}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateUsersStatusBulk = async (ids, status) => {
    let idsString = ids.join(',');

    try {
        const response = await userService.put(`/api/user/users/status/bulk/${idsString}`, {status: status});
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateUsersStatus = async (id, status) => {
    try {
        const response = await userService.put(`/api/user/users/status/${id}`, {status: status});
        return response.data;
    } catch (error) {
        throw error;
    }
}
