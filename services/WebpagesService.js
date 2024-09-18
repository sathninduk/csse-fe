import axios from 'axios';
import Keys from "@/Keys";
import {AuthHeaders} from "@/util/AuthHeader";

// Create an axios instance -- NO NEED TO CHANGE THIS
const webpagesService = axios.create({
    baseURL: Keys.USER_SERVICE_API_URL,
    headers: AuthHeaders
});

// get all webpages // TODO: Change this function accordingly
export const getWebPages = async (count, page, key, val) => {
    try {
        const response = await webpagesService.get(`/api/web/webpages/${count}/${page}?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


// get all webpages count // TODO: Change this function accordingly
export const getWebPagesCount = async (key, val) => {
    try {
        const response = await webpagesService.get(`/api/web/webpages/count?key=${key}&val=${val}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status // TODO: Change this function accordingly
export const getPagesByStatus = async (count, page, status, key, val) => {

    // convert status array to string with commas
    let statusString = status.join(',');

    console.log(statusString);

    try {
        const response = await webpagesService.get(`/api/web/webpages/status/${count}/${page}?status=${statusString}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status count // TODO: Change this function accordingly
export const getPagesByStatusCount = async (status, key, val) => {

    // convert status array to string with commas
    let statusString = status.join(',');

    console.log(statusString);

    try {
        const response = await webpagesService.get(`/api/web/webpages/status/count?status=${statusString}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by datetime // TODO: Change this function accordingly
export const getPagesByDatetime = async (count, page, start, end, key, val) => {

    console.log(start);

    try {
        const response = await webpagesService.get(`/api/web/webpages/datetime/${count}/${page}?start=${start}&end=${end}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by datetime count // TODO: Change this function accordingly
export const getPagesByDatetimeCount = async (start, end, key, val) => {
    try {
        const response = await webpagesService.get(`/api/web/webpages/datetime/count?start=${start}&end=${end}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime // TODO: Change this function accordingly
export const editPages = async (id, data) => {
    try {
        const response = await webpagesService.put(`/api/web/webpages/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const getPageById = async (id) => {
    try {
        const response = await webpagesService.get(`/api/web/webpage/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const deletePage = async (id) => {
    try {
        const response = await webpagesService.delete(`/api/web/webpages/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const deleteWebpagesBulk = async (ids) => {
    let idsString = ids.join(',');

    try {
        const response = await webpagesService.delete(`/api/web/webpages/bulk/${idsString}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const updateWebpagesStatusBulk = async (ids, status) => {
    let idsString = ids.join(',');

    try {
        const response = await webpagesService.put(`/api/web/webpages/status/bulk/${idsString}`, {status: status});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const updateWebpagesStatus = async (id, status) => {
    try {
        const response = await webpagesService.put(`/api/web/webpages/status/${id}`, {status: status});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const AddWebpage = async (data) => {
    try {
        const response = await webpagesService.post(`/api/web/webpage`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}