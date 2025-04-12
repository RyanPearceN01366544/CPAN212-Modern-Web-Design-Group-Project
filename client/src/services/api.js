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
const formatProduct = (product) => ({ // R: I mean, I guess we can use one but I don't see why. It doesn't even seem to be used.
  id: product.id,
  title: product.title,
  price: product.price,
  originalPrice: product.price * 1.2,
  image: product.image,
  rating: product.rating.rate,
  reviews: product.rating.count,
  inStock: product.itemsLeft,
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

// Get all products
export const getProducts = async() => {
  const dataPromise_ = await fetch("http://localhost:8000/Product/"); // R: Get the product list...
  const dataJson_ = await dataPromise_.json(); // R: Parse the data...
  return Promise.resolve(dataJson_); // R: Send it.
};

// Get product by ID
export const getProductById = async(id) => {  
  if (!id) return Promise.resolve({}); // R: Return if id is undefined.
  const dataPromise_ = await fetch(`http://localhost:8000/Product/${id}`); // R: Get the product list...
  const dataJson_ = await dataPromise_.json(); // R: Parse the data...
  return Promise.resolve(dataJson_); // R: Send it. (Sending only one though since it's getting the product my SKU.)
};

// Get products by category
export const getProductsByCategory = async(category) => {
  if (!category) return Promise.resolve([]); // R: Return if no category is selected.
  const dataPromise_ = await fetch(`http://localhost:8000/Product/?`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      category: category
    }
  })
  const dataJson_ = await dataPromise_.json();
  return Promise.resolve(dataJson_);
};

// Search products
export const searchProducts = async(query) => {
  if (!query) return Promise.resolve([]); // R: Guess... (Return if no query)

  const dataPromise_ = await fetch(`http://localhost:8000/Product/filter/search`,{
    method: "GET",
    body: query
  })
  const dataJson_ = await dataPromise_.json();
  return Promise.resolve(dataJson_);
};
