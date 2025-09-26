import { Badge } from '../../../components/badge';
import { Skeleton } from '../../../components/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/table';
import { ProductsPagination } from './ProductsPagination';
import { formatDate, formatDeposit, formatVolume } from '../../../lib/utils';

interface Product {
  id: number;
  name: string;
  active: number;
  packaging: string;
  volume: number;
  deposit: number;
  registeredAt: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface TableProductsProps {
  products: Product[] | undefined;
  pagination: Pagination | undefined;
  isLoading: boolean;
  error: Error | null;
  onPageChange: (page: number) => void;
}

export function TableProducts({
  products,
  pagination,
  isLoading,
  error,
  onPageChange
}: TableProductsProps) {
  const getStatusBadge = (active: number) => {
    return active === 1 ? (
      <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
        Active
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
        Inactive
      </Badge>
    );
  };

  const getPackagingColor = (packaging: string) => {
    const colors: Record<string, string> = {
      can: 'bg-blue-100 text-blue-800',
      glass: 'bg-green-100 text-green-800',
      pet: 'bg-purple-100 text-purple-800',
      tetra: 'bg-orange-100 text-orange-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[packaging] || colors.other;
  };

  if (error) {
    return <div className="text-red-600 text-center py-8">Error loading products: {error.message}</div>;
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-6">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-48" />
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <div className="text-center py-8 text-gray-500">No products found matching your criteria.</div>;
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Packaging</TableHead>
              <TableHead>Volume</TableHead>
              <TableHead>Deposit</TableHead>
              <TableHead>Registered</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{getStatusBadge(product.active)}</TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`${getPackagingColor(product.packaging)} border-0`}>
                    {product.packaging.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>{formatVolume(product.volume)}</TableCell>
                <TableCell>{formatDeposit(product.deposit)}</TableCell>
                <TableCell className="text-gray-500">{formatDate(product.registeredAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-6">
          <ProductsPagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={onPageChange}
            hasNextPage={pagination.hasNextPage}
            hasPreviousPage={pagination.hasPreviousPage}
          />
        </div>
      )}
    </>
  );
}
