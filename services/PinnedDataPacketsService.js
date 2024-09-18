import axios from 'axios';
import Keys from "@/Keys";
import {AuthHeaders} from "@/util/AuthHeader";

// Create an axios instance -- NO NEED TO CHANGE THIS
const webpagesService = axios.create({
    baseURL: Keys.DATA_PACKETS_SERVICE_API_URL,
    headers: AuthHeaders
});

export const addPinnedFolders = async (data, siteId) => {
    try {
        const response = await webpagesService.post(`/api/v1/data-packets/pinned/${siteId}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }

}

export const updatePinnedDataPacket = async (data, siteId) => {
    try {
        const response = await webpagesService.put(`/api/v1/data-packets/pinned/${siteId}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }

}

// get all webpages // TODO: Change this function accordingly
export const getPinnedFolders = async (count, page, key, val, siteId) => {
    try {
        const response = await webpagesService.get(`/api/v1/data-packets/pinned/folders/${siteId}/${count}/${page}?key=${key}&val=${val}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
};


// get all webpages count // TODO: Change this function accordingly
export const getPinnedFoldersCount = async (key, val, siteId) => {
    try {
        const response = await webpagesService.get(`/api/v1/data-packets/pinned/folders/count/${siteId}?key=${key}&val=${val}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages // TODO: Change this function accordingly
export const getPinnedPackets = async (count, page, key, val, siteId, pageId) => {
    try {
        const response = await webpagesService.get(`/api/v1/data-packets/pinned/packets/${siteId}/${pageId}/${count}/${page}?key=${key}&val=${val}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
};


// get all webpages count // TODO: Change this function accordingly
export const getPinnedPacketsCount = async (key, val, siteId, pageId) => {
    try {
        const response = await webpagesService.get(`/api/v1/data-packets/pinned/packets/count/${siteId}/${pageId}?key=${key}&val=${val}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const deletePinnedPacket = async (siteId, pageId, element) => {
    try {
        const response = await webpagesService.delete(`/api/v1/data-packets/pinned/packets/${siteId}/${pageId}/${element}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const deletePinedPacketsBulk = async (siteId, pageId, ids) => {
    let idsString = ids.join(',');

    try {
        const response = await webpagesService.delete(`/api/v1/data-packets/pinned/packets/bulk/${siteId}/${pageId}/${idsString}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}