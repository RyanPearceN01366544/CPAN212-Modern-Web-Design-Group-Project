import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000'
});

// Helper function to format product data
const formatProduct = (product) => ({
  ...product,
  _id: product._id,
  name: product.name,
  price: product.price,
  images: product.images,
  category: product.category,
  brand: product.brand,
  type: product.type,
  itemsLeft: product.itemsLeft,
  rating: product.rating || 0
});

// Get all products
export const getProducts = async(params = {}) => {
  try {
    const response = await api.get(`/Product`, { params });
    return {
      ...response.data,
      products: response.data.products.map(formatProduct)
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { products: [], totalPages: 0, currentPage: 1, totalProducts: 0 };
  }
};

// Get product by ID
export const getProductById = async(id) => {
  try {
    const response = await api.get(`/Product/${id}`);
    return formatProduct(response.data);
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

// Get products by category
export const getProductsByCategory = async(category, params = {}) => {
  try {
    const response = await api.get(`/Product`, {
      params: {
        ...params,
        category
      }
    });
    return {
      ...response.data,
      products: response.data.products.map(formatProduct)
    };
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return { products: [], totalPages: 0, currentPage: 1, totalProducts: 0 };
  }
};

// Search products
export const searchProducts = async(query, page = 1, limit = 20) => {
  if (!query) return { products: [], totalPages: 0, currentPage: 1, totalProducts: 0 };
  try {
    const response = await api.get(`/Product/filter/search`, {
      params: {
        ...query,
        page,
        limit
      }
    });
    return {
      ...response.data,
      products: response.data.products.map(formatProduct)
    };
  } catch (error) {
    console.error('Error searching products:', error);
    return { products: [], totalPages: 0, currentPage: 1, totalProducts: 0 };
  }
};

// User API endpoints
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/User/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/User/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateUser = async (userId, userData, token) => {
  try {
    const response = await api.put(`/User/${userId}`, userData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createOrder = async (orderData, token) => {
  try {
    const response = await api.post('/Order', orderData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getUserOrders = async (userId, token) => {
  try {
    const response = await api.get(`/Order/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
