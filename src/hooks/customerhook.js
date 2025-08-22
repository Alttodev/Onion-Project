import {
  createCustomer,
  customerListCreate,
  customerListUpdate,
  customerOrderCreate,
  customerOrderUpdate,
  deleteCustomer,
  deleteCustomerList,
  deleteCustomerOrder,
  getCustomerInfo,
  getCustomerList,
  getCustomerListData,
  getCustomerListInfo,
  getCustomerName,
  getCustomerOrderData,
  getCustomerOrderInfo,
  updateCustomer,
  userLogin,
  userReset,
  userResetPassword,
  userSignup,
} from "../api/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//Login

export const useUserSignup = () => {
  return useMutation({
    mutationFn: (formData) => userSignup(formData),
  });
};

export const useUserLogin = () => {
  return useMutation({
    mutationFn: (formData) => userLogin(formData),
  });
};

export const useUserReset = () => {
  return useMutation({
    mutationFn: (formData) => userReset(formData),
  });
};

export const useUserResetPassword = () => {
  return useMutation({
    mutationFn: ({ id, token, password }) =>
      userResetPassword({ id, token, password }),
  });
};

export const useCustomerCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => createCustomer(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["CustomerList"]);
    },
  });
};

export const useCustomerListCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => customerListCreate(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["CustomerListData"]);
    },
  });
};

export const useCustomerOrderCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => customerOrderCreate(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["CustomerOrderData"]);
    },
  });
};

//update
export const useCustomerUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }) => updateCustomer(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["CustomerList"]);
    },
  });
};

export const useCustomerListUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }) => customerListUpdate(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["CustomerList"]);
    },
  });
};

export const useCustomerOrderUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }) => customerOrderUpdate(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["CustomerOrder"]);
    },
  });
};

//get
export const useCustomerList = (query) => {
  return useQuery({
    queryKey: ["CustomerList", query],
    queryFn: () => getCustomerList(query),
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

export const useCustomerListData = (query, id) => {
  return useQuery({
    queryKey: ["CustomerListData", query, id],
    queryFn: () => getCustomerListData(query, id),
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

export const useCustomerOrderData = (query) => {
  return useQuery({
    queryKey: ["CustomerOrderData", query],
    queryFn: () => getCustomerOrderData(query),
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

export const useCustomerInfo = (id) => {
  return useQuery({
    queryKey: ["CUSTOMER_INFO", id],
    queryFn: () => getCustomerInfo(id),
    enabled: !!id,
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};
export const useCustomerListInfo = (id) => {
  return useQuery({
    queryKey: ["CUSTOMER_LIST_INFO", id],
    queryFn: () => getCustomerListInfo(id),
    enabled: !!id,
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

export const useCustomerOrderInfo = (id) => {
  return useQuery({
    queryKey: ["CUSTOMER_ORDER_INFO", id],
    queryFn: () => getCustomerOrderInfo(id),
    enabled: !!id,
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

//essential
export const useCustomerName = (query) => {
  return useQuery({
    queryKey: ["CUSTOMER_NAME", query],
    queryFn: () => getCustomerName(query),
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

//delete
export const useCustomerDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteCustomer(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["CustomerList"]);
    },
  });
};

export const useCustomerListDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteCustomerList(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["CustomerListData"]);
    },
  });
};

export const useCustomerOrderDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteCustomerOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["CustomerOrderData"]);
    },
  });
};


