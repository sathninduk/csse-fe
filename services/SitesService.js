import axios from 'axios';
import Keys from "@/Keys";
import {AuthHeaders} from "@/util/AuthHeader";

// Create an axios instance -- NO NEED TO CHANGE THIS
const webpagesService = axios.create({
    baseURL: Keys.USER_SERVICE_API_URL,
    headers: AuthHeaders
});

// add site
export const AddSiteService = async (data) => {
    try {
        const response = await webpagesService.post(`/api/web/site`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const GetSitesService = async () => {
    try {
        const response = await webpagesService.get(`/api/web/sites`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const EditSiteService = async (id, data) => {
    try {
        const response = await webpagesService.put(`/api/web/site/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const GetSiteByIdService = async (id) => {
    try {
        const response = await webpagesService.get(`/api/web/site/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const DeleteSiteService = async (id) => {
    try {
        const response = await webpagesService.delete(`/api/web/site/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}