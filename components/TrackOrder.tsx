
import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';
import { Search, Package, MapPin, Clock, CheckCircle2, Truck, Box, AlertCircle, Receipt } from 'lucide-react';

interface TrackOrderProps {
  orders: Order[];
}

const TrackOrder: React.FC<TrackOrderProps> = ({ orders }) => {
  const [query, setQuery] = useState('');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const result = orders.find(o => 
      o.id.toLowerCase() === query.toLowerCase().trim() || 
      o.customerPhone === query.trim()
    );
    setFoundOrder(result || null);
    setHasSearched(true);
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Pending: return <Clock className="text-yellow-500" size={48} />;
      case OrderStatus.Confirmed: return <CheckCircle2 className="text-blue-500" size={48} />;
      case OrderStatus.Processing: return <Box className="text-purple-500" size={48} />;
      case OrderStatus.Shipped: return <Truck className="text-orange-500" size={48} />;
      case OrderStatus.Delivered: return <CheckCircle2 className="text-green-500" size={48} />;
      default: return <AlertCircle className="text-red-500" size={48} />;
    }
  };

  const statusSteps = [
    OrderStatus.Pending,
    OrderStatus.Confirmed,
    OrderStatus.Processing,
    OrderStatus.Shipped,
    OrderStatus.Delivered
  ];

  const currentStepIndex = foundOrder ? statusSteps.indexOf(foundOrder.status) : -1;

  return (
    <div className="max-w-6xl mx-auto px-6 py-32">
      <div className="text-center mb-24">
        <h1 className="text-6xl md:text-8xl font-serif mb-10 leading-tight font-black uppercase">Track Your Order</h1>
        <p className="text-gray-400 uppercase tracking-[0.5em] text-sm font-black">See where your items are right now</p>
      </div>

      <div className="bg-[#1c1f26]/80 backdrop-blur-2xl border-2 border-white/10 p-12 rounded-[3rem] shadow-2xl mb-24">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-8">
          <div className="relative flex-grow">
            <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-500" size={24} />
            <input 
              type="text" 
              placeholder="Enter Order ID or Phone Number"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[#111317] border-2 border-white/10 p-7 pl-16 text-white focus:outline-none focus:border-yellow-600 rounded-full text-xl uppercase tracking-widest shadow-inner font-black"
            />
          </div>
          <button type="submit" className="btn-order-now px-16 py-7 text-lg rounded-full">
            Track Order
          </button>
        </form>
      </div>

      {hasSearched && foundOrder && (
        <div className="animate-fade-in space-y-16">
          <div className="bg-[#1c1f26]/95 border-2 border-white/10 p-16 rounded-[3rem] shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-20 pb-12 border-b-2 border-white/10">
              <div>
                <p className="text-gray-500 text-sm uppercase tracking-[0.4em] font-black mb-4">Order ID</p>
                <h3 className="text-5xl font-serif text-white font-black">{foundOrder.id}</h3>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-sm uppercase tracking-[0.4em] font-black mb-4">Current Status</p>
                <div className="flex items-center gap-6 justify-end">
                   {getStatusIcon(foundOrder.status)}
                   <span className="text-4xl font-black uppercase tracking-[0.1em] text-white">{foundOrder.status}</span>
                </div>
              </div>
            </div>

            {/* Stepper */}
            <div className="relative flex flex-col md:flex-row justify-between mb-24 mt-12 px-10">
              <div className="absolute top-1/2 left-0 w-full h-2 bg-white/5 -translate-y-1/2 hidden md:block"></div>
              {statusSteps.map((step, index) => {
                const isActive = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                return (
                  <div key={step} className="relative z-10 flex flex-col items-center group mb-12 md:mb-0">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-700 ${
                      isActive ? 'bg-yellow-600 border-yellow-600 text-black shadow-[0_0_30px_rgba(212,175,55,0.6)]' : 'bg-[#111317] border-white/20 text-gray-500'
                    }`}>
                      <span className="text-xl font-black">{index + 1}</span>
                    </div>
                    <span className={`mt-6 text-xs uppercase tracking-[0.3em] font-black transition-colors ${isActive ? 'text-white' : 'text-gray-600'}`}>
                      {step}
                    </span>
                    {isCurrent && <div className="absolute -top-2 w-20 h-20 rounded-full border-2 border-yellow-600 animate-ping opacity-30"></div>}
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
               <div className="space-y-12">
                  <div className="flex gap-8">
                     <Package className="text-yellow-600 shrink-0" size={36} />
                     <div>
                        <p className="text-gray-500 text-xs uppercase tracking-[0.4em] font-black mb-3">Item Details</p>
                        <p className="text-white text-2xl font-black">{foundOrder.productName} (x{foundOrder.quantity})</p>
                        <p className="text-gray-400 text-sm font-bold uppercase mt-2">Product Price: ৳ {(foundOrder.unitPrice * foundOrder.quantity).toLocaleString()}</p>
                     </div>
                  </div>
                  <div className="flex gap-8">
                     <Truck className="text-yellow-600 shrink-0" size={36} />
                     <div>
                        <p className="text-gray-500 text-xs uppercase tracking-[0.4em] font-black mb-3">Shipping Charge</p>
                        <p className="text-white text-2xl font-black">
                          {foundOrder.status === OrderStatus.Pending ? 'Pending Confirmation' : `৳ ${(foundOrder.deliveryCharge || 0).toLocaleString()}`}
                        </p>
                     </div>
                  </div>
                  <div className="flex gap-8 pt-8 border-t border-white/10">
                     <Receipt className="text-yellow-600 shrink-0" size={36} />
                     <div>
                        <p className="text-gray-500 text-xs uppercase tracking-[0.4em] font-black mb-3">Grand Total</p>
                        <p className="text-yellow-600 font-black text-5xl">৳ {foundOrder.totalPrice.toLocaleString()}</p>
                     </div>
                  </div>
               </div>
               <div className="bg-black/40 p-12 rounded-3xl border-2 border-white/10 flex flex-col">
                  <h4 className="text-white font-serif text-3xl mb-8 flex items-center gap-6 font-black uppercase">
                    <MapPin size={32} className="text-yellow-600" /> Delivery Address
                  </h4>
                  <p className="text-white text-xl leading-relaxed font-bold mb-10">{foundOrder.customerAddress}</p>
                  <div className="mt-auto pt-10 border-t border-white/10">
                     <p className="text-gray-200 text-lg leading-relaxed font-bold italic">
                        {foundOrder.status === OrderStatus.Pending && "We have received your order. We will call you soon to confirm and set the delivery charge."}
                        {foundOrder.status === OrderStatus.Confirmed && "Your order is confirmed with delivery charge added. We are now preparing your items."}
                        {foundOrder.status === OrderStatus.Processing && "Your order is being carefully packed and checked for quality."}
                        {foundOrder.status === OrderStatus.Shipped && "Your order has left our office. It is on its way to your address."}
                        {foundOrder.status === OrderStatus.Delivered && "Your order has been delivered. We hope you love your new fashion items!"}
                     </p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
