import axios from 'axios';
import Keys from "@/Keys";
import {AuthHeaders} from "@/util/AuthHeader";

// Create an axios instance -- NO NEED TO CHANGE THIS
const AdminSitesService = axios.create({
    baseURL: Keys.USER_SERVICE_API_URL,
    headers: AuthHeaders
});


export const getSites = async (count, page, key, val) => {
    try {
        const response = await AdminSitesService.get(`/api/admin_sites/sites/${count}/${page}?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};



export const getSitesCount = async (key, val) => {
    try {
        const response = await AdminSitesService.get(`/api/admin_sites/sites/count?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const getSitesByStatus = async (count, page, status, key, val) => {

    // convert status array to string with commas
    let statusString = status.join(',');

    console.log(statusString);

    try {
        const response = await AdminSitesService.get(`/api/admin_sites/sites/status/${count}/${page}?status=${statusString}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getSitesByStatusCount = async (status, key, val) => {

    // convert status array to string with commas
    let statusString = status.join(',');

    console.log(statusString);

    try {
        const response = await AdminSitesService.get(`/api/admin_sites/sites/status/count?status=${statusString}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getSitesByDatetime = async (count, page, start, end, key, val) => {

    console.log(start);

    try {
        const response = await AdminSitesService.get(`/api/admin_sites/sites/datetime/${count}/${page}?start=${start}&end=${end}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getSitesByDatetimeCount = async (start, end, key, val) => {
    try {
        const response = await AdminSitesService.get(`/api/admin_sites/sites/datetime/count?start=${start}&end=${end}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateSitesStatusBulk = async (ids, status) => {
    let idsString = ids.join(',');

    try {
        const response = await AdminSitesService.put(`/api/admin_sites/sites/status/bulk/${idsString}`, {status: status});
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateSitesStatus = async (id, status) => {
    try {
        const response = await AdminSitesService.put(`/api/admin_sites/sites/status/${id}`, {status: status});
        return response.data;
    } catch (error) {
        throw error;
    }
}

