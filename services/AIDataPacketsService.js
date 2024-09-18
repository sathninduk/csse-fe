import axios from 'axios';
import Keys from "@/Keys";
import {AuthHeaders} from "@/util/AuthHeader";

// Create an axios instance -- NO NEED TO CHANGE THIS
const webpagesService = axios.create({
    baseURL: Keys.DATA_PACKETS_SERVICE_API_URL,
    headers: AuthHeaders
});

export const addAIFolders = async (data, siteId) => {
    try {
        const response = await webpagesService.post(`/api/v1/data-packets/ai/${siteId}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }

}


// get all webpages // TODO: Change this function accordingly
export const getAIFolders = async (count, page, key, val, siteId) => {
    try {
        const response = await webpagesService.get(`/api/v1/data-packets/ai/folders/${siteId}/${count}/${page}?key=${key}&val=${val}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
};


// get all webpages count // TODO: Change this function accordingly
export const getAIFoldersCount = async (key, val, siteId) => {
    try {
        const response = await webpagesService.get(`/api/v1/data-packets/ai/folders/count/${siteId}?key=${key}&val=${val}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages // TODO: Change this function accordingly
export const getAIPackets = async (count, page, key, val, siteId, pageId) => {
    try {
        const response = await webpagesService.get(`/api/v1/data-packets/ai/packets/${siteId}/${pageId}/${count}/${page}?key=${key}&val=${val}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
};


// get all webpages count // TODO: Change this function accordingly
export const getAIPacketsCount = async (key, val, siteId, pageId) => {
    try {
        const response = await webpagesService.get(`/api/v1/data-packets/ai/packets/count/${siteId}/${pageId}?key=${key}&val=${val}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
}