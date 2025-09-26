import { Milk } from 'lucide-react';
import { useActiveProductsCount } from '../../hooks/useStatics';
import { Card, CardHeader, CardTitle, CardAction, CardContent, CardDescription } from '../card';

export function ActiveProductsCard() {
  const { data: activeCount, isLoading: countLoading, isError: countError } = useActiveProductsCount();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Products</CardTitle>
        <CardAction>
          <Milk className="h-5 w-5" />
        </CardAction>
      </CardHeader>
      <CardContent>
        {countLoading && <div className="text-gray-500">Loading active products count...</div>}
        {countError && <div className="text-red-500">Error loading active products count</div>}
        {activeCount !== undefined && <div className="text-3xl font-bold mb-2">{activeCount}</div>}
        <CardDescription>Active products in system</CardDescription>
      </CardContent>
    </Card>
  );
}
