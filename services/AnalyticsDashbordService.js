import axios from 'axios';
import Keys from "@/Keys";

// Create an axios instance -- NO NEED TO CHANGE THIS
const webpagesService = axios.create({
    baseURL: Keys.USER_SERVICE_API_URL
});

export const getTraffic = async (id,data) => {
    try {
        const response = await webpagesService.get(`/api/analytics/sessions/${id}`,data);
        console.log((response.data))
        return response.data;
    } catch (error) {
        throw error;
    }

};

export const visitorSource = async (id,data) => {
    try {
        const response = await webpagesService.get(`/api/analytics/source/${id}`,data);
        console.log((response.data))
        return response.data;
    } catch (error) {
        throw error;
    }

}
export const visitorCountry = async (id,data) => {
    try {
        const response = await webpagesService.get(`/api/analytics/country/${id}`,data);
        console.log((response.data))
        return response.data;
    } catch (error) {
        throw error;
    }

}

export const visitorDevice = async (id,data) => {
    try {
        const response = await webpagesService.get(`/api/analytics/devices/${id}`,data);
        console.log((response.data))
        return response.data;
    } catch (error) {
        throw error;
    }

}



