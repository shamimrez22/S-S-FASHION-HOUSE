import React, { useState, useEffect } from 'react';
import { Product, Order, OrderStatus, AppSettings, SizeStock } from '../types';
import { Trash2, Edit, X, Lock, ShoppingCart, Package, ArrowLeft, Bell, CheckCircle, Download, DollarSign, Settings, User, Star } from 'lucide-react';

interface AdminPanelProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  orders: Order[];
  updateOrderStatus: (id: string, status: OrderStatus, deliveryCharge?: number) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
  onBack: () => void;
  notifications: number;
  clearNotifications: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ products, setProducts, orders, updateOrderStatus, isAdmin, setIsAdmin, settings, onUpdateSettings, onBack, notifications, clearNotifications }) => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'settings'>('products');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmingOrder, setConfirmingOrder] = useState<Order | null>(null);
  const [deliveryCharge, setDeliveryCharge] = useState<string>('');

  const [newUsername, setNewUsername] = useState(settings.adminUsername);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');

  const [imageUrls, setImageUrls] = useState<string[]>(['', '', '', '', '', '']);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    description: '',
    category: 't-shirt',
    sizeStock: { S: 0, M: 0, L: 0, XL: 0, XXL: 0 },
    isFeatured: false
  });

  useEffect(() => {
    if (isAdmin && activeTab === 'orders') {
      clearNotifications();
    }
  }, [isAdmin, activeTab]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === settings.adminUsername && password === settings.adminPasswordHash) {
      setIsAdmin(true);
      localStorage.setItem('ss_fashion_admin', 'true');
    } else alert('Unauthorized access.');
  };

  const handleUpdateSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPass !== settings.adminPasswordHash) {
      alert('Wrong current password.');
      return;
    }
    if (newPass && newPass !== confirmNewPass) {
      alert('New passwords do not match.');
      return;
    }

    onUpdateSettings({
      ...settings,
      adminUsername: newUsername,
      adminPasswordHash: newPass || settings.adminPasswordHash
    });
    alert('Settings updated.');
    setCurrentPass('');
    setNewPass('');
    setConfirmNewPass('');
  };

  const saveProduct = () => {
    if (!formData.name || !imageUrls[mainImageIndex]) {
      alert("Product name and main image are required.");
      return;
    }
    
    const mainImg = imageUrls[mainImageIndex];
    const gallery = imageUrls.filter((url, idx) => url !== '' && idx !== mainImageIndex);

    const productData = {
      ...formData,
      image: mainImg,
      gallery: gallery,
    };

    if (editingId) {
      setProducts(prev => prev.map(p => p.id === editingId ? { ...p, ...productData } as Product : p));
    } else {
      const newP: Product = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name!,
        price: formData.price!,
        image: mainImg,
        gallery: gallery,
        description: formData.description || '',
        category: formData.category as any,
        sizeStock: formData.sizeStock as SizeStock,
        isFeatured: formData.isFeatured || false,
        createdAt: Date.now()
      };
      setProducts([newP, ...products]);
    }
    setIsAdding(false);
    setEditingId(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: '', price: 0, description: '', category: 't-shirt', sizeStock: { S: 0, M: 0, L: 0, XL: 0, XXL: 0 }, isFeatured: false });
    setImageUrls(['', '', '', '', '', '']);
    setMainImageIndex(0);
  };

  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setFormData(p);
    const combinedImages = [p.image, ...p.gallery];
    const paddedImages = [...combinedImages, ...Array(6 - combinedImages.length).fill('')];
    setImageUrls(paddedImages);
    setMainImageIndex(0);
    window.scrollTo(0, 0);
  };

  const handleConfirmOrder = () => {
    if (confirmingOrder) {
      if (!deliveryCharge) {
        alert("Delivery charge is required.");
        return;
      }
      updateOrderStatus(confirmingOrder.id, OrderStatus.Confirmed, parseFloat(deliveryCharge) || 0);
      setConfirmingOrder(null);
      setDeliveryCharge('');
    }
  };

  const downloadPDF = (order: Order) => {
    const { jsPDF } = (window as any).jspdf;
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(212, 175, 55);
    doc.text('S & S Fashion House', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Order: #${order.id}`, 20, 40);
    doc.text(`Customer: ${order.customerName}`, 20, 50);
    doc.text(`Phone: ${order.customerPhone}`, 20, 60);
    doc.text(`Address: ${order.customerAddress}`, 20, 70);
    doc.text(`Item: ${order.productName} (${order.size})`, 20, 90);
    doc.text(`Price: ৳${order.unitPrice}`, 20, 100);
    doc.text(`Delivery: ৳${order.deliveryCharge || 0}`, 20, 110);
    doc.text(`Total: ৳${order.totalPrice}`, 20, 130);
    doc.text('Owner: S & S Fashion House', 105, 270, { align: 'center' });
    doc.save(`Order_${order.id}.pdf`);
  };

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto mt-20 p-10 bg-[#141414] border border-white/5 rounded-2xl text-center shadow-xl">
        <div className="w-16 h-16 bg-[#d4af37] text-black rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock size={24} />
        </div>
        <h2 className="text-xl font-serif text-white mb-8 font-semibold">Admin Access</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-[#1c1c1c] border border-white/10 p-4 text-white rounded-xl focus:border-[#d4af37] outline-none text-sm" />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-[#1c1c1c] border border-white/10 p-4 text-white rounded-xl focus:border-[#d4af37] outline-none text-sm" />
          <button type="submit" className="w-full py-4 bg-[#d4af37] text-black font-semibold uppercase tracking-wider text-xs rounded-xl hover:bg-[#c19b2e] transition-colors">Authorize</button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-10 pb-6 border-b border-white/5 gap-6">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
          <ArrowLeft size={16} /> Back to Store
        </button>
        
        <div className="flex items-center gap-6">
           <div className="relative cursor-pointer" onClick={() => setActiveTab('orders')}>
              <Bell size={24} className={`${notifications > 0 ? 'text-[#d4af37] animate-pulse' : 'text-gray-500'}`} />
              {notifications > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {notifications}
                </span>
              )}
           </div>
           
           <div className="flex bg-[#1c1c1c] border border-white/5 p-1 rounded-xl">
            <button onClick={() => setActiveTab('products')} className={`px-5 py-2 rounded-lg text-xs font-medium uppercase tracking-wider transition-all ${activeTab === 'products' ? 'bg-[#d4af37] text-black shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>
              Catalog
            </button>
            <button onClick={() => setActiveTab('orders')} className={`px-5 py-2 rounded-lg text-xs font-medium uppercase tracking-wider transition-all ${activeTab === 'orders' ? 'bg-[#d4af37] text-black shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>
              Orders
            </button>
            <button onClick={() => setActiveTab('settings')} className={`px-5 py-2 rounded-lg text-xs font-medium uppercase tracking-wider transition-all ${activeTab === 'settings' ? 'bg-[#d4af37] text-black shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>
              Settings
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'products' && (
        <div className="animate-fade-in">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-serif text-white">Product Inventory</h1>
            {!isAdding && !editingId && <button onClick={() => setIsAdding(true)} className="px-5 py-2.5 bg-white text-black text-xs font-semibold rounded-lg uppercase tracking-wider hover:bg-gray-200 transition-colors">Add Product</button>}
          </div>

          {(isAdding || editingId) && (
            <div className="bg-[#141414] border border-white/5 p-8 rounded-2xl mb-12 shadow-xl animate-fade-in">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-medium text-white">{isAdding ? 'New Item' : 'Edit Item'}</h3>
                <button onClick={() => {setIsAdding(false); setEditingId(null); resetForm();}} className="text-gray-500 hover:text-white"><X size={20} /></button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase text-gray-500 font-semibold ml-1">Product Name</label>
                    <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#1c1c1c] border border-white/5 p-3 text-white rounded-lg outline-none focus:border-[#d4af37]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase text-gray-500 font-semibold ml-1">Price (BDT)</label>
                      <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: parseInt(e.target.value) || 0})} className="w-full bg-[#1c1c1c] border border-white/5 p-3 text-white rounded-lg outline-none focus:border-[#d4af37]" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase text-gray-500 font-semibold ml-1">Category</label>
                      <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as any})} className="w-full bg-[#1c1c1c] border border-white/5 p-3 text-white rounded-lg outline-none focus:border-[#d4af37] uppercase text-xs">
                        <option value="t-shirt">T-Shirt</option>
                        <option value="polo">Polo Shirt</option>
                        <option value="accessory">Accessory</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase text-gray-500 font-semibold ml-1 block mb-2">Size Stock Levels</label>
                    <div className="grid grid-cols-5 gap-3">
                       {['S','M','L','XL','XXL'].map(sz => (
                         <div key={sz} className="text-center">
                            <label className="text-[9px] text-[#d4af37] block mb-1 font-bold">{sz}</label>
                            <input type="number" value={formData.sizeStock?.[sz as keyof SizeStock]} onChange={e => setFormData({...formData, sizeStock: {...formData.sizeStock!, [sz]: parseInt(e.target.value) || 0}})} className="w-full bg-[#1c1c1c] border border-white/5 p-2 text-white rounded-md text-center text-xs" />
                         </div>
                       ))}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase text-gray-500 font-semibold ml-1">Description</label>
                    <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#1c1c1c] border border-white/5 p-3 text-white rounded-lg outline-none focus:border-[#d4af37] text-xs resize-none" />
                  </div>
                </div>
                
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase text-gray-500 font-semibold ml-1">Image Archives (URLs)</label>
                    <div className="grid grid-cols-1 gap-2">
                      {imageUrls.map((url, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                           <button onClick={() => setMainImageIndex(idx)} className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${mainImageIndex === idx ? 'bg-[#d4af37] border-[#d4af37] text-black' : 'border-white/10 text-gray-500'}`}>
                              <Star size={14} fill={mainImageIndex === idx ? 'currentColor' : 'none'} />
                           </button>
                           <input placeholder={`Image URL ${idx + 1}`} value={url} onChange={e => { const u = [...imageUrls]; u[idx] = e.target.value; setImageUrls(u); }} className="flex-1 bg-[#1c1c1c] border border-white/5 p-2.5 text-white rounded-lg outline-none focus:border-[#d4af37] text-xs" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button onClick={saveProduct} className="flex-1 py-3 bg-[#d4af37] text-black font-semibold uppercase text-xs rounded-lg shadow-lg">Save Item</button>
                    <button onClick={() => {setIsAdding(false); setEditingId(null); resetForm();}} className="px-6 border border-white/10 text-gray-500 hover:text-white rounded-lg uppercase text-xs">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden shadow-xl">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-white/5 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                  <th className="py-5 px-6">Product</th>
                  <th className="py-5 px-6">Price</th>
                  <th className="py-5 px-6">Inventory</th>
                  <th className="py-5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map(p => {
                  const total = (Object.values(p.sizeStock) as number[]).reduce((a,b)=>a+b,0);
                  return (
                    <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-4">
                          <img src={p.image} className="w-10 h-12 object-cover rounded shadow-md" />
                          <div>
                            <p className="text-white font-medium">{p.name}</p>
                            <p className="text-[10px] text-gray-500 uppercase">{p.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6 font-medium">৳{p.price.toLocaleString()}</td>
                      <td className="py-5 px-6">
                         <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${total > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                           {total > 0 ? `${total} Pcs` : 'Sold Out'}
                         </span>
                      </td>
                      <td className="py-5 px-6 text-right space-x-4">
                        <button onClick={() => startEdit(p)} className="text-gray-500 hover:text-white"><Edit size={16} /></button>
                        <button onClick={() => confirm('Delete?') && setProducts(products.filter(i => i.id !== p.id))} className="text-gray-500 hover:text-red-500"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="animate-fade-in">
           <h1 className="text-2xl font-serif text-white mb-8">Order History</h1>
           <div className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden shadow-xl">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-white/5 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                    <th className="py-5 px-6">Customer</th>
                    <th className="py-5 px-6">Product</th>
                    <th className="py-5 px-6">Status</th>
                    <th className="py-5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {orders.map(o => (
                    <tr key={o.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-5 px-6">
                        <p className="text-white font-medium">{o.customerName}</p>
                        <p className="text-[10px] text-gray-500">{o.customerPhone}</p>
                      </td>
                      <td className="py-5 px-6">
                        <p className="text-white">{o.productName}</p>
                        <p className="text-[10px] text-gray-500">{o.size} x {o.quantity} | ৳{o.totalPrice}</p>
                      </td>
                      <td className="py-5 px-6">
                         <span className={`px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-wider border ${
                           o.status === OrderStatus.Pending ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                           o.status === OrderStatus.Confirmed ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                           'bg-blue-500/10 text-blue-500 border-blue-500/20'
                         }`}>
                           {o.status}
                         </span>
                      </td>
                      <td className="py-5 px-6 text-right flex items-center justify-end gap-3">
                        {o.status === OrderStatus.Pending && (
                          <button onClick={() => setConfirmingOrder(o)} className="bg-green-600 text-white px-3 py-1.5 rounded text-[10px] font-bold uppercase hover:bg-green-500 transition-colors">Confirm</button>
                        )}
                        <button onClick={() => downloadPDF(o)} className="p-2 text-gray-400 hover:text-white transition-colors"><Download size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="max-w-xl mx-auto py-10 animate-fade-in">
           <h2 className="text-xl font-serif text-white mb-8">Access Controls</h2>
           <form onSubmit={handleUpdateSettings} className="bg-[#141414] border border-white/5 p-8 rounded-2xl space-y-6 shadow-xl">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-gray-500 font-semibold ml-1">Username</label>
                <input value={newUsername} onChange={e => setNewUsername(e.target.value)} className="w-full bg-[#1c1c1c] border border-white/5 p-3 text-white rounded-lg focus:border-[#d4af37] outline-none" />
              </div>
              <div className="space-y-4 pt-4 border-t border-white/5">
                <input type="password" placeholder="Current Password" value={currentPass} onChange={e => setCurrentPass(e.target.value)} className="w-full bg-[#1c1c1c] border border-white/5 p-3 text-white rounded-lg focus:border-[#d4af37] outline-none text-sm" />
                <input type="password" placeholder="New Password" value={newPass} onChange={e => setNewPass(e.target.value)} className="w-full bg-[#1c1c1c] border border-white/5 p-3 text-white rounded-lg focus:border-[#d4af37] outline-none text-sm" />
                <input type="password" placeholder="Confirm New Password" value={confirmNewPass} onChange={e => setConfirmNewPass(e.target.value)} className="w-full bg-[#1c1c1c] border border-white/5 p-3 text-white rounded-lg focus:border-[#d4af37] outline-none text-sm" />
              </div>
              <button type="submit" className="w-full py-3.5 bg-[#d4af37] text-black font-semibold uppercase text-xs rounded-lg transition-colors">Update Credentials</button>
           </form>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmingOrder && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141414] w-full max-w-sm p-8 rounded-2xl border border-white/10 shadow-2xl">
            <h3 className="text-lg font-medium text-white mb-6">Finalize Order</h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-gray-400 font-semibold">Delivery Charge (BDT)</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                  <input type="number" value={deliveryCharge} onChange={e => setDeliveryCharge(e.target.value)} className="w-full bg-[#1c1c1c] border border-white/10 p-3 pl-10 text-white rounded-lg outline-none focus:border-[#d4af37]" placeholder="0.00" />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button onClick={handleConfirmOrder} className="flex-1 py-3 bg-[#d4af37] text-black font-semibold uppercase text-xs rounded-lg">Confirm</button>
                <button onClick={() => setConfirmingOrder(null)} className="px-5 border border-white/10 text-gray-500 rounded-lg text-xs uppercase">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;