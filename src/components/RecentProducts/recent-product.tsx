import type { RecentProductProps } from '../../types/product';
import { formatDate, formatVolume, formatDeposit } from '../../lib/utils';

export function RecentProduct({ product }: RecentProductProps) {
  return (
    <div key={product.id}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-md font-bold text-gray-900 mb-2">{product.name}</h3>
          <div className="flex gap-1 text-sm text-gray-500">
            <span>{formatVolume(product.volume)}</span>
            <span>•</span>
            <span>{formatDeposit(product.deposit)} deposit</span>
            <span>•</span>
            <span className="capitalize">{product.packaging}</span>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          <span>{formatDate(product.registeredAt)}</span>
        </div>
      </div>
    </div>
  );
}
