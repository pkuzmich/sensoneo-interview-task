import { CircleDashed } from 'lucide-react';
import { usePendingProductsCount } from '../../hooks/useStatics';
import { Card, CardHeader, CardTitle, CardAction, CardContent, CardDescription } from '../card';

export function PendingProductsCard() {
  const { data: pendingCount, isLoading: countLoading, isError: countError } = usePendingProductsCount();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Products</CardTitle>
        <CardAction>
          <CircleDashed className="h-5 w-5" />
        </CardAction>
      </CardHeader>
      <CardContent>
        {countLoading && <div className="text-gray-500">Loading pending products count...</div>}
        {countError && <div className="text-red-500">Error loading pending products count</div>}
        {pendingCount !== undefined && <div className="text-3xl font-bold mb-2">{pendingCount}</div>}
        <CardDescription>Products waiting for approval</CardDescription>
      </CardContent>
    </Card>
  );
}
