import React from 'react';
import { Product } from '../types';
import { CheckCircle2, XCircle, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOrderNow: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onOrderNow }) => {
  const totalStock = (Object.values(product.sizeStock) as number[]).reduce((a, b) => a + b, 0);
  const isOutOfStock = totalStock <= 0;

  return (
    <div className="group flex flex-col h-full bg-[#111] border border-white/5 hover:border-white/10 transition-all duration-300 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl">
      {/* Image Container */}
      <div className="relative aspect-[4/5] bg-[#1a1a1a] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isOutOfStock ? 'grayscale opacity-40' : 'opacity-90 group-hover:opacity-100'}`}
        />
        
        {/* Stock Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold backdrop-blur-md border ${isOutOfStock ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}`}>
            {isOutOfStock ? <XCircle size={12} /> : <CheckCircle2 size={12} />}
            {isOutOfStock ? 'Sold Out' : 'Available'}
          </span>
        </div>

        {/* Quick Add Overlay (Desktop) */}
        {!isOutOfStock && (
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
             <button 
               onClick={(e) => { e.stopPropagation(); onOrderNow(); }} 
               className="w-full py-3 bg-white text-black font-semibold rounded-lg flex items-center justify-center gap-2 text-xs shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
             >
               <ShoppingBag size={14} /> Quick Order
             </button>
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-1">
          <span className="text-[10px] uppercase tracking-[0.15em] text-[#d4af37] font-semibold">
            {product.category}
          </span>
        </div>
        
        <div className="flex justify-between items-start gap-2 mb-3">
          <h3 className="text-white text-sm font-medium leading-snug group-hover:text-white/90 transition-colors line-clamp-2">
            {product.name}
          </h3>
          <span className="text-white font-semibold text-sm whitespace-nowrap">
            ৳{product.price.toLocaleString()}
          </span>
        </div>
        
        {/* Sizes */}
        <div className="mt-auto mb-4">
          <div className="flex flex-wrap gap-1.5">
            {(Object.entries(product.sizeStock) as [string, number][]).map(([size, count]) => (
              <span 
                key={size} 
                className={`text-[10px] font-medium w-7 h-7 flex items-center justify-center rounded border transition-colors ${
                  count > 0 
                    ? 'bg-white/5 border-white/10 text-white/70' 
                    : 'bg-transparent border-white/5 text-gray-700 cursor-not-allowed'
                }`}
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button (Mobile & Always Visible if desired) */}
        <button 
          onClick={onOrderNow}
          disabled={isOutOfStock}
          className={`w-full py-2.5 text-[11px] font-semibold uppercase tracking-wider rounded-lg transition-all border ${
            isOutOfStock 
              ? 'bg-transparent text-gray-600 border-white/5 cursor-not-allowed' 
              : 'bg-transparent text-white border-white/10 hover:bg-white/5 active:scale-95 lg:hidden'
          }`}
        >
          {isOutOfStock ? 'Out of Stock' : 'Order Now'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;