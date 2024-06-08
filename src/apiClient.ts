import axios from "axios";

const CONFIG = {
    headers: {'Content-Type': 'multipart/form-data'},
    withCredentials: true
};

const BASE_URL = process.env.REACT_APP_API;

export type ResponseModel = {
    plant_type: string,
    plant_disease: string,
    probability: string,
    photo: string
}

async function get(url: string) {
    return await axios.get(`${BASE_URL}${url}`, CONFIG).then(x => x.data)
}

async function post(url: string, data: any) {
    return await axios.post(`${BASE_URL}${url}`, data, CONFIG).then(x => x.data)
}

export async function getCameraPhoto(): Promise<ResponseModel> {
    return await get('predict/camera-photo');
}

export async function predictPhoto(data: FormData): Promise<ResponseModel> {
    return await post('predict/photo', data);
}
