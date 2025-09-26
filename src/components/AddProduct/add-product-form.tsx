import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_BASE_URL, type ProductInput } from '../../types/product';
import { useCompanies } from '../../hooks/useCompanies';
import { useUsers } from '../../hooks/useUsers';
import { Button } from '../button';
import { Input } from '../input';
import { Label } from '../label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';
import { Alert, AlertDescription } from '../alert';

interface AddProductFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function AddProductForm({ onSuccess, onCancel }: AddProductFormProps) {
  const [formData, setFormData] = useState<ProductInput>({
    name: '',
    packaging: 'pet',
    deposit: 0,
    volume: 0,
    companyId: 0,
    registeredById: 0
  });

  const [errors, setErrors] = useState<string[]>([]);

  const queryClient = useQueryClient();
  const { data: companiesData, isLoading: companiesLoading } = useCompanies();
  const { data: usersData, isLoading: usersLoading } = useUsers();

  const createProductMutation = useMutation({
    mutationFn: async (productData: ProductInput) => {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create product');
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
      queryClient.invalidateQueries({ queryKey: ['recent-products'] });

      onSuccess?.();
    },
    onError: (error: Error) => {
      setErrors([error.message]);
    }
  });

  const handleInputChange = (field: keyof ProductInput, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const newErrors: string[] = [];

    if (!formData.name.trim()) {
      newErrors.push('Product name is required');
    }

    if (formData.deposit <= 0) {
      newErrors.push('Deposit must be greater than 0');
    }

    if (formData.volume <= 0) {
      newErrors.push('Volume must be greater than 0');
    }

    if (formData.companyId === 0) {
      newErrors.push('Please select a company');
    }

    if (formData.registeredById === 0) {
      newErrors.push('Please select a user');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    createProductMutation.mutate(formData);
  };

  const companies = companiesData?.data || [];
  const users = usersData?.data || [];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.length > 0 && (
        <Alert variant="destructive">
          <AlertDescription>
            <ul className="list-disc list-inside">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Product name</Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="Enter product name"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="packaging">Packaging type</Label>
          <Select
            value={formData.packaging}
            onValueChange={(value) => handleInputChange('packaging', value as ProductInput['packaging'])}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select packaging type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pet">PET</SelectItem>
              <SelectItem value="can">Can</SelectItem>
              <SelectItem value="glass">Glass</SelectItem>
              <SelectItem value="tetra">Tetra</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="deposit">Deposit (cents)</Label>
          <Input
            id="deposit"
            type="number"
            min="0"
            value={formData.deposit || ''}
            onChange={(e) => handleInputChange('deposit', parseInt(e.target.value) || 0)}
            placeholder="0"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="volume">Volume (ml)</Label>
          <Input
            id="volume"
            type="number"
            min="0"
            value={formData.volume || ''}
            onChange={(e) => handleInputChange('volume', parseInt(e.target.value) || 0)}
            placeholder="0"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Select
            value={formData.companyId.toString()}
            onValueChange={(value) => handleInputChange('companyId', parseInt(value))}
            disabled={companiesLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={companiesLoading ? 'Loading companies...' : 'Select company'} />
            </SelectTrigger>
            <SelectContent>
              {companies.map((company) => (
                <SelectItem key={company.id} value={company.id.toString()}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="user">Registered by</Label>
          <Select
            value={formData.registeredById.toString()}
            onValueChange={(value) => handleInputChange('registeredById', parseInt(value))}
            disabled={usersLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={usersLoading ? 'Loading users...' : 'Select user'} />
            </SelectTrigger>
            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id.toString()}>
                  {user.firstName} {user.lastName} ({user.email})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" className="cursor-pointer" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={createProductMutation.isPending || companiesLoading || usersLoading}
          className="cursor-pointer hover:bg-primary/50"
        >
          {createProductMutation.isPending ? 'Creating...' : 'Create Product'}
        </Button>
      </div>
    </form>
  );
}
