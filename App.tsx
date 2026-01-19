import React, { useState, useEffect, useRef } from 'react';
import { Page, Product, Order, OrderStatus, AppSettings, CustomLink, SizeStock } from './types';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Shop from './components/Shop';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import Contact from './components/Contact';
import Footer from './components/Footer';
import OrderModal from './components/OrderModal';
import ContentPage from './components/ContentPage';
import TrackOrder from './components/TrackOrder';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [notifications, setNotifications] = useState<number>(0);
  
  const lastOrderCount = useRef<number>(0);

  const defaultLinks: CustomLink[] = [
    { id: '1', name: 'Facebook', url: 'https://facebook.com', active: true },
    { id: '2', name: 'Instagram', url: 'https://instagram.com', active: true },
    { id: '3', name: 'WhatsApp', url: 'https://wa.me/1234567890', active: true },
  ];

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('ss_fashion_settings_v4');
    return saved ? JSON.parse(saved) : {
      adminUsername: 'admin',
      adminPasswordHash: '123456',
      heroImage: 'https://images.unsplash.com/photo-1539106609512-d175211f42d2?auto=format&fit=crop&q=80&w=2000',
      customLinks: defaultLinks
    };
  });

  useEffect(() => {
    localStorage.setItem('ss_fashion_settings_v4', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const savedProducts = localStorage.getItem('ss_fashion_products_v4');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      const initial: Product[] = [
        {
          id: '1',
          name: 'Signature Gold T-Shirt',
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600',
          gallery: [],
          price: 2500,
          description: 'Premium heavy cotton with gold-thread embroidery.',
          category: 't-shirt',
          createdAt: Date.now(),
          sizeStock: { S: 10, M: 15, L: 20, XL: 5, XXL: 5 },
          isFeatured: true
        }
      ];
      setProducts(initial);
      localStorage.setItem('ss_fashion_products_v4', JSON.stringify(initial));
    }

    const savedOrders = localStorage.getItem('ss_fashion_orders_v4');
    if (savedOrders) {
      const parsed = JSON.parse(savedOrders);
      setOrders(parsed);
      lastOrderCount.current = parsed.length;
    }

    const adminSession = localStorage.getItem('ss_fashion_admin');
    if (adminSession === 'true') setIsAdmin(true);
  }, []);

  // Real-time Notification Logic
  useEffect(() => {
    if (orders.length > lastOrderCount.current) {
      setNotifications(prev => prev + (orders.length - lastOrderCount.current));
      lastOrderCount.current = orders.length;
    }
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ss_fashion_products_v4', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ss_fashion_orders_v4', JSON.stringify(orders));
  }, [orders]);

  const handleOrderNow = (product: Product) => {
    setSelectedProduct(product);
  };

  const placeOrder = (info: { name: string; phone: string; address: string; quantity: number; size: keyof SizeStock }) => {
    if (!selectedProduct) return;

    // Deduct stock
    setProducts(prev => prev.map(p => {
      if (p.id === selectedProduct.id) {
        const newStock = { ...p.sizeStock };
        newStock[info.size] = Math.max(0, newStock[info.size] - info.quantity);
        return { ...p, sizeStock: newStock };
      }
      return p;
    }));

    const newOrder: Order = {
      id: 'SS' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      productImage: selectedProduct.image,
      unitPrice: selectedProduct.price,
      quantity: info.quantity,
      size: info.size,
      totalPrice: selectedProduct.price * info.quantity,
      customerName: info.name,
      customerPhone: info.phone,
      customerAddress: info.address,
      status: OrderStatus.Pending,
      timestamp: Date.now(),
    };

    setOrders([newOrder, ...orders]);
    setSelectedProduct(null);
    alert(`Order Success! Your Order ID is: ${newOrder.id}`);
  };

  const updateOrderStatus = (id: string, status: OrderStatus, deliveryCharge?: number) => {
    setOrders(orders.map(o => {
      if (o.id === id) {
        const charge = deliveryCharge !== undefined ? deliveryCharge : (o.deliveryCharge || 0);
        return { 
          ...o, 
          status, 
          deliveryCharge: charge, 
          totalPrice: (o.unitPrice * o.quantity) + charge 
        };
      }
      return o;
    }));
  };

  const clearNotifications = () => {
    setNotifications(0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isAdmin={isAdmin} 
        onLogout={() => {setIsAdmin(false); localStorage.removeItem('ss_fashion_admin'); setCurrentPage(Page.Home);}} 
        pendingOrdersCount={notifications}
        onAdminOpen={clearNotifications}
      />
      
      <main className="flex-grow pt-28">
        {(() => {
          if (currentPage === Page.Dashboard && !isAdmin) { setCurrentPage(Page.Admin); return null; }
          
          if ([Page.Shop, Page.NewArrivals, Page.TShirtSeries, Page.PoloCollection, Page.Accessories].includes(currentPage)) {
             let filtered = products;
             if (currentPage === Page.TShirtSeries) filtered = products.filter(p => p.category === 't-shirt');
             else if (currentPage === Page.PoloCollection) filtered = products.filter(p => p.category === 'polo');
             else if (currentPage === Page.Accessories) filtered = products.filter(p => p.category === 'accessory');
             return <Shop products={filtered} onOrderNow={handleOrderNow} title={currentPage.replace('-', ' ')} />;
          }

          if ([Page.Shipping, Page.Privacy, Page.Terms, Page.Bespoke].includes(currentPage)) return <ContentPage page={currentPage} />;

          switch (currentPage) {
            case Page.Home: return <Home onShopNow={() => setCurrentPage(Page.Shop)} products={products} onOrderNow={handleOrderNow} heroImage={settings.heroImage} onTrack={() => setCurrentPage(Page.TrackOrder)} setCurrentPage={setCurrentPage} />;
            case Page.Dashboard: return <Dashboard products={products} orders={orders} />;
            case Page.Admin: return <AdminPanel products={products} setProducts={setProducts} orders={orders} updateOrderStatus={updateOrderStatus} isAdmin={isAdmin} setIsAdmin={setIsAdmin} settings={settings} onUpdateSettings={setSettings} onBack={() => setCurrentPage(Page.Home)} notifications={notifications} clearNotifications={clearNotifications} />;
            case Page.Contact: return <Contact />;
            case Page.TrackOrder: return <TrackOrder orders={orders} />;
            default: return <Home onShopNow={() => setCurrentPage(Page.Shop)} products={products} onOrderNow={handleOrderNow} heroImage={settings.heroImage} onTrack={() => setCurrentPage(Page.TrackOrder)} setCurrentPage={setCurrentPage} />;
          }
        })()}
      </main>

      <Footer setCurrentPage={setCurrentPage} customLinks={settings.customLinks} />

      {selectedProduct && <OrderModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onSubmit={placeOrder} />}
    </div>
  );
};

export default App;