import axios from 'axios';
import Keys from "@/Keys";
import {AuthHeaders} from "@/util/AuthHeader";

// Create an axios instance -- NO NEED TO CHANGE THIS
const webpagesService = axios.create({
    baseURL: Keys.USER_SERVICE_API_URL,
    headers: AuthHeaders
});

// get all webpages // TODO: Change this function accordingly
export const GetAutoResponds = async (count, page, key, val, webId) => {
    try {
        const response = await webpagesService.get(`/api/chat/auto_respond/${count}/${page}/${webId}?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// get all webpages count // TODO: Change this function accordingly
export const getAutoRespondsCount = async (key, val,webId) => {
    try {
        const response = await webpagesService.get(`/api/chat/auto_respond/count/${webId}?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status // TODO: Change this function accordingly
export const getAutoRespondsByStatus = async (count, page, status, key, val,webId) => {

    // convert status array to string with commas
    let statusString = status.join(',');

    console.log(statusString);

    try {
        const response = await webpagesService.get(`/api/chat/auto_respond/status/${count}/${page}/${webId}?status=${statusString}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status count // TODO: Change this function accordingly
export const getAutoRespondsByStatusCount = async (status, key, val,webId) => {

    // convert status array to string with commas
    let statusString = status.join(',');

    console.log(statusString);

    try {
        const response = await webpagesService.get(`/api/chat/auto_respond/status/count/${webId}?status=${statusString}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by datetime // TODO: Change this function accordingly
export const getAutoRespondsByDatetime = async (count, page, start, end, key, val,webId) => {

    console.log(start);

    try {
        const response = await webpagesService.get(`/api/chat/auto_respond/datetime/${count}/${page}/${webId}?start=${start}&end=${end}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by datetime count // TODO: Change this function accordingly
export const getAutoRespondsByDatetimeCount = async (start, end, key, val,webId) => {
    try {
        const response = await webpagesService.get(`/api/chat/auto_respond/datetime/count/${webId}??start=${start}&end=${end}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime // TODO: Change this function accordingly
export const editAutoResponds = async (id, data,webId) => {
    try {
        const response = await webpagesService.put(`/api/chat/auto_respond/${id}/${webId}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const getAutoRespondsById = async (id,webId) => {
    try {
        const response = await webpagesService.get(`/api/chat/auto_respond/id/${id}/${webId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const deleteAutoResponds = async (id,webId) => {
    try {
        const response = await webpagesService.delete(`/api/chat/auto_respond/${id}/${webId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const deleteAutoRespondsBulk = async (ids,webId) => {
    let idsString = ids.join(',');

    try {
        const response = await webpagesService.delete(`/api/chat/auto_respond/bulk/${idsString}/${webId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const updateAutoRespondsStatusBulk = async (ids, status,webId) => {
    let idsString = ids.join(',');

    try {
        const response = await webpagesService.put(`/api/chat/auto_respond/status/bulk/${idsString}/${webId}`, {status: status});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const updateAutoRespondsStatus = async (id, status,webId) => {
    try {
        const response = await webpagesService.put(`/api/chat/auto_respond/status/${id}/${webId}`, {status: status});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const addAutoRespond = async (data,webId) => {
    try {
        const response = await webpagesService.post(`/api/chat/auto_respond/${webId}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const GetAutoRespondsByWebID = async ( webId) => {
    try {
        const response = await webpagesService.get(`/api/chat/auto_respond/get/${webId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
