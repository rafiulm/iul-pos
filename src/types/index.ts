export interface Category {
  id: string;
  name: string;
  subcategories?: string[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  emoji: string;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'mobile';
  status: 'completed' | 'refunded';
  date: Date;
}

export interface ReceiptData {
  orderId: string;
  date: Date;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: string;
}
