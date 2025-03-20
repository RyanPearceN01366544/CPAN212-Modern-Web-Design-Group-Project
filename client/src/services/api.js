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

// Sample product data
const sampleProducts = {
  'bag1': {
    id: 'bag1',
    title: "BIYLALESEN Women's 3-in-1 Waterproof Ski Jacket",
    description: "Stay warm and dry with this versatile ski jacket featuring a waterproof outer shell, detachable fleece liner, and multiple pockets for storage. Perfect for winter sports and everyday wear.",
    price: 56.99,
    originalPrice: 68.39,
    image: "https://m.media-amazon.com/images/I/71nwqXqnYpL._AC_UY550_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/71nwqXqnYpL._AC_UY550_.jpg",
      "https://m.media-amazon.com/images/I/71E+KL6n5tL._AC_UY550_.jpg",
      "https://m.media-amazon.com/images/I/71ry6UbnxaL._AC_UY550_.jpg",
      "https://m.media-amazon.com/images/I/71vKyQeZJuL._AC_UY550_.jpg"
    ],
    rating: 4,
    reviews: 235,
    inStock: true,
    freeShipping: true,
    category: "Clothing",
    specifications: [
      { label: "Brand", value: "BIYLALESEN" },
      { label: "Material", value: "100% Polyester" },
      { label: "Color", value: "Purple" },
      { label: "Closure Type", value: "Zipper" },
      { label: "Water Resistant", value: "Yes" },
      { label: "Season", value: "Winter" }
    ]
  },
  'monitor1': {
    id: 'monitor1',
    title: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor",
    description: "Immerse yourself in the ultimate gaming experience with this ultra-wide 49-inch curved monitor featuring a 144Hz refresh rate, 1ms response time, and HDR support.",
    price: 999.99,
    originalPrice: 1199.99,
    image: "https://m.media-amazon.com/images/I/81Butfsk6EL._AC_SL1500_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/81Butfsk6EL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71MlcO29QOL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71YZlXXFktL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71bp9IpcK-L._AC_SL1500_.jpg"
    ],
    rating: 4.5,
    reviews: 140,
    inStock: true,
    freeShipping: true,
    category: "Electronics",
    specifications: [
      { label: "Brand", value: "Samsung" },
      { label: "Screen Size", value: "49 Inches" },
      { label: "Refresh Rate", value: "144 Hz" },
      { label: "Resolution", value: "3840 x 1080" },
      { label: "Panel Type", value: "VA" },
      { label: "HDR", value: "Yes" }
    ]
  },
  'monitor2': {
    id: 'monitor2',
    title: "Acer SB220Q bi 21.5 inches Full HD Monitor",
    description: "Experience crystal-clear visuals with this Full HD monitor featuring an ultra-thin design, AMD FreeSync technology, and a rapid 4ms response time.",
    price: 599.00,
    originalPrice: 710.80,
    image: "https://m.media-amazon.com/images/I/81QpkIctqPL._AC_SL1500_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/81QpkIctqPL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71GbO41pNoL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71xb7GDuAGL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71xPLzEXBTL._AC_SL1500_.jpg"
    ],
    rating: 4,
    reviews: 250,
    inStock: true,
    freeShipping: true,
    category: "Electronics",
    specifications: [
      { label: "Brand", value: "Acer" },
      { label: "Screen Size", value: "21.5 Inches" },
      { label: "Resolution", value: "1920 x 1080" },
      { label: "Refresh Rate", value: "75 Hz" },
      { label: "Response Time", value: "4ms" },
      { label: "Panel Type", value: "IPS" }
    ]
  },
  'laptop1': {
    id: 'laptop1',
    title: "Acer Aspire 5 Slim Laptop",
    description: "15.6-inch Full HD IPS Display, AMD Ryzen 3 3200U, Vega 3 Graphics, 4GB DDR4, 128GB SSD, Backlit Keyboard, Windows 10 in S Mode.",
    price: 399.99,
    originalPrice: 449.99,
    image: "https://m.media-amazon.com/images/I/71vvXGmdKWL._AC_SL1500_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/71vvXGmdKWL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71kpUNu7rOL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61Dw5Z8LzJL._AC_SL1000_.jpg",
      "https://m.media-amazon.com/images/I/61pB6UQzt8L._AC_SL1000_.jpg"
    ],
    rating: 4.5,
    reviews: 890,
    inStock: true,
    freeShipping: true,
    category: "Electronics",
    specifications: [
      { label: "Brand", value: "Acer" },
      { label: "Screen Size", value: "15.6 Inches" },
      { label: "CPU", value: "AMD Ryzen 3 3200U" },
      { label: "RAM", value: "4GB DDR4" },
      { label: "Storage", value: "128GB SSD" },
      { label: "OS", value: "Windows 10" }
    ]
  },
  'headphones1': {
    id: 'headphones1',
    title: "Sony WH-1000XM4 Wireless Noise Canceling Headphones",
    description: "Industry-leading noise canceling with Dual Noise Sensor technology, premium sound quality with 40mm drivers, up to 30-hour battery life.",
    price: 348.00,
    originalPrice: 399.99,
    image: "https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/81jkWCg3HZL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/81Zx6tQJwcL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/81B7PAk5gyL._AC_SL1500_.jpg"
    ],
    rating: 5,
    reviews: 1250,
    inStock: true,
    freeShipping: true,
    category: "Electronics",
    specifications: [
      { label: "Brand", value: "Sony" },
      { label: "Color", value: "Black" },
      { label: "Connectivity", value: "Bluetooth 5.0" },
      { label: "Battery Life", value: "30 hours" },
      { label: "Noise Canceling", value: "Yes" },
      { label: "Voice Assistant", value: "Alexa Built-in" }
    ]
  },
  'watch1': {
    id: 'watch1',
    title: "Fossil Men's Machine Chronograph Watch",
    description: "Stainless steel chronograph watch with black dial, date window, and water resistance to 50m. Perfect blend of style and functionality.",
    price: 129.00,
    originalPrice: 169.00,
    image: "https://m.media-amazon.com/images/I/71EJR6FvxgL._AC_UY679_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/71EJR6FvxgL._AC_UY679_.jpg",
      "https://m.media-amazon.com/images/I/71dZjQoj2EL._AC_UY679_.jpg",
      "https://m.media-amazon.com/images/I/71vPp91cqBL._AC_UY679_.jpg",
      "https://m.media-amazon.com/images/I/71YUKhDvAkL._AC_UY679_.jpg"
    ],
    rating: 4.5,
    reviews: 450,
    inStock: true,
    freeShipping: false,
    category: "Accessories",
    specifications: [
      { label: "Brand", value: "Fossil" },
      { label: "Material", value: "Stainless Steel" },
      { label: "Display", value: "Analog" },
      { label: "Water Resistance", value: "50m" },
      { label: "Movement", value: "Quartz" },
      { label: "Features", value: "Chronograph" }
    ]
  }
};

// Get all products
export const getProducts = () => {
  return Promise.resolve(Object.values(sampleProducts));
};

// Get product by ID
export const getProductById = (id) => {
  return Promise.resolve(sampleProducts[id] || null);
};

// Get products by category
export const getProductsByCategory = (category) => {
  const products = Object.values(sampleProducts).filter(
    product => product.category.toLowerCase() === category.toLowerCase()
  );
  return Promise.resolve(products);
};

// Search products
export const searchProducts = (query) => {
  if (!query) return Promise.resolve([]);

  const normalizedQuery = query.toLowerCase().trim();
  const matchedProducts = Object.values(sampleProducts).filter(product => {
    const searchableText = [
      product.title,
      product.description,
      product.category,
      product.specifications.map(spec => `${spec.label} ${spec.value}`).join(' ')
    ].join(' ').toLowerCase();

    return searchableText.includes(normalizedQuery);
  });

  return Promise.resolve(matchedProducts);
};
