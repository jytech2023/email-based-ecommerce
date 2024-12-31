import React from 'react';
import { Filter, X } from 'lucide-react';
import { SizeOption } from '../types/product';

interface FilterSidebarProps {
  selectedSizes: SizeOption[];
  onSizeChange: (size: SizeOption) => void;
  selectedColors: string[];
  onColorChange: (color: string) => void;
  availableColors: string[];
  onClose?: () => void;
  isMobile?: boolean;
}

export function FilterSidebar({
  selectedSizes,
  onSizeChange,
  selectedColors,
  onColorChange,
  availableColors,
  onClose,
  isMobile,
}: FilterSidebarProps) {
  const sizes: SizeOption[] = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <div className="w-full h-full bg-white p-4 sm:p-6">
      {/* Header with close button */}
      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        <button 
          onClick={onClose}
          className="flex items-center justify-center w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors lg:hidden"
          aria-label="Close filters"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Size</h3>
          <div className="space-y-2">
            {sizes.map((size) => (
              <label key={size} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={() => onSizeChange(size)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">{size}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Color</h3>
          <div className="space-y-2">
            {availableColors.map((color) => (
              <label key={color} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedColors.includes(color)}
                  onChange={() => onColorChange(color)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600 capitalize">
                  {color}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}