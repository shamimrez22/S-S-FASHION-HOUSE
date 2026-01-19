
import React from 'react';
import { Page, CustomLink } from '../types';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
  customLinks?: CustomLink[];
}

const Footer: React.FC<FooterProps> = ({ setCurrentPage, customLinks = [] }) => {
  const activeLinks = customLinks.filter(l => l.active);

  return (
    <footer className="bg-black border-t-4 border-white/10 pt-32 pb-16">
      <div className="max-w-[90rem] mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
        <div className="md:col-span-2">
           <div className="flex items-center gap-6 mb-10">
            <div className="w-14 h-14 bg-gradient-to-tr from-yellow-600 to-yellow-200 rounded-full flex items-center justify-center font-serif font-black text-black text-xl shadow-2xl">
              S&S
            </div>
            <span className="text-white font-serif text-3xl tracking-[0.3em] uppercase font-black">
              S & S Fashion House
            </span>
          </div>
          <p className="text-gray-300 text-xl max-w-xl leading-relaxed mb-12 font-bold italic">
            Premium clothing for modern life. We focus on quality, sustainable fabrics, and perfect styles.
          </p>
          
          {/* Custom External Links Rendering */}
          {activeLinks.length > 0 && (
            <div className="mb-12">
              <h4 className="text-white/40 uppercase tracking-[0.6em] text-xs font-black mb-8">Our Channels</h4>
              <div className="flex flex-wrap gap-10">
                {activeLinks.map(link => (
                  <a 
                    key={link.id} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-yellow-600 text-sm uppercase tracking-[0.4em] font-black transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-8">
            <input 
              type="email" 
              placeholder="Your Email" 
              className="bg-[#111] border-2 border-white/10 py-5 px-10 text-sm uppercase tracking-widest text-white focus:outline-none focus:border-yellow-600 w-full max-w-sm rounded-full shadow-inner font-black"
            />
            <button className="bg-yellow-600 text-black px-12 py-5 font-black uppercase text-sm tracking-[0.3em] hover:bg-yellow-500 transition-colors rounded-full shadow-2xl">
              Subscribe
            </button>
          </div>
        </div>
        
        <div>
          <h4 className="text-white uppercase tracking-[0.5em] text-sm font-black mb-10">Shop</h4>
          <ul className="space-y-6 text-gray-400 text-sm uppercase tracking-[0.4em] font-black">
            <li><button onClick={() => setCurrentPage(Page.NewArrivals)} className="hover:text-yellow-500 transition-colors">New Items</button></li>
            <li><button onClick={() => setCurrentPage(Page.TShirtSeries)} className="hover:text-yellow-500 transition-colors">T-Shirts</button></li>
            <li><button onClick={() => setCurrentPage(Page.PoloCollection)} className="hover:text-yellow-500 transition-colors">Polo Shirts</button></li>
            <li><button onClick={() => setCurrentPage(Page.Accessories)} className="hover:text-yellow-500 transition-colors">Accessories</button></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white uppercase tracking-[0.5em] text-sm font-black mb-10">Help & Info</h4>
          <ul className="space-y-6 text-gray-400 text-sm uppercase tracking-[0.4em] font-black">
            <li><button onClick={() => setCurrentPage(Page.Shipping)} className="hover:text-yellow-500 transition-colors">Shipping Info</button></li>
            <li><button onClick={() => setCurrentPage(Page.Privacy)} className="hover:text-yellow-500 transition-colors">Privacy Policy</button></li>
            <li><button onClick={() => setCurrentPage(Page.Bespoke)} className="hover:text-yellow-500 transition-colors">Custom Orders</button></li>
            <li><button onClick={() => setCurrentPage(Page.Terms)} className="hover:text-yellow-500 transition-colors">Terms of Use</button></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-[90rem] mx-auto px-8 border-t-2 border-white/10 pt-16 flex flex-col md:flex-row justify-between items-center gap-10">
        <p className="text-gray-500 text-xs uppercase tracking-[0.4em] font-black">
          &copy; 2025 S & S Fashion House.
        </p>
        <div className="flex gap-16 text-gray-500 text-xs uppercase tracking-[0.4em] font-black">
          <a href="#" className="hover:text-white transition-colors">Facebook</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
