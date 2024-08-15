import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CacheProvider } from '@emotion/react';
import { css } from '@emotion/react'; // Import `css` if you need to use it
import createCache from '@emotion/cache';
const cache = createCache({ key: 'css' });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CacheProvider value={cache}>
      <App />
    </CacheProvider>
  </React.StrictMode>,
);
