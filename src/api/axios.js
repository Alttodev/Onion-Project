import axiosInstance from "./axiosInstance";

export const userSignup = async (formData) => {
  const { data } = await axiosInstance.post(`/user/signup`, formData);
  return data;
};

export const userLogin = async (formData) => {
  const { data } = await axiosInstance.post(`/user/login`, formData);
  return data;
};

export const userReset = async (formData) => {
  const { data } = await axiosInstance.post(
    `/user/requestPasswordReset`,
    formData
  );
  return data;
};

export const userResetPassword = async ({ id, token, password }) => {
  const { data } = await axiosInstance.post(
    `/user/resetpassword/${id}/${token}`,
    { password } // body
  );
  return data;
};

export const createCustomer = async (formData) => {
  const { data } = await axiosInstance.post(`/customers/create`, formData);
  return data;
};

export const customerListCreate = async (formData) => {
  const { data } = await axiosInstance.post(`/list/create`, formData);
  return data;
};

export const customerOrderCreate = async (formData) => {
  const { data } = await axiosInstance.post(`/order/create`, formData);
  return data;
};

//update
export const updateCustomer = async (id, formData) => {
  const { data } = await axiosInstance.put(`/customers/update/${id}`, formData);
  return data;
};

export const customerListUpdate = async (id, formData) => {
  const { data } = await axiosInstance.put(`/list/update/${id}`, formData);
  return data;
};

export const customerOrderUpdate = async (id, formData) => {
  const { data } = await axiosInstance.put(`/order/update/${id}`, formData);
  return data;
};

//List

export function getCustomerList({ search, date, page, limit }) {
  const params = new URLSearchParams({
    search: search || "",
    date: date || "",
    page: page || 1,
    limit: limit || 5,
  });
  return axiosInstance.get(`/customers/get?${params}`).then((res) => res.data);
}

export function getCustomerListData({ search, date, page, limit }, id) {
  const params = new URLSearchParams({
    search: search || "",
    date: date || "",
    page: page || 1,
    limit: limit || 5,
  });
  return axiosInstance.get(`/list/get/${id}?${params}`).then((res) => res.data);
}

export function getCustomerOrderData({ search, from, to, page, limit }) {
  const params = new URLSearchParams({
    search: search || "",
    from: from || "",
    to: to || "",
    page: page || 1,
    limit: limit || 5,
  });
  return axiosInstance.get(`/order/get?${params}`).then((res) => res.data);
}

export function getCustomerName(query) {
  return axiosInstance.get(`/essential/get?name=${query}`).then((d) => {
    return d.data;
  });
}

//info

export function getCustomerInfo(id) {
  return axiosInstance.get(`/customers/info/${id}`).then((d) => {
    return d.data;
  });
}

export function getCustomerListInfo(id) {
  return axiosInstance.get(`/list/info/${id}`).then((d) => {
    return d.data;
  });
}

export function getCustomerOrderInfo(id) {
  return axiosInstance.get(`/order/info/${id}`).then((d) => {
    return d.data;
  });
}

//delete
export function deleteCustomer(id) {
  return axiosInstance.delete(`/customers/delete/${id}`).then((d) => {
    return d.data;
  });
}

export function deleteCustomerList(id) {
  return axiosInstance.delete(`/list/delete/${id}`).then((d) => {
    return d.data;
  });
}

export function deleteCustomerOrder(id) {
  return axiosInstance.delete(`/order/delete/${id}`).then((d) => {
    return d.data;
  });
}
