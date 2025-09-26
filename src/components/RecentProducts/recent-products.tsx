import { Package } from 'lucide-react';
import { useRecentActiveProducts } from '../../hooks/useRecentActiveProducts';
import { RecentProduct } from './recent-product';
import { Card, CardHeader, CardTitle, CardContent } from '../card';
import { Separator } from '../separator';

export function RecentProducts() {
  const { data: recentProducts, isLoading, isError } = useRecentActiveProducts();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Recent products</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        {isLoading && (
          <div className="text-center py-8">
            <div className="text-gray-500">Loading recent products...</div>
          </div>
        )}

        {isError && (
          <div className="text-center py-8">
            <div className="text-red-500">Error loading recent products</div>
          </div>
        )}

        {recentProducts && recentProducts.length > 0 && (
          <div className="space-y-4 mt-4">
            {recentProducts.map((product) => (
              <RecentProduct key={product.id} product={product} />
            ))}
          </div>
        )}

        {recentProducts && recentProducts.length === 0 && (
          <div className="text-center py-8">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <div className="text-gray-500">No recent products found</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
