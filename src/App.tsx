import React, { useState, useMemo } from 'react';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductCard } from './components/ProductCard';
import { CartButton } from './components/CartButton';
import { CartDrawer } from './components/CartDrawer';
import { CartProvider } from './context/CartContext';
import { products } from './data/products';
import { SizeOption } from './types/product';
import { Menu } from 'lucide-react';

function App() {
  const [selectedSizes, setSelectedSizes] = useState<SizeOption[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const availableColors = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.color).filter(Boolean)));
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const sizeMatch =
        selectedSizes.length === 0 ||
        selectedSizes.some((size) => product.sizes.includes(size));
      const colorMatch =
        selectedColors.length === 0 ||
        (product.color && selectedColors.includes(product.color));
      return sizeMatch && colorMatch;
    });
  }, [selectedSizes, selectedColors]);

  const handleSizeChange = (size: SizeOption) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleColorChange = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Medical Gloves</h1>
              </div>
              <div onClick={() => setIsCartOpen(true)}>
                <CartButton />
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Mobile Filter Overlay */}
            <div 
              className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity duration-300 ${
                isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              onClick={() => setIsFilterOpen(false)}
            />
            
            {/* Filter Sidebar */}
            <div className={`
              fixed lg:relative inset-y-0 left-0 z-30 lg:z-0 transform 
              ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'} 
              lg:translate-x-0 transition-transform duration-300 ease-in-out
              w-[280px] lg:w-64 h-full lg:h-auto
            `}>
              <FilterSidebar
                selectedSizes={selectedSizes}
                onSizeChange={handleSizeChange}
                selectedColors={selectedColors}
                onColorChange={handleColorChange}
                availableColors={availableColors as string[]}
                onClose={() => setIsFilterOpen(false)}
                isMobile={!window.matchMedia('(min-width: 1024px)').matches}
              />
            </div>
            
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </main>

        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </CartProvider>
  );
}

export default App;