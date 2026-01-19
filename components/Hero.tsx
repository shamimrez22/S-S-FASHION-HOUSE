import React from 'react';

interface HeroProps {
  onShopNow: () => void;
  heroImage: string;
}

const Hero: React.FC<HeroProps> = ({ onShopNow, heroImage }) => {
  return (
    <div className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Fashion background" 
          className="w-full h-full object-cover opacity-50 grayscale transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <span className="text-[#d4af37] tracking-[0.4em] uppercase text-xs mb-6 block font-semibold animate-fade-in">
          S & S Fashion House
        </span>
        <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-[1.1] animate-fade-in delay-200">
          Timeless <br />
          <span className="italic font-normal">Modern Luxury</span>
        </h1>
        <p className="text-gray-300 text-base md:text-xl mb-12 max-w-2xl mx-auto font-light animate-fade-in delay-300 leading-relaxed">
          Discover a curated collection of premium textiles and signature designs crafted for the modern individual.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in delay-500">
          <button 
            onClick={onShopNow}
            className="btn-order-now px-10 py-4 text-sm rounded-full min-w-[180px]"
          >
            Explore Shop
          </button>
          <button 
             onClick={onShopNow}
             className="px-10 py-4 border border-white/20 hover:border-white text-white font-semibold uppercase tracking-widest text-xs transition-all duration-300 rounded-full bg-white/5 backdrop-blur-sm min-w-[180px]"
          >
            New Arrivals
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:block text-[10px] tracking-[0.6em] text-white/30 uppercase font-medium">
        Bespoke &bull; Premium &bull; Exclusive
      </div>
    </div>
  );
};

export default Hero;