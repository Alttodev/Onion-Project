import { createCustomer, customerListCreate, customerListUpdate, deleteCustomer, deleteCustomerList, getCustomerInfo, getCustomerList, getCustomerListData, getCustomerListInfo, updateCustomer } from "../api/axios";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useCustomerCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => createCustomer(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(['CustomerList']);
    },
  });
};

export const useCustomerListCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => customerListCreate(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(['CustomerListData']);
    },
  });
};

//update 
export const useCustomerUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }) => updateCustomer(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(['CustomerList']);
    },
  });
};


export const useCustomerListUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }) => customerListUpdate (id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(['CustomerList']);
    },
  });
};

//get
export const useCustomerList = (query) => {
  return useQuery({
    queryKey: ['CustomerList',query],
    queryFn: ()=>getCustomerList(query),
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

export const useCustomerListData = (query,id) => {
  return useQuery({
    queryKey: ['CustomerListData',query,id],
    queryFn: ()=>getCustomerListData(query,id),
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

export const useCustomerInfo = (id) => {
  return useQuery({
    queryKey: ['CUSTOMER_INFO', id],
    queryFn: () => getCustomerInfo(id),
    enabled: !!id,
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};
export const useCustomerListInfo = (id) => {
  return useQuery({
    queryKey: ['CUSTOMER_LIST_INFO', id],
    queryFn: () => getCustomerListInfo(id),
    enabled: !!id,
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
      queryClient.invalidateQueries(['CustomerList']);
    },
  });
};


export const useCustomerListDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteCustomerList(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['CustomerListData']);
    },
  });
};