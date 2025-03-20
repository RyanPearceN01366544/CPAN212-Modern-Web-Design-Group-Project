import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com'
});

// Map our categories to Fake Store API categories
const categoryMap = {
  "Electronics": "electronics",
  "Jewelry": "jewelery",
  "Fashion": ["men's clothing", "women's clothing"]
};

// Helper function to format product data
const formatProduct = (product) => ({
  id: product.id,
  title: product.title,
  price: product.price,
  originalPrice: product.price * 1.2,
  image: product.image,
  rating: product.rating.rate,
  reviews: product.rating.count,
  inStock: Math.random() > 0.2,
  freeShipping: Math.random() > 0.5,
  category: mapCategoryFromAPI(product.category),
  description: product.description
});

// Helper function to map API categories to our categories
const mapCategoryFromAPI = (apiCategory) => {
  for (const [ourCategory, apiCategories] of Object.entries(categoryMap)) {
    if (Array.isArray(apiCategories)) {
      if (apiCategories.includes(apiCategory)) {
        return ourCategory;
      }
    } else if (apiCategories === apiCategory) {
      return ourCategory;
    }
  }
  return apiCategory;
};

// Helper function to map our categories to API categories
const mapCategoryToAPI = (ourCategory) => {
  const apiCategory = categoryMap[ourCategory];
  if (Array.isArray(apiCategory)) {
    return apiCategory[0];
  }
  return apiCategory || ourCategory.toLowerCase();
};

export const getProducts = async (limit = 20) => {
  try {
    const response = await api.get(`/products?limit=${limit}`);
    return response.data.map(formatProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const apiCategory = mapCategoryToAPI(category);
    if (!apiCategory) {
      console.log('Category not found in API:', category);
      return [];
    }

    const response = await api.get(`/products/category/${apiCategory}`);
    return response.data.map(formatProduct);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log('Category not found:', category);
      return [];
    }
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

// Function to check if a product matches the search query
const productMatchesSearch = (product, searchQuery) => {
  const query = searchQuery.toLowerCase().trim();
  const searchableFields = [
    product.title,
    product.description,
    product.category,
    product.price.toString()
  ];

  // Split search query into words for better matching
  const searchWords = query.split(/\s+/);

  // Check if all search words are found in at least one of the searchable fields
  return searchWords.every(word =>
    searchableFields.some(field =>
      field.toLowerCase().includes(word)
    )
  );
};

// Search products function
export const searchProducts = async (query) => {
  try {
    // Get all products
    const response = await api.get('/products');
    const products = response.data.map(formatProduct);
    
    // If no query, return all products
    if (!query || !query.trim()) {
      return products;
    }

    // Filter products based on search query
    return products.filter(product => productMatchesSearch(product, query));
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};
