import { createCustomer, deleteCustomer, getCustomerInfo, getCustomerList, updateCustomer } from "../api/axios";
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

export const useCustomerUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }) => updateCustomer(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(['CustomerList']);
    },
  });
};

export const useCustomerList = (query) => {
  return useQuery({
    queryKey: ['CustomerList',query],
    queryFn: ()=>getCustomerList(query),
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

export const useCustomerDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteCustomer(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['CustomerList']);
    },
  });
};