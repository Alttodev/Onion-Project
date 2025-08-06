import axios from "axios";

const API_URL = "http://localhost:3000";

export const createCustomer = async (formData) => {
    const { data } = await axios.post(`${API_URL}/users/create`, formData);
    return data;
};

export const updateCustomer = async (id, formData) => {
    const { data } = await axios.put(`${API_URL}/users/update/${id}`, formData);
    return data;    
};

export function getCustomerList(query) {
    return axios.get(`${API_URL}/users/get?name=${query || ""}`).then((d) => {
        return d.data;
    });
}



export function getCustomerInfo(id) {
    return axios.get(`${API_URL}/users/info/${id}`).then((d) => {
        return d.data;
    });
}

export function deleteCustomer(id) {
    return axios.delete(`${API_URL}/users/delete/${id}`).then((d) => {
        return d.data;
    });
}