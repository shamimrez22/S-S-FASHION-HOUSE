
import React, { useMemo } from 'react';
import { Product, Order, OrderStatus } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { CreditCard, TrendingUp, Users, Package, ArrowUpRight, Crown, ShoppingBag, Clock } from 'lucide-react';

interface DashboardProps {
  products: Product[];
  orders: Order[];
}

const Dashboard: React.FC<DashboardProps> = ({ products, orders }) => {
  const totalRevenue = orders
    .filter(o => o.status !== OrderStatus.Cancelled)
    .reduce((acc, o) => acc + o.totalPrice, 0);

  const pendingCount = orders.filter(o => o.status === OrderStatus.Pending).length;

  const stats = [
    { label: 'Total Revenue', value: `৳ ${totalRevenue.toLocaleString()}`, icon: <CreditCard size={24} />, change: '+14%', color: 'yellow' },
    { label: 'Products In Shop', value: products.length, icon: <Package size={24} />, change: 'Luxury', color: 'gray' },
    { label: 'New Orders', value: pendingCount, icon: <ShoppingBag size={24} />, change: 'Urgent', color: 'red' },
    { label: 'Total Sales', value: orders.length, icon: <TrendingUp size={24} />, change: '+2%', color: 'green' },
  ];

  const orderTrends = useMemo(() => {
    const base = orders.length > 0 ? orders.length * 1000 : 5000;
    return [
      { name: 'Mon', sales: base * 0.4 },
      { name: 'Tue', sales: base * 0.3 },
      { name: 'Wed', sales: base * 0.6 },
      { name: 'Thu', sales: base * 0.8 },
      { name: 'Fri', sales: base * 1.2 },
      { name: 'Sat', sales: base * 1.8 },
      { name: 'Sun', sales: base * 1.5 },
    ];
  }, [orders.length]);

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div>
          <div className="flex items-center gap-4 mb-6">
             <Crown size={32} className="text-yellow-600" />
             <span className="text-yellow-600 text-sm tracking-[0.5em] uppercase font-bold">Business Reports</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif">Main Dashboard</h1>
        </div>
        <div className="bg-white/5 border-2 border-white/10 px-8 py-4 rounded-full flex items-center gap-5 backdrop-blur-md">
           <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Live Order Monitoring</span>
           <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></span>
        </div>
      </div>

      {/* Hero Performance Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        <div className="bg-[#1c1f26] border border-white/10 p-14 rounded-3xl shadow-2xl flex flex-col justify-center">
           <h3 className="text-gray-500 text-xs uppercase tracking-[0.5em] font-bold mb-10 text-center md:text-left">Sales Summary</h3>
           <div className="grid grid-cols-2 gap-14">
              <div className="text-center md:text-left">
                 <p className="text-gray-400 text-sm uppercase mb-3 font-bold">Total Earned</p>
                 <p className="text-4xl md:text-5xl font-serif text-white">৳ {totalRevenue.toLocaleString()}</p>
              </div>
              <div className="text-center md:text-left">
                 <p className="text-gray-400 text-sm uppercase mb-3 font-bold">Total Orders</p>
                 <p className="text-4xl md:text-5xl font-serif text-white">{orders.length}</p>
              </div>
           </div>
           <div className="mt-14 h-3 bg-white/5 rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-yellow-600 shadow-[0_0_15px_#d4af37]" style={{ width: '65%' }}></div>
           </div>
           <p className="text-xs text-gray-500 mt-6 uppercase tracking-[0.3em] font-bold text-center md:text-left">Yearly Goal Progress: 65%</p>
        </div>
        
        <div className="relative group overflow-hidden h-[350px] md:h-full rounded-3xl shadow-2xl border-2 border-white/5">
           <img 
            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1200" 
            alt="Dashboard" 
            className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 transition-all duration-[2000ms]"
           />
           <div className="absolute inset-0 flex flex-col items-center justify-center p-14 text-center bg-black/40 backdrop-blur-[2px]">
              <h3 className="text-4xl font-serif text-white mb-6 uppercase tracking-widest">Premium Brand</h3>
              <p className="text-white/60 text-sm max-w-sm uppercase tracking-[0.4em] font-bold leading-relaxed">S & S Fashion House Performance Engine</p>
           </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-24">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-[#1c1f26] p-10 border border-white/10 rounded-3xl hover:border-yellow-600/50 transition-all group shadow-2xl hover:-translate-y-2 duration-300">
            <div className="flex justify-between items-start mb-8">
              <div className={`w-14 h-14 bg-white/5 group-hover:bg-yellow-600 transition-all rounded-full flex items-center justify-center text-yellow-500 group-hover:text-black shadow-inner`}>
                {stat.icon}
              </div>
              <div className="flex items-center gap-2 text-green-500 text-xs font-bold bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
                <ArrowUpRight size={14} /> {stat.change}
              </div>
            </div>
            <p className="text-gray-500 text-xs uppercase tracking-[0.4em] mb-3 font-bold">{stat.label}</p>
            <h4 className="text-3xl font-bold text-white tracking-tight">{stat.value}</h4>
          </div>
        ))}
      </div>

      {/* Detailed Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 bg-[#1c1f26] p-12 border border-white/10 rounded-3xl shadow-2xl">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h3 className="text-3xl font-serif text-white mb-3">Sales Graph</h3>
              <p className="text-gray-500 text-xs uppercase tracking-[0.3em] font-bold">Weekly Performance In BDT</p>
            </div>
            <div className="flex gap-6">
               <div className="flex items-center gap-3">
                 <span className="w-3 h-3 rounded-full bg-yellow-600 shadow-[0_0_10px_#d4af37]"></span>
                 <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Sales Demand</span>
               </div>
            </div>
          </div>
          <div className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={orderTrends}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4af37" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} opacity={0.3} />
                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} tick={{dy: 15}} fontStyle="bold" />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `৳${value/1000}k`} tick={{dx: -10}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111317', border: '1px solid #333', borderRadius: '12px', fontSize: '13px', padding: '15px', fontWeight: 'bold' }}
                  itemStyle={{ color: '#d4af37' }}
                  cursor={{stroke: '#d4af37', strokeWidth: 2}}
                  formatter={(value: any) => [`৳ ${value.toLocaleString()}`, 'Sales']}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#d4af37" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                  animationDuration={2500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#1c1f26] p-12 border border-white/10 rounded-3xl shadow-2xl flex flex-col">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-serif text-white">Recent Orders</h3>
            <Clock className="text-yellow-600" size={24} />
          </div>
          <div className="space-y-8 flex-grow">
            {recentOrders.length > 0 ? recentOrders.map((order) => (
              <div key={order.id} className="flex items-center gap-5 p-5 bg-white/5 border border-white/5 rounded-2xl group hover:border-yellow-600/50 transition-all hover:bg-white/[0.08]">
                <img src={order.productImage} className="w-12 h-16 object-cover rounded-lg shadow-xl grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="flex-grow">
                  <p className="text-white text-sm font-bold truncate mb-1 uppercase tracking-tight">{order.customerName}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{order.productName}</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-600 text-sm font-extrabold mb-1">৳ {order.totalPrice.toLocaleString()}</p>
                  <p className="text-[9px] text-gray-600 uppercase font-bold">{order.status}</p>
                </div>
              </div>
            )) : (
              <p className="text-center text-gray-600 font-serif italic py-24 text-lg">No orders found.</p>
            )}
          </div>
          <button className="mt-12 w-full py-5 bg-white/5 border-2 border-white/10 text-white text-[11px] uppercase tracking-[0.4em] font-extrabold hover:bg-white/10 transition-all rounded-xl">
             View All Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
