import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatVolume = (volume: number) => {
  if (volume >= 1000) {
    return `${volume / 1000}L`;
  }
  return `${volume}ml`;
};

export const formatDeposit = (deposit: number) => {
  return `$${(deposit / 100).toFixed(2)}`;
};
