import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL, type CompaniesResponse } from '../types/product';

export function useCompanies() {
  return useQuery<CompaniesResponse>({
    queryKey: ['companies'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/companies`);
      if (!response.ok) {
        throw new Error('Failed to fetch companies');
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
}
