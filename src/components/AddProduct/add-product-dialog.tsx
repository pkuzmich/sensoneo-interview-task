import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '../button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '../alert-dialog';
import { AddProductForm } from './add-product-form';

export function AddProductDialog() {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="default" className="hover:bg-primary/50 cursor-pointer">
          <Plus className="h-4 w-4" />
          Add New Product
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader className="relative">
          <AlertDialogTitle>Add new product</AlertDialogTitle>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-6 w-6 p-0 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </AlertDialogHeader>
        <div className="mt-4">
          <AddProductForm onSuccess={handleSuccess} onCancel={handleCancel} />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
