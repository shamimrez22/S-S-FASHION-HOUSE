import React, { useState } from 'react';
import { Menu, X, LogOut, Bell, ChevronDown, User, ShoppingBag } from 'lucide-react';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isAdmin: boolean;
  onLogout: () => void;
  pendingOrdersCount: number;
  onAdminOpen?: () => void;
}

interface NavItem {
  label: string;
  value: Page;
  dropdown?: { label: string; value: Page }[];
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage, isAdmin, onLogout, pendingOrdersCount, onAdminOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const publicItems: NavItem[] = [
    { label: 'Home', value: Page.Home },
    { label: 'Collections', value: Page.Shop, dropdown: [
      { label: 'New Arrivals', value: Page.NewArrivals },
      { label: 'T-Shirts', value: Page.TShirtSeries },
      { label: 'Polo Shirts', value: Page.PoloCollection },
      { label: 'Accessories', value: Page.Accessories },
    ]},
    { label: 'Track', value: Page.TrackOrder },
    { label: 'Contact', value: Page.Contact },
  ];

  const adminItems: NavItem[] = [
    { label: 'Admin', value: Page.Admin },
  ];

  const navItems = isAdmin ? [...publicItems, ...adminItems] : publicItems;

  const handleAdminClick = (val: Page) => {
    if (val === Page.Admin && onAdminOpen) {
      onAdminOpen();
    }
    setCurrentPage(val);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center gap-3 cursor-pointer group" 
            onClick={() => setCurrentPage(Page.Home)}
          >
            <div className="w-8 h-8 md:w-9 md:h-9 bg-[#d4af37] rounded flex items-center justify-center font-serif font-bold text-black text-xs">
              S&S
            </div>
            <div className="flex flex-col">
              <span className="text-white font-serif text-base md:text-lg leading-none font-bold tracking-tight">
                S&S Fashion
              </span>
              <span className="text-[#d4af37] text-[8px] uppercase tracking-[0.2em] font-medium hidden sm:block">
                Luxury Textiles
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative group/item flex items-center h-20">
                <button
                  onClick={() => !item.dropdown && handleAdminClick(item.value)}
                  className={`text-[11px] tracking-widest uppercase transition-colors duration-200 hover:text-white flex items-center gap-1 py-1 font-semibold ${
                    currentPage === item.value || item.dropdown?.some(d => d.value === currentPage)
                    ? 'text-white border-b border-[#d4af37]' 
                    : 'text-gray-400'
                  }`}
                >
                  {item.label}
                  {item.dropdown && <ChevronDown size={12} />}
                </button>

                {item.dropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-44 bg-[#141414] border border-white/5 opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200 shadow-xl rounded-lg overflow-hidden py-1.5">
                    {item.dropdown.map(d => (
                      <button
                        key={d.label}
                        onClick={() => setCurrentPage(d.value)}
                        className={`w-full text-left px-4 py-2 text-[10px] uppercase tracking-wider hover:bg-white/5 transition-colors font-semibold ${
                          currentPage === d.value ? 'text-[#d4af37]' : 'text-gray-400'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="h-4 w-[1px] bg-white/10"></div>
            
            {!isAdmin ? (
              <button 
                onClick={() => setCurrentPage(Page.Admin)}
                className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
              >
                <User size={14} />
                Sign In
              </button>
            ) : (
              <div className="flex items-center gap-5">
                <div className="relative cursor-pointer group" onClick={() => handleAdminClick(Page.Admin)}>
                  <Bell size={18} className={`${pendingOrdersCount > 0 ? 'text-[#d4af37]' : 'text-gray-400 group-hover:text-white transition-colors'}`} />
                  {pendingOrdersCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold border border-black">
                      {pendingOrdersCount}
                    </span>
                  )}
                </div>
                <button 
                  onClick={onLogout}
                  className="text-red-500 hover:text-red-400 text-[10px] tracking-widest uppercase font-bold flex items-center gap-1"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile buttons */}
          <div className="lg:hidden flex items-center gap-4">
            {isAdmin && (
               <div className="relative" onClick={() => handleAdminClick(Page.Admin)}>
                 <Bell size={20} className={pendingOrdersCount > 0 ? 'text-[#d4af37]' : 'text-gray-400'} />
                 {pendingOrdersCount > 0 && (
                   <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold">
                     {pendingOrdersCount}
                   </span>
                 )}
               </div>
             )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-1"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-black fixed inset-0 top-16 md:top-20 z-40 overflow-y-auto pb-10">
          <div className="px-6 pt-8 space-y-6">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-white/5 pb-4">
                <button
                  onClick={() => !item.dropdown && (handleAdminClick(item.value), setIsOpen(false))}
                  className={`flex items-center justify-between w-full text-left py-2 text-lg uppercase tracking-wider font-serif font-bold ${
                    currentPage === item.value ? 'text-[#d4af37]' : 'text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.dropdown && <ChevronDown size={18} />}
                </button>
                {item.dropdown && (
                  <div className="pl-4 pt-4 space-y-4">
                    {item.dropdown.map(d => (
                      <button
                        key={d.label}
                        onClick={() => { setCurrentPage(d.value); setIsOpen(false); }}
                        className={`block w-full text-left text-xs tracking-widest uppercase font-semibold ${
                          currentPage === d.value ? 'text-[#d4af37]' : 'text-gray-400'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button 
              onClick={() => { isAdmin ? onLogout() : setCurrentPage(Page.Admin); setIsOpen(false); }}
              className={`w-full py-3 text-center tracking-widest uppercase text-xs font-bold rounded-lg ${
                isAdmin ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-[#d4af37] text-black'
              }`}
            >
              {isAdmin ? 'Logout Account' : 'Sign In'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;