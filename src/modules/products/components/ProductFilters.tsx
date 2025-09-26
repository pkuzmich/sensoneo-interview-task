import { Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/select';

interface ProductFiltersProps {
  activeFilter: boolean | null;
  onFilterChange: (value: string) => void;
}

export function ProductFilters({ activeFilter, onFilterChange }: ProductFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Filter size={20} />
          Status filter
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select
          value={activeFilter === null ? 'all' : activeFilter ? 'active' : 'inactive'}
          onValueChange={onFilterChange}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            <SelectItem value="active">Active Only</SelectItem>
            <SelectItem value="inactive">Inactive Only</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
