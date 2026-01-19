import React from 'react';
import Hero from './Hero';
import { Product, Page } from '../types';
import ProductCard from './ProductCard';
import { Shirt, Zap, ShoppingBag } from 'lucide-react';

interface HomeProps {
  onShopNow: () => void;
  products: Product[];
  onOrderNow: (product: Product) => void;
  heroImage: string;
  onTrack: () => void;
  setCurrentPage: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ onShopNow, products, onOrderNow, heroImage, onTrack, setCurrentPage }) => {
  const featured = products.filter(p => p.isFeatured);
  const displayProducts = featured.length > 0 ? featured : products.slice(0, 4);

  return (
    <div className="flex flex-col">
      <Hero onShopNow={onShopNow} heroImage={heroImage} />

      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-serif mb-3">Signature Collection</h2>
          <p className="text-[#d4af37] uppercase tracking-[0.3em] text-[10px] font-semibold">Curated Essentials</p>
        </div>

        <div className="product-grid">
          {displayProducts.map(product => (
            <ProductCard key={product.id} product={product} onOrderNow={() => onOrderNow(product)} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button 
            onClick={onShopNow}
            className="text-white/60 hover:text-white text-xs uppercase tracking-widest font-semibold border-b border-white/10 pb-1 transition-all"
          >
            View All Products
          </button>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="py-24 bg-[#0c0c0c] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Elite Polos', page: Page.PoloCollection, icon: <Zap size={24} className="text-[#d4af37]" />, desc: 'Classic comfort for the modern man' },
            { name: 'Signature Tees', page: Page.TShirtSeries, icon: <Shirt size={24} className="text-[#d4af37]" />, desc: 'Ultra-soft organic cotton essentials' },
            { name: 'Concierge Care', page: Page.Bespoke, icon: <ShoppingBag size={24} className="text-[#d4af37]" />, desc: 'Personalized style consultations' }
          ].map(cat => (
            <div key={cat.name} onClick={() => setCurrentPage(cat.page)} className="group bg-white/5 border border-white/5 p-8 rounded-2xl cursor-pointer hover:border-white/10 transition-all">
              <div className="mb-6 flex group-hover:scale-110 transition-transform">{cat.icon}</div>
              <h3 className="text-lg font-serif text-white uppercase mb-2 font-medium">{cat.name}</h3>
              <p className="text-gray-500 text-xs font-normal leading-relaxed">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;