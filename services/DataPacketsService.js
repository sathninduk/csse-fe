import axios from 'axios';
import Keys from "@/Keys";
import {AuthHeaders} from "@/util/AuthHeader";

// Create an axios instance -- NO NEED TO CHANGE THIS
const webpagesService = axios.create({
    baseURL: Keys.DATA_PACKETS_SERVICE_API_URL,
    headers: AuthHeaders
});

// get all webpages // TODO: Change this function accordingly
export const getWebPages = async (count, page, key, val, siteId) => {
    try {
        const response = await webpagesService.get(`/api/v1/data-packets/data/pages/${siteId}/${count}/${page}?key=${key}&val=${val}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
};


// get all webpages count // TODO: Change this function accordingly
export const getWebPagesCount = async (key, val, siteId) => {
    try {
        const response = await webpagesService.get(`/api/v1/data-packets/data/pages/count/${siteId}?key=${key}&val=${val}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages // TODO: Change this function accordingly
export const getElements = async (count, page, key, val, siteId, pageId) => {
    try {
        const response = await webpagesService.get(`/api/v1/data-packets/data/elements/${siteId}/${pageId}/${count}/${page}?key=${key}&val=${val}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
};


// get all webpages count // TODO: Change this function accordingly
export const getElementsCount = async (key, val, siteId, pageId) => {
    try {
        const response = await webpagesService.get(`/api/v1/data-packets/data/elements/count/${siteId}/${pageId}?key=${key}&val=${val}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const deleteElement = async (siteId, pageId, element) => {
    try {
        const response = await webpagesService.delete(`/api/v1/data-packets/data/element/${siteId}/${pageId}/${element}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const deleteElementsBulk = async (siteId, pageId, ids) => {
    let idsString = ids.join(',');

    try {
        const response = await webpagesService.delete(`/api/v1/data-packets/data/element/bulk/${siteId}/${pageId}/${idsString}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}