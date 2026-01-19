export interface SizeStock {
  S: number;
  M: number;
  L: number;
  XL: number;
  XXL: number;
}

export interface Product {
  id: string;
  name: string;
  image: string; // Main image
  gallery: string[]; // Up to 5 additional images
  price: number; // Stored in BDT
  description: string;
  category: 't-shirt' | 'polo' | 'other' | 'accessory';
  createdAt: number;
  sizeStock: SizeStock;
  isFeatured: boolean;
}

export enum OrderStatus {
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  Processing = 'Processing',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled'
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
  size: keyof SizeStock;
  totalPrice: number; 
  deliveryCharge?: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  status: OrderStatus;
  timestamp: number;
}

export interface CustomLink {
  id: string;
  name: string;
  url: string;
  active: boolean;
}

export interface AppSettings {
  adminUsername: string;
  adminPasswordHash: string; // Stored password
  heroImage: string;
  customLinks: CustomLink[];
}

export enum Page {
  Home = 'home',
  Shop = 'shop',
  NewArrivals = 'new-arrivals',
  TShirtSeries = 't-shirt-series',
  PoloCollection = 'polo-collection',
  Accessories = 'accessories',
  Shipping = 'shipping-returns',
  Privacy = 'privacy-policy',
  Terms = 'terms-of-use',
  Bespoke = 'bespoke-service',
  Dashboard = 'dashboard',
  Admin = 'admin',
  Contact = 'contact',
  TrackOrder = 'track-order'
}