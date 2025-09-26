import { Link } from 'react-router';
import { Plus } from 'lucide-react';

import { Button } from '../button';
import { Card, CardContent, CardHeader, CardTitle } from '../card';
import { AddProductDialog } from '../AddProduct/add-product-dialog';
import { Separator } from '../separator';

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Quick actions</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild variant="outline">
            <Link to="/products" className="flex items-center justify-center gap-2">
              <Plus className="h-4 w-4" />
              View all products
            </Link>
          </Button>
          <AddProductDialog />
        </div>
      </CardContent>
    </Card>
  );
}
