import { useState } from 'react';
import { Milk } from 'lucide-react';
import { PageHeader } from '../../components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/card';
import { ProductFilters } from './components/ProductFilters';
import { TableProducts } from './components/TableProducts';
import { useProducts } from '../../hooks/useProducts';

export function ProductsPage() {
  const [page, setPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState<boolean | null>(null);

  const {
    data: products,
    pagination,
    isLoading,
    error
  } = useProducts({
    page,
    limit: 15,
    active: activeFilter
  });

  const handleFilterChange = (value: string) => {
    if (value === 'all') {
      setActiveFilter(null);
    } else {
      setActiveFilter(value === 'active');
    }
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Registered products"
        description="View and manage your registered products."
        icon={<Milk size={28} />}
      />
      <ProductFilters activeFilter={activeFilter} onFilterChange={handleFilterChange} />
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            Products
            {pagination && (
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({pagination.totalItems} total)
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TableProducts
            products={products}
            pagination={pagination}
            isLoading={isLoading}
            error={error}
            onPageChange={setPage}
          />
        </CardContent>
      </Card>
    </div>
  );
}
