import { useQuery } from '@tanstack/react-query';
import type { Product, ProductsResponse } from '../types/product';
import { API_BASE_URL } from '../types/product';

interface UseProductsParams {
  page?: number;
  limit?: number;
  active?: boolean | null;
}

interface UseProductsResult {
  data: Product[] | undefined;
  pagination: ProductsResponse['pagination'] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useProducts({
  page = 1,
  limit = 15,
  active = null
}: UseProductsParams = {}): UseProductsResult {
  const query = useQuery({
    queryKey: ['products', { page, limit, active }],
    queryFn: async (): Promise<ProductsResponse> => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      });

      if (active !== null) {
        params.append('active', active.toString());
      }

      const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }

      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false
  });

  return {
    data: query.data?.data,
    pagination: query.data?.pagination,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch
  };
}
