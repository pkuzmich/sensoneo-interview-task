import { ActiveProductsCard } from './active-products-card';
import { PendingProductsCard } from './pending-products-card';
import { CompaniesCard } from './companies-card';
import { UsersCard } from './users-card';

export function Statistics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <ActiveProductsCard />
      <PendingProductsCard />
      <CompaniesCard />
      <UsersCard />
    </div>
  );
}
