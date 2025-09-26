import { useQuery } from '@tanstack/react-query';
import type { ProductsResponse, CompaniesResponse, UsersResponse } from '../types/product';
import { API_BASE_URL } from '../types/product';

// Hook to get the count of active products
export const useActiveProductsCount = () => {
  return useQuery({
    queryKey: ['activeProducts', 'count'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/products?active=1`);
      if (!response.ok) {
        throw new Error(`Failed to fetch active products: ${response.statusText}`);
      }
      return response.json() as Promise<ProductsResponse>;
    },
    select: (data: ProductsResponse) => data.pagination.totalItems
  });
};

// Hook to get the count of pending products
export const usePendingProductsCount = () => {
  return useQuery({
    queryKey: ['pendingProducts', 'count'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/products?active=0`);
      if (!response.ok) {
        throw new Error(`Failed to fetch pending products: ${response.statusText}`);
      }
      return response.json() as Promise<ProductsResponse>;
    },
    select: (data: ProductsResponse) => data.pagination.totalItems
  });
};

// Hook to get the count of companies
export const useCompaniesCount = () => {
  return useQuery({
    queryKey: ['companies', 'count'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/companies`);
      if (!response.ok) {
        throw new Error(`Failed to fetch companies: ${response.statusText}`);
      }
      return response.json() as Promise<CompaniesResponse>;
    },
    select: (data: CompaniesResponse) => data.total
  });
};

// Hook to get the count of users
export const useUsersCount = () => {
  return useQuery({
    queryKey: ['users', 'count'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/users`);
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
      }
      return response.json() as Promise<UsersResponse>;
    },
    select: (data: UsersResponse) => data.total
  });
};

// Hook to get recent active products (5 latest)
export const useRecentActiveProducts = () => {
  return useQuery({
    queryKey: ['recentActiveProducts'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/products?active=1&limit=5`);
      if (!response.ok) {
        throw new Error(`Failed to fetch recent active products: ${response.statusText}`);
      }
      return response.json() as Promise<ProductsResponse>;
    },
    select: (data: ProductsResponse) => data.data
  });
};
