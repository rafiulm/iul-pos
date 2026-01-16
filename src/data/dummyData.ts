import type { Category, Product, Order } from '../types';

export const categories: Category[] = [
  {
    id: 'food',
    name: 'Food',
    subcategories: ['Burgers', 'Pizza', 'Sandwiches', 'Salads']
  },
  {
    id: 'drinks',
    name: 'Drinks',
    subcategories: ['Soft Drinks', 'Coffee', 'Tea', 'Smoothies']
  },
  {
    id: 'snacks',
    name: 'Snacks',
    subcategories: ['Chips', 'Cookies', 'Candy']
  },
  {
    id: 'desserts',
    name: 'Desserts',
    subcategories: ['Ice Cream', 'Cakes', 'Pastries']
  }
];

export const products: Product[] = [
  // Food - Burgers
  { id: '1', name: 'Classic Burger', price: 8.99, category: 'Burgers', emoji: '🍔', stock: 50 },
  { id: '2', name: 'Cheese Burger', price: 9.99, category: 'Burgers', emoji: '🍔', stock: 45 },
  { id: '3', name: 'Bacon Burger', price: 11.99, category: 'Burgers', emoji: '🍔', stock: 40 },
  { id: '4', name: 'Veggie Burger', price: 10.99, category: 'Burgers', emoji: '🥬', stock: 30 },
  
  // Food - Pizza
  { id: '5', name: 'Pepperoni Pizza', price: 12.99, category: 'Pizza', emoji: '🍕', stock: 25 },
  { id: '6', name: 'Margherita Pizza', price: 11.99, category: 'Pizza', emoji: '🍕', stock: 30 },
  { id: '7', name: 'Hawaiian Pizza', price: 13.99, category: 'Pizza', emoji: '🍕', stock: 20 },
  { id: '8', name: 'BBQ Chicken Pizza', price: 14.99, category: 'Pizza', emoji: '🍕', stock: 15 },
  
  // Food - Sandwiches
  { id: '9', name: 'Club Sandwich', price: 7.99, category: 'Sandwiches', emoji: '🥪', stock: 35 },
  { id: '10', name: 'Grilled Cheese', price: 5.99, category: 'Sandwiches', emoji: '🧀', stock: 40 },
  { id: '11', name: 'Turkey Sandwich', price: 6.99, category: 'Sandwiches', emoji: '🥪', stock: 38 },
  { id: '12', name: 'Tuna Sandwich', price: 6.99, category: 'Sandwiches', emoji: '🐟', stock: 32 },
  
  // Food - Salads
  { id: '13', name: 'Caesar Salad', price: 7.99, category: 'Salads', emoji: '🥗', stock: 30 },
  { id: '14', name: 'Greek Salad', price: 8.99, category: 'Salads', emoji: '🥗', stock: 28 },
  { id: '15', name: 'Garden Salad', price: 6.99, category: 'Salads', emoji: '🥗', stock: 35 },
  { id: '16', name: 'Fruit Salad', price: 5.99, category: 'Salads', emoji: '🍇', stock: 25 },
  
  // Drinks - Soft Drinks
  { id: '17', name: 'Cola', price: 2.49, category: 'Soft Drinks', emoji: '🥤', stock: 100 },
  { id: '18', name: 'Lemonade', price: 2.49, category: 'Soft Drinks', emoji: '🍋', stock: 95 },
  { id: '19', name: 'Orange Juice', price: 2.99, category: 'Soft Drinks', emoji: '🍊', stock: 80 },
  { id: '20', name: 'Iced Tea', price: 2.49, category: 'Soft Drinks', emoji: '🧊', stock: 90 },
  
  // Drinks - Coffee
  { id: '21', name: 'Espresso', price: 3.49, category: 'Coffee', emoji: '☕', stock: 70 },
  { id: '22', name: 'Cappuccino', price: 4.49, category: 'Coffee', emoji: '☕', stock: 65 },
  { id: '23', name: 'Latte', price: 4.99, category: 'Coffee', emoji: '☕', stock: 60 },
  { id: '24', name: 'Mocha', price: 5.49, category: 'Coffee', emoji: '☕', stock: 55 },
  
  // Drinks - Tea
  { id: '25', name: 'Green Tea', price: 2.99, category: 'Tea', emoji: '🍵', stock: 85 },
  { id: '26', name: 'Black Tea', price: 2.99, category: 'Tea', emoji: '🍵', stock: 80 },
  { id: '27', name: 'Chamomile Tea', price: 3.49, category: 'Tea', emoji: '🌼', stock: 75 },
  { id: '28', name: 'Mint Tea', price: 3.49, category: 'Tea', emoji: '🌿', stock: 70 },
  
  // Drinks - Smoothies
  { id: '29', name: 'Berry Smoothie', price: 5.99, category: 'Smoothies', emoji: '🍓', stock: 45 },
  { id: '30', name: 'Mango Smoothie', price: 5.99, category: 'Smoothies', emoji: '🥭', stock: 40 },
  { id: '31', name: 'Tropical Smoothie', price: 6.49, category: 'Smoothies', emoji: '🍹', stock: 35 },
  { id: '32', name: 'Protein Smoothie', price: 7.49, category: 'Smoothies', emoji: '💪', stock: 30 },
  
  // Snacks - Chips
  { id: '33', name: 'Potato Chips', price: 2.99, category: 'Chips', emoji: '🥔', stock: 60 },
  { id: '34', name: 'Nachos', price: 3.49, category: 'Chips', emoji: '🌮', stock: 55 },
  { id: '35', name: 'Corn Chips', price: 2.99, category: 'Chips', emoji: '🌽', stock: 58 },
  { id: '36', name: 'Tortilla Chips', price: 3.99, category: 'Chips', emoji: '🫓', stock: 52 },
  
  // Snacks - Cookies
  { id: '37', name: 'Chocolate Chip Cookie', price: 1.99, category: 'Cookies', emoji: '🍪', stock: 80 },
  { id: '38', name: 'Oatmeal Cookie', price: 1.99, category: 'Cookies', emoji: '🍪', stock: 75 },
  { id: '39', name: 'Sugar Cookie', price: 1.49, category: 'Cookies', emoji: '🍪', stock: 85 },
  { id: '40', name: 'Macaroon', price: 2.49, category: 'Cookies', emoji: '🥐', stock: 50 },
  
  // Snacks - Candy
  { id: '41', name: 'Chocolate Bar', price: 1.99, category: 'Candy', emoji: '🍫', stock: 90 },
  { id: '42', name: 'Gummy Bears', price: 2.49, category: 'Candy', emoji: '🐻', stock: 85 },
  { id: '43', name: 'Lollipops', price: 0.99, category: 'Candy', emoji: '🍭', stock: 100 },
  { id: '44', name: 'Jelly Beans', price: 2.99, category: 'Candy', emoji: '🬆', stock: 75 },
  
  // Desserts - Ice Cream
  { id: '45', name: 'Vanilla Ice Cream', price: 4.99, category: 'Ice Cream', emoji: '🍦', stock: 40 },
  { id: '46', name: 'Chocolate Ice Cream', price: 4.99, category: 'Ice Cream', emoji: '🍦', stock: 38 },
  { id: '47', name: 'Strawberry Ice Cream', price: 4.99, category: 'Ice Cream', emoji: '🍓', stock: 42 },
  { id: '48', name: 'Mint Ice Cream', price: 5.49, category: 'Ice Cream', emoji: '🌿', stock: 35 },
  
  // Desserts - Cakes
  { id: '49', name: 'Chocolate Cake Slice', price: 6.99, category: 'Cakes', emoji: '🎂', stock: 25 },
  { id: '50', name: 'Cheesecake Slice', price: 7.99, category: 'Cakes', emoji: '🍰', stock: 20 },
  { id: '51', name: 'Carrot Cake Slice', price: 6.99, category: 'Cakes', emoji: '🥕', stock: 22 },
  { id: '52', name: 'Red Velvet Cake', price: 7.99, category: 'Cakes', emoji: '🎂', stock: 18 },
  
  // Desserts - Pastries
  { id: '53', name: 'Croissant', price: 3.99, category: 'Pastries', emoji: '🥐', stock: 45 },
  { id: '54', name: 'Danish', price: 4.49, category: 'Pastries', emoji: '🥐', stock: 40 },
  { id: '55', name: 'Muffin', price: 3.49, category: 'Pastries', emoji: '🧁', stock: 50 },
  { id: '56', name: 'Donut', price: 2.49, category: 'Pastries', emoji: '🍩', stock: 60 },
  
  // Additional items to reach 60
  { id: '57', name: 'Hot Dog', price: 6.99, category: 'Sandwiches', emoji: '🌭', stock: 40 },
  { id: '58', name: 'Fried Chicken', price: 9.99, category: 'Food', emoji: '🍗', stock: 30 },
  { id: '59', name: 'Fish & Chips', price: 11.99, category: 'Food', emoji: '🐟', stock: 25 },
  { id: '60', name: 'Vegetable Soup', price: 5.99, category: 'Food', emoji: '🍲', stock: 35 },
];

export const pastOrders: Order[] = [
  {
    id: 'ORD-001',
    items: [
      { productId: '1', productName: 'Classic Burger', price: 8.99, quantity: 2 },
      { productId: '17', productName: 'Cola', price: 2.49, quantity: 2 },
      { productId: '37', productName: 'Chocolate Chip Cookie', price: 1.99, quantity: 1 }
    ],
    subtotal: 24.44,
    tax: 1.96,
    total: 26.40,
    paymentMethod: 'card',
    status: 'completed',
    date: new Date('2026-01-15T10:30:00')
  },
  {
    id: 'ORD-002',
    items: [
      { productId: '5', productName: 'Pepperoni Pizza', price: 12.99, quantity: 1 },
      { productId: '21', productName: 'Espresso', price: 3.49, quantity: 1 }
    ],
    subtotal: 16.48,
    tax: 1.32,
    total: 17.80,
    paymentMethod: 'cash',
    status: 'completed',
    date: new Date('2026-01-15T09:15:00')
  },
  {
    id: 'ORD-003',
    items: [
      { productId: '45', productName: 'Vanilla Ice Cream', price: 4.99, quantity: 1 },
      { productId: '29', productName: 'Berry Smoothie', price: 5.99, quantity: 1 }
    ],
    subtotal: 10.98,
    tax: 0.88,
    total: 11.86,
    paymentMethod: 'mobile',
    status: 'completed',
    date: new Date('2026-01-14T18:45:00')
  },
  {
    id: 'ORD-004',
    items: [
      { productId: '2', productName: 'Cheese Burger', price: 9.99, quantity: 3 },
      { productId: '18', productName: 'Lemonade', price: 2.49, quantity: 3 },
      { productId: '33', productName: 'Potato Chips', price: 2.99, quantity: 2 }
    ],
    subtotal: 42.93,
    tax: 3.43,
    total: 46.36,
    paymentMethod: 'card',
    status: 'completed',
    date: new Date('2026-01-14T12:30:00')
  },
  {
    id: 'ORD-005',
    items: [
      { productId: '13', productName: 'Caesar Salad', price: 7.99, quantity: 1 },
      { productId: '25', productName: 'Green Tea', price: 2.99, quantity: 1 }
    ],
    subtotal: 10.98,
    tax: 0.88,
    total: 11.86,
    paymentMethod: 'cash',
    status: 'refunded',
    date: new Date('2026-01-13T16:20:00')
  },
  {
    id: 'ORD-006',
    items: [
      { productId: '49', productName: 'Chocolate Cake Slice', price: 6.99, quantity: 2 },
      { productId: '22', productName: 'Cappuccino', price: 4.49, quantity: 2 }
    ],
    subtotal: 22.96,
    tax: 1.84,
    total: 24.80,
    paymentMethod: 'mobile',
    status: 'completed',
    date: new Date('2026-01-13T14:10:00')
  },
  {
    id: 'ORD-007',
    items: [
      { productId: '9', productName: 'Club Sandwich', price: 7.99, quantity: 1 },
      { productId: '19', productName: 'Orange Juice', price: 2.99, quantity: 1 },
      { productId: '41', productName: 'Chocolate Bar', price: 1.99, quantity: 1 }
    ],
    subtotal: 12.97,
    tax: 1.04,
    total: 14.01,
    paymentMethod: 'card',
    status: 'completed',
    date: new Date('2026-01-12T11:45:00')
  },
  {
    id: 'ORD-008',
    items: [
      { productId: '31', productName: 'Tropical Smoothie', price: 6.49, quantity: 2 },
      { productId: '36', productName: 'Tortilla Chips', price: 3.99, quantity: 1 }
    ],
    subtotal: 16.97,
    tax: 1.36,
    total: 18.33,
    paymentMethod: 'cash',
    status: 'completed',
    date: new Date('2026-01-12T09:30:00')
  },
  {
    id: 'ORD-009',
    items: [
      { productId: '3', productName: 'Bacon Burger', price: 11.99, quantity: 2 },
      { productId: '45', productName: 'Vanilla Ice Cream', price: 4.99, quantity: 2 }
    ],
    subtotal: 33.96,
    tax: 2.72,
    total: 36.68,
    paymentMethod: 'card',
    status: 'completed',
    date: new Date('2026-01-11T15:20:00')
  },
  {
    id: 'ORD-010',
    items: [
      { productId: '53', productName: 'Croissant', price: 3.99, quantity: 3 },
      { productId: '26', productName: 'Black Tea', price: 2.99, quantity: 3 }
    ],
    subtotal: 20.94,
    tax: 1.68,
    total: 22.62,
    paymentMethod: 'mobile',
    status: 'completed',
    date: new Date('2026-01-11T08:15:00')
  },
  {
    id: 'ORD-011',
    items: [
      { productId: '6', productName: 'Margherita Pizza', price: 11.99, quantity: 1 },
      { productId: '20', productName: 'Iced Tea', price: 2.49, quantity: 2 }
    ],
    subtotal: 16.97,
    tax: 1.36,
    total: 18.33,
    paymentMethod: 'cash',
    status: 'completed',
    date: new Date('2026-01-10T13:40:00')
  },
  {
    id: 'ORD-012',
    items: [
      { productId: '57', productName: 'Hot Dog', price: 6.99, quantity: 2 },
      { productId: '17', productName: 'Cola', price: 2.49, quantity: 2 }
    ],
    subtotal: 18.96,
    tax: 1.52,
    total: 20.48,
    paymentMethod: 'card',
    status: 'completed',
    date: new Date('2026-01-10T10:25:00')
  },
  {
    id: 'ORD-013',
    items: [
      { productId: '50', productName: 'Cheesecake Slice', price: 7.99, quantity: 1 },
      { productId: '23', productName: 'Latte', price: 4.99, quantity: 1 }
    ],
    subtotal: 12.98,
    tax: 1.04,
    total: 14.02,
    paymentMethod: 'cash',
    status: 'completed',
    date: new Date('2026-01-09T16:50:00')
  },
  {
    id: 'ORD-014',
    items: [
      { productId: '14', productName: 'Greek Salad', price: 8.99, quantity: 1 },
      { productId: '28', productName: 'Mint Tea', price: 3.49, quantity: 1 },
      { productId: '39', productName: 'Sugar Cookie', price: 1.49, quantity: 2 }
    ],
    subtotal: 15.46,
    tax: 1.24,
    total: 16.70,
    paymentMethod: 'mobile',
    status: 'completed',
    date: new Date('2026-01-09T11:30:00')
  },
  {
    id: 'ORD-015',
    items: [
      { productId: '7', productName: 'Hawaiian Pizza', price: 13.99, quantity: 1 },
      { productId: '24', productName: 'Mocha', price: 5.49, quantity: 1 }
    ],
    subtotal: 19.48,
    tax: 1.56,
    total: 21.04,
    paymentMethod: 'card',
    status: 'completed',
    date: new Date('2026-01-08T14:15:00')
  },
  {
    id: 'ORD-016',
    items: [
      { productId: '58', productName: 'Fried Chicken', price: 9.99, quantity: 2 },
      { productId: '42', productName: 'Gummy Bears', price: 2.49, quantity: 1 }
    ],
    subtotal: 22.47,
    tax: 1.80,
    total: 24.27,
    paymentMethod: 'cash',
    status: 'completed',
    date: new Date('2026-01-08T10:00:00')
  },
  {
    id: 'ORD-017',
    items: [
      { productId: '15', productName: 'Garden Salad', price: 6.99, quantity: 1 },
      { productId: '30', productName: 'Mango Smoothie', price: 5.99, quantity: 1 }
    ],
    subtotal: 12.98,
    tax: 1.04,
    total: 14.02,
    paymentMethod: 'mobile',
    status: 'completed',
    date: new Date('2026-01-07T12:45:00')
  },
  {
    id: 'ORD-018',
    items: [
      { productId: '4', productName: 'Veggie Burger', price: 10.99, quantity: 2 },
      { productId: '21', productName: 'Espresso', price: 3.49, quantity: 2 }
    ],
    subtotal: 28.96,
    tax: 2.32,
    total: 31.28,
    paymentMethod: 'card',
    status: 'completed',
    date: new Date('2026-01-07T09:20:00')
  },
  {
    id: 'ORD-019',
    items: [
      { productId: '51', productName: 'Carrot Cake Slice', price: 6.99, quantity: 1 },
      { productId: '25', productName: 'Green Tea', price: 2.99, quantity: 1 }
    ],
    subtotal: 9.98,
    tax: 0.80,
    total: 10.78,
    paymentMethod: 'cash',
    status: 'completed',
    date: new Date('2026-01-06T15:30:00')
  },
  {
    id: 'ORD-020',
    items: [
      { productId: '32', productName: 'Protein Smoothie', price: 7.49, quantity: 2 },
      { productId: '43', productName: 'Lollipops', price: 0.99, quantity: 3 }
    ],
    subtotal: 17.95,
    tax: 1.44,
    total: 19.39,
    paymentMethod: 'mobile',
    status: 'completed',
    date: new Date('2026-01-06T11:00:00')
  }
];

export const TAX_RATE = 0.08;
