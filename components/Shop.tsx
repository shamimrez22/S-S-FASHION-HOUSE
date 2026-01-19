import React, { useState } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { Search, ShoppingBag, Filter } from 'lucide-react';

interface ShopProps {
  products: Product[];
  onOrderNow: (product: Product) => void;
  title?: string;
}

const Shop: React.FC<ShopProps> = ({ products, onOrderNow, title = "Collections" }) => {
  const [filter, setFilter] = useState<'all' | 't-shirt' | 'polo' | 'accessory'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p => {
    const matchesFilter = filter === 'all' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 page-transition">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-serif text-white mb-2">{title}</h1>
          <p className="text-gray-500 text-xs font-medium uppercase tracking-widest">
            {filteredProducts.length} items curated for you
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          {/* Minimal Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#161616] border border-white/5 rounded-lg py-2.5 pl-10 pr-4 text-white text-xs focus:outline-none focus:border-white/20 transition-all"
            />
          </div>
          
          {/* Minimal Filter Tabs */}
          <div className="flex bg-[#161616] border border-white/5 p-1 rounded-lg">
            {['all', 't-shirt', 'polo'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-4 py-1.5 rounded-md text-[10px] font-semibold uppercase tracking-wider transition-all ${
                  filter === f ? 'bg-[#d4af37] text-black' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {f === 'all' ? 'All' : f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onOrderNow={() => onOrderNow(product)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-[#111] border border-white/5 rounded-2xl">
          <ShoppingBag className="mx-auto text-gray-800 mb-6" size={48} />
          <p className="text-gray-400 text-lg font-serif italic mb-6">No pieces match your current criteria.</p>
          <button 
            onClick={() => {setFilter('all'); setSearchTerm('');}}
            className="px-6 py-2.5 bg-white/5 border border-white/10 text-white text-[10px] font-semibold uppercase tracking-widest rounded-lg hover:bg-white/10 transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;