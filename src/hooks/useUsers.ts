import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL, type UsersResponse } from '../types/product';

export function useUsers() {
  return useQuery<UsersResponse>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/users`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
}
