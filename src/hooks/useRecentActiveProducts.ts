import { useQuery } from '@tanstack/react-query';
import type { ProductsResponse } from '../types/product';
import { API_BASE_URL } from '../types/product';

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
