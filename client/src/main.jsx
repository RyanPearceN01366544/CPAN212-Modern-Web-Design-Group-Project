<<<<<<< HEAD
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
=======
>>>>>>> 8f97ca3948dd4581105e40dc27f7c7dc2e44be15
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { CartProvider } from './context/CartContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<<<<<<< HEAD
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { CartProvider } from './context/CartContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
>>>>>>> ea2b2a5 (edit shopping cart and checkout)
=======
>>>>>>> 8f97ca3948dd4581105e40dc27f7c7dc2e44be15
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
<<<<<<< HEAD
);
<<<<<<< HEAD
>>>>>>> 23ea5f4 (edit shopping cart and checkout)
=======
>>>>>>> ea2b2a5 (edit shopping cart and checkout)
=======
);
>>>>>>> 8f97ca3948dd4581105e40dc27f7c7dc2e44be15
