import { Package } from 'lucide-react';

import { PageHeader } from '../../components/page-header';
import { Statistics } from '../../components/Statistics/statistics';
import { RecentProducts } from '../../components/RecentProducts/recent-products';
import { QuickActions } from '../../components/QuickActions/quick-actions';

export function HomePage() {
  return (
    <div>
      <PageHeader
        title="Deposit management dashboard"
        description="Welcome to your deposit management system. Monitor and manage your products, companies, and users."
        icon={<Package size={28} />}
      />
      <div className="mt-6 space-y-6">
        <Statistics />
        <QuickActions />
        <RecentProducts />
      </div>
    </div>
  );
}
