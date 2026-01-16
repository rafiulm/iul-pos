import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import type { CartItem, Order, Product } from "../types";
import { productsApi, ordersApi, categoriesApi } from "../lib/api-client";

interface DataContextType {
  cart: CartItem[];
  products: Product[];
  orders: Order[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  addOrder: (order: Order) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  refreshProducts: () => Promise<void>;
  refreshOrders: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch products from API
  const refreshProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await productsApi.list();
      const productsData = response.data.map((p: any) => ({
        id: p.id,
        name: p.name,
        price: parseFloat(p.price),
        category: p.category,
        emoji: p.emoji,
        stock: p.stock,
      }));
      setProducts(productsData);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch orders from API
  const refreshOrders = useCallback(async () => {
    try {
      const response = await ordersApi.list();
      const ordersData = response.data.map((order: any) => ({
        ...order,
        date: order.createdAt || order.date || new Date().toISOString(), // Fallback to createdAt or current date
        items: (order.items || []).map((item: any) => ({
          ...item,
          price:
            typeof item.price === "string"
              ? parseFloat(item.price)
              : item.price,
        })),
        total:
          typeof order.total === "string"
            ? parseFloat(order.total)
            : order.total,
        subtotal:
          typeof order.subtotal === "string"
            ? parseFloat(order.subtotal)
            : order.subtotal,
        tax: typeof order.tax === "string" ? parseFloat(order.tax) : order.tax,
      }));
      setOrders(ordersData);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  }, []);

  // Fetch categories from API
  const fetchCategories = useCallback(async () => {
    try {
      const response = await categoriesApi.list();
      const categoryNames = response.data.map((c: any) => c.name);
      setCategories(["All", ...categoryNames]);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  }, []);

  // Load data on mount
  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("pos-cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    // Fetch data from API
    refreshProducts();
    refreshOrders();
    fetchCategories();
  }, [refreshProducts, refreshOrders, fetchCategories]);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("pos-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addOrder = async (order: Order) => {
    try {
      await ordersApi.create(order);
      setOrders((prevOrders) => [order, ...prevOrders]);
    } catch (err) {
      console.error("Failed to create order:", err);
      // Still add locally for now
      setOrders((prevOrders) => [order, ...prevOrders]);
    }
  };

  const addProduct = async (product: Product) => {
    try {
      const response = await productsApi.create(product);
      setProducts((prevProducts) => [...prevProducts, response.data]);
    } catch (err) {
      console.error("Failed to create product:", err);
      // Add locally as fallback
      setProducts((prevProducts) => [...prevProducts, product]);
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    try {
      await productsApi.update(updatedProduct.id, updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
    } catch (err) {
      console.error("Failed to update product:", err);
      // Update locally as fallback
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      await productsApi.delete(productId);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (err) {
      console.error("Failed to delete product:", err);
      // Delete locally as fallback
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    }
  };

  return (
    <DataContext.Provider
      value={{
        cart,
        products,
        orders,
        categories,
        isLoading,
        error,
        searchQuery,
        selectedCategory,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setSearchQuery,
        setSelectedCategory,
        addOrder,
        addProduct,
        updateProduct,
        deleteProduct,
        refreshProducts,
        refreshOrders,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
