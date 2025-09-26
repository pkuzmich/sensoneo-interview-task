// Centralized type definitions for products and related entities

export interface Product {
  id: number;
  companyId: number;
  registeredById: number;
  name: string;
  packaging: string;
  deposit: number;
  volume: number;
  registeredAt: string;
  active: number;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface Company {
  id: number;
  name: string;
  registeredAt: string;
}

export interface CompaniesResponse {
  success: boolean;
  data: Company[];
  total: number;
}

export interface User {
  id: number;
  companyId: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

export interface UsersResponse {
  success: boolean;
  data: User[];
  total: number;
}

// Utility types for components
export interface RecentProductProps {
  product: Product;
}

// API configuration
export const API_BASE_URL = 'http://localhost:3001/api';

// Product creation input type
export interface ProductInput {
  name: string;
  packaging: 'pet' | 'can' | 'glass' | 'tetra' | 'other';
  deposit: number;
  volume: number;
  companyId: number;
  registeredById: number;
}
