import { Building2 } from 'lucide-react';
import { useCompaniesCount } from '../../hooks/useStatics';
import { Card, CardHeader, CardTitle, CardAction, CardContent, CardDescription } from '../card';

export function CompaniesCard() {
  const { data: activeCount, isLoading: countLoading, isError: countError } = useCompaniesCount();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Companies</CardTitle>
        <CardAction>
          <Building2 className="h-5 w-5" />
        </CardAction>
      </CardHeader>
      <CardContent>
        {countLoading && <div className="text-gray-500">Loading active products count...</div>}
        {countError && <div className="text-red-500">Error loading active products count</div>}
        {activeCount !== undefined && <div className="text-3xl font-bold mb-2">{activeCount}</div>}
        <CardDescription>Registered companies</CardDescription>
      </CardContent>
    </Card>
  );
}
