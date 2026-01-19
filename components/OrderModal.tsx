import React, { useState } from 'react';
import { Product, SizeStock } from '../types';
import { X, User, Phone, MapPin, CheckCircle, Minus, Plus } from 'lucide-react';

interface OrderModalProps {
  product: Product;
  onClose: () => void;
  onSubmit: (info: { name: string; phone: string; address: string; quantity: number; size: keyof SizeStock }) => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ product, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    quantity: 1,
    size: '' as keyof SizeStock | ''
  });

  const availableSizes = (Object.entries(product.sizeStock) as [keyof SizeStock, number][]).filter(([_, qty]) => qty > 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.size) return alert('Please select your size.');
    if (!formData.name || !formData.phone || !formData.address) return alert('Please provide your full details.');
    onSubmit(formData as any);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-4xl bg-[#141414] rounded-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] shadow-2xl border border-white/5">
        <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white/70 hover:text-white rounded-full transition-colors">
          <X size={20} />
        </button>

        {/* Product Preview Side */}
        <div className="hidden md:block md:w-[40%] bg-[#1a1a1a] relative">
          <img src={product.image} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-8 left-8 right-8">
            <h2 className="text-2xl font-serif text-white mb-2">{product.name}</h2>
            <p className="text-[#d4af37] font-semibold text-xl">৳ {product.price.toLocaleString()}</p>
          </div>
        </div>

        {/* Form Side */}
        <form onSubmit={handleSubmit} className="flex-1 p-8 md:p-12 overflow-y-auto bg-[#141414]">
          <div className="mb-8">
            <h3 className="text-xl font-medium text-white mb-2">Checkout Details</h3>
            <p className="text-gray-500 text-xs">Complete your acquisition below.</p>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                  <input placeholder="Ex: John Doe" required value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} className="w-full bg-[#1c1c1c] border border-white/5 p-3.5 pl-11 text-white rounded-xl focus:border-[#d4af37] outline-none transition-colors" />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold ml-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                  <input placeholder="01XXX-XXXXXX" required value={formData.phone} onChange={e=>setFormData({...formData, phone:e.target.value})} className="w-full bg-[#1c1c1c] border border-white/5 p-3.5 pl-11 text-white rounded-xl focus:border-[#d4af37] outline-none transition-colors" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold ml-1">Delivery Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 text-gray-600" size={16} />
                  <textarea placeholder="Your full address..." required rows={3} value={formData.address} onChange={e=>setFormData({...formData, address:e.target.value})} className="w-full bg-[#1c1c1c] border border-white/5 p-3.5 pl-11 text-white rounded-xl focus:border-[#d4af37] outline-none resize-none transition-colors" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold ml-1">Select Size</label>
              <div className="flex flex-wrap gap-3">
                {availableSizes.map(([s, _]) => (
                  <button key={s} type="button" onClick={() => setFormData({...formData, size: s})} className={`w-12 h-12 rounded-xl border transition-all text-xs font-semibold ${formData.size === s ? 'bg-[#d4af37] border-[#d4af37] text-black shadow-lg scale-105' : 'bg-[#1c1c1c] border-white/10 text-gray-400 hover:border-white/20'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between py-4 border-y border-white/5">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Quantity</label>
                <div className="flex items-center bg-[#1c1c1c] border border-white/5 rounded-lg overflow-hidden">
                  <button type="button" onClick={()=>setFormData({...formData, quantity: Math.max(1, formData.quantity-1)})} className="p-2.5 hover:bg-white/5 text-gray-400"><Minus size={14} /></button>
                  <span className="px-4 text-white font-medium text-sm">{formData.quantity}</span>
                  <button type="button" onClick={()=>setFormData({...formData, quantity: formData.quantity+1})} className="p-2.5 hover:bg-white/5 text-gray-400"><Plus size={14} /></button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Total Price</p>
                <p className="text-white text-2xl font-semibold">৳ {(product.price * formData.quantity).toLocaleString()}</p>
              </div>
            </div>

            <button type="submit" className="w-full py-4 bg-[#d4af37] text-black font-bold uppercase tracking-widest text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-[#c19b2e] transition-colors shadow-lg mt-4">
              <CheckCircle size={18} /> Confirm Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;