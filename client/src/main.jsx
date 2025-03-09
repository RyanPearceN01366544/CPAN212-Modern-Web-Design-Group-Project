<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
=======
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
>>>>>>> 6e765cf (created client template)
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
<<<<<<< HEAD
  </React.StrictMode>,
=======
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
>>>>>>> 01b19ea (created client template)
=======
  </StrictMode>,
>>>>>>> 6e765cf (created client template)
)
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { CartProvider } from './context/CartContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { CartProvider } from './context/CartContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
>>>>>>> ea2b2a5 (edit shopping cart and checkout)
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
<<<<<<< HEAD
>>>>>>> 23ea5f4 (edit shopping cart and checkout)
=======
>>>>>>> ea2b2a5 (edit shopping cart and checkout)
