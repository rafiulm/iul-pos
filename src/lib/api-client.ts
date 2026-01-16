import axios from "axios";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const productsApi = {
  list: (category?: string, search?: string) =>
    api.get(
      `/products${
        category || search ? `?category=${category}&search=${search}` : ""
      }`
    ),
  get: (id: string) => api.get(`/products/${id}`),
  create: (data: any) => api.post("/products", data),
  update: (id: string, data: any) => api.put(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
};

export const ordersApi = {
  list: () => api.get("/orders"),
  get: (id: string) => api.get(`/orders/${id}`),
  create: (data: any) => api.post("/orders", data),
  updateStatus: (id: string, status: string) =>
    api.put(`/orders/${id}`, { status }),
};

export const categoriesApi = {
  list: () => api.get("/categories"),
  get: (id: number) => api.get(`/categories/${id}`),
  create: (data: any) => api.post("/categories", data),
  update: (id: number, data: any) => api.put(`/categories/${id}`, data),
  delete: (id: number) => api.delete(`/categories/${id}`),
};

export const healthApi = {
  check: () => axios.get(`${API_BASE}/`),
};
