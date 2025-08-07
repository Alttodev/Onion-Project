import axios from "axios";

const API_URL = "http://localhost:4000";

export const createCustomer = async (formData) => {
    const { data } = await axios.post(`${API_URL}/customers/create`, formData);
    return data;
};

export const updateCustomer = async (id, formData) => {
    const { data } = await axios.put(`${API_URL}/customers/update/${id}`, formData);
    return data;    
};

export function getCustomerList(query) {
    return axios.get(`${API_URL}/customers/get?name=${query || ""}`).then((d) => {
        return d.data;
    });
}



export function getCustomerInfo(id) {
    return axios.get(`${API_URL}/customers/info/${id}`).then((d) => {
        return d.data;
    });
}

export function deleteCustomer(id) {
    return axios.delete(`${API_URL}/users/delete/${id}`).then((d) => {
        return d.data;
    });
}